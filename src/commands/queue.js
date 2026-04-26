import { SlashCommandBuilder } from 'discord.js';
import { makeEmbed } from '../utils/embed.js';
import { buildQueueFields } from '../utils/music.js';
import { validateBotInChannel, validateSameChannel } from '../utils/validate.js';

export const data = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('查看当前播放队列。');

export async function execute(interaction) {
  await interaction.deferReply();

  const queue = interaction.client.player.nodes.get(interaction.guildId);
  if (!(await validateBotInChannel(interaction, queue))) return;
  if (!(await validateSameChannel(interaction, queue))) return;

  await interaction.editReply({
    embeds: [
      makeEmbed({
        title: '播放队列',
        fields: buildQueueFields(queue),
      }),
    ],
  });
}

