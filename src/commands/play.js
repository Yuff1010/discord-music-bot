import { SlashCommandBuilder } from 'discord.js';
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
  });

  if (!searchResult || searchResult.tracks.length === 0) {
    await interaction.editReply({ embeds: [errorEmbed('没有找到可播放的结果。')] });
    return;
  }

  const { track, queue } = await interaction.client.player.play(validation.voiceChannel, searchResult, {
    requestedBy: interaction.user,
    nodeOptions: {
      metadata: {
        channel: interaction.channel,
        requestedBy: interaction.user,
      },
      selfDeaf: true,
    },
  });

  queue.setMetadata({
    channel: interaction.channel,
    requestedBy: interaction.user,
  });

  await interaction.editReply({
    embeds: [successEmbed(`已加入队列：${formatTrackLine(track)}`)],
  });
}
