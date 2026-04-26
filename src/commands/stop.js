import { SlashCommandBuilder } from 'discord.js';
import { successEmbed } from '../utils/embed.js';
import { validateBotInChannel, validateSameChannel } from '../utils/validate.js';

export const data = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('停止播放并清空队列。');

export async function execute(interaction) {
  await interaction.deferReply();

  const queue = interaction.client.player.nodes.get(interaction.guildId);
  if (!(await validateBotInChannel(interaction, queue))) return;
  if (!(await validateSameChannel(interaction, queue))) return;

  queue.delete();
  await interaction.editReply({ embeds: [successEmbed('已停止播放并清空队列。')] });
}

