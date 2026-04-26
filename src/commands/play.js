import { SlashCommandBuilder } from 'discord.js';
import { QueryType } from 'discord-player';
import { errorEmbed, successEmbed } from '../utils/embed.js';
import { formatTrackLine } from '../utils/music.js';
import { validateVoice } from '../utils/validate.js';

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
    searchEngine: QueryType.AUTO,
  });

  if (!searchResult || searchResult.tracks.length === 0) {
    await interaction.editReply({ embeds: [errorEmbed('没有找到可播放的结果。')] });
    return;
  }

  const queue = interaction.client.player.nodes.create(interaction.guild, {
    metadata: {
      channel: interaction.channel,
      requestedBy: interaction.user,
    },
    selfDeaf: true,
  });
  queue.setMetadata({
    channel: interaction.channel,
    requestedBy: interaction.user,
  });

  await interaction.editReply({
    embeds: [successEmbed(`已找到曲目，正在连接并准备播放：${formatTrackLine(searchResult.tracks[0])}`)],
  });

  const requestedTracks = searchResult.playlist ?? searchResult.tracks[0];
  queue.addTrack(requestedTracks);

  void startPlayback(queue, validation.voiceChannel, interaction.channel);
}

async function startPlayback(queue, voiceChannel, textChannel) {
  try {
    if (!queue.connection) {
      await queue.connect(voiceChannel);
    }

    if (!queue.isPlaying()) {
      await queue.node.play();
    }
  } catch (error) {
    console.error('[play] Playback startup failed:', error);
    queue.delete();
    await textChannel?.send({
      embeds: [errorEmbed('播放启动失败，请稍后重试或换一首歌。')],
    });
  }
}
