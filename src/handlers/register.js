/**
 * Register slash commands with Discord (guild-scoped for dev, global for prod).
 * Run with: npm run register
 */
import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('Missing DISCORD_TOKEN or CLIENT_ID in .env');
  process.exit(1);
}

const commandsPath = join(__dirname, '..', 'commands');
const files = readdirSync(commandsPath).filter((f) => f.endsWith('.js'));

const commands = [];
for (const file of files) {
  const filePath = join(commandsPath, file);
  const module = await import(`file://${filePath}`);
  if (module.data) commands.push(module.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

try {
  if (GUILD_ID) {
    // Guild-scoped: instant update (for development)
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log(`Registered ${commands.length} guild commands to ${GUILD_ID}`);
  } else {
    // Global: up to 1 hour propagation
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log(`Registered ${commands.length} global commands`);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
