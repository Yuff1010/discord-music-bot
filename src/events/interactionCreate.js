import { errorEmbed } from '../utils/embed.js';

export const name = 'interactionCreate';
export const once = false;

export async function execute(interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands?.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`[interactionCreate] Error in /${interaction.commandName}:`, err);
    const reply = { embeds: [errorEmbed('执行命令时发生错误，请稍后再试。')], ephemeral: true };
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(reply);
    } else {
      await interaction.reply(reply);
    }
  }
}
