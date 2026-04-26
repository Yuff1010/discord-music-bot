import { SlashCommandBuilder } from 'discord.js';
import { successEmbed } from '../utils/embed.js';
import { validateBotInChannel, validateSameChannel } from '../utils/validate.js';

export const data = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('跳过当前曲目。');

export async function execute(interaction) {
  await interaction.deferReply();

  const queue = interaction.client.player.nodes.get(interaction.guildId);
  if (!(await validateBotInChannel(interaction, queue))) return;
  if (!(await validateSameChannel(interaction, queue))) return;

  queue.node.skip();
  await interaction.editReply({ embeds: [successEmbed('已跳过当前曲目。')] });
}

