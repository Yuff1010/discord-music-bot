import { errorEmbed } from './embed.js';

/**
 * Ensure the user is in a voice channel and the bot has Connect + Speak permissions.
 * Returns { ok: true, channel } or sends an error reply and returns { ok: false }.
 */
export async function validateVoice(interaction) {
  const member = interaction.member;
  const voiceChannel = member?.voice?.channel;

  if (!voiceChannel) {
    await interaction.editReply({ embeds: [errorEmbed('请先加入一个语音频道。')] });
    return { ok: false };
  }

  const perms = voiceChannel.permissionsFor(interaction.guild.members.me);
  if (!perms.has('Connect')) {
    await interaction.editReply({ embeds: [errorEmbed('我没有加入该语音频道的权限（缺少 Connect）。')] });
    return { ok: false };
  }
  if (!perms.has('Speak')) {
    await interaction.editReply({ embeds: [errorEmbed('我没有在该语音频道说话的权限（缺少 Speak）。')] });
    return { ok: false };
  }

  return { ok: true, voiceChannel };
}

/**
 * Ensure the bot is currently in a voice channel in this guild.
 */
export async function validateBotInChannel(interaction, queue) {
  if (!queue || !queue.isPlaying()) {
    await interaction.editReply({ embeds: [errorEmbed('我目前没有在播放任何内容。')] });
    return false;
  }
  return true;
}

/**
 * Ensure the user is in the same voice channel as the bot.
 */
export async function validateSameChannel(interaction, queue) {
  const userChannel = interaction.member?.voice?.channel;
  const botChannel = queue?.channel;

  if (!userChannel || !botChannel || userChannel.id !== botChannel.id) {
    await interaction.editReply({ embeds: [errorEmbed('请加入和我相同的语音频道。')] });
    return false;
  }
  return true;
}
