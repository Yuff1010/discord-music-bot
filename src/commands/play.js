import { SlashCommandBuilder } from 'discord.js';
import { errorEmbed, successEmbed } from '../utils/embed.js';
import { formatTrackLine } from '../utils/music.js';
import { validateVoice } from '../utils/validate.js';

const PLAY_START_TIMEOUT_MS = 8_000;

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('搜索并播放音乐。')
  .addStringOption((option) =>
    option
      .setName('query')
      .setDescription('歌曲关键词或链接')
      .setRequired(true),
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const validation = await validateVoice(interaction);
  if (!validation.ok) return;

  const query = interaction.options.getString('query', true).trim();
  if (!query) {
    await interaction.editReply({ embeds: [errorEmbed('请输入歌曲关键词或链接。')] });
    return;
  }

  const searchResult = await interaction.client.player.search(query, {
    requestedBy: interaction.user,
  });

  if (!searchResult || searchResult.tracks.length === 0) {
    await interaction.editReply({ embeds: [errorEmbed('没有找到可播放的结果。')] });
    return;
  }

  const requestedTrack = searchResult.tracks[0];
  const playPromise = interaction.client.player.play(validation.voiceChannel, searchResult, {
    requestedBy: interaction.user,
    nodeOptions: {
      metadata: {
        channel: interaction.channel,
        requestedBy: interaction.user,
      },
      selfDeaf: true,
    },
  });

  try {
    const result = await Promise.race([
      playPromise,
      new Promise((resolve) => {
        setTimeout(() => resolve(null), PLAY_START_TIMEOUT_MS);
      }),
    ]);

    if (!result) {
      await interaction.editReply({
        embeds: [successEmbed(`已找到曲目，正在连接并准备播放：${formatTrackLine(requestedTrack)}`)],
      });

      playPromise.catch(async (error) => {
        console.error('[play] Delayed playback failed:', error);
        await interaction.channel?.send({
          embeds: [errorEmbed('播放启动失败，请稍后重试或换一首歌。')],
        });
      });
      return;
    }

    result.queue.setMetadata({
      channel: interaction.channel,
      requestedBy: interaction.user,
    });

    await interaction.editReply({
      embeds: [successEmbed(`已加入队列：${formatTrackLine(result.track)}`)],
    });
  } catch (error) {
    console.error('[play] Playback failed:', error);
    await interaction.editReply({
      embeds: [errorEmbed('播放启动失败，请稍后重试或换一首歌。')],
    });
  }
}
