import { SlashCommandBuilder } from 'discord.js';
import { makeEmbed } from '../utils/embed.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('检查机器人延迟');

export async function execute(interaction) {
  await interaction.deferReply();
  const latency = Date.now() - interaction.createdTimestamp;
  const wsLatency = interaction.client.ws.ping;

  await interaction.editReply({
    embeds: [
      makeEmbed({
        title: '🏓 Pong!',
        fields: [
          { name: '往返延迟', value: `${latency}ms`, inline: true },
          { name: 'WebSocket 心跳', value: `${wsLatency}ms`, inline: true },
        ],
      }),
    ],
  });
}
