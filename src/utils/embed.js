import { EmbedBuilder } from 'discord.js';

const BRAND_COLOR = 0x5865f2; // Discord blurple
const ERROR_COLOR = 0xed4245;
const SUCCESS_COLOR = 0x57f287;

export function makeEmbed({ title, description, color = BRAND_COLOR, fields = [], thumbnail, image }) {
  const embed = new EmbedBuilder()
    .setColor(color)
    .setFooter({ text: 'discord-music-bot' });

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (fields.length) embed.addFields(fields);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (image) embed.setImage(image);

  return embed;
}

export function errorEmbed(description) {
  return makeEmbed({ title: '错误', description, color: ERROR_COLOR });
}

export function successEmbed(description) {
  return makeEmbed({ description, color: SUCCESS_COLOR });
}
