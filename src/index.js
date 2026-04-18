import 'dotenv/config';
import { client, player } from './client.js';
import { loadCommands } from './handlers/commands.js';
import { loadEvents } from './handlers/events.js';

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN is not set. Copy .env.example to .env and fill in the values.');
  process.exit(1);
}

// Load player events (src/events/player/)
const { loadPlayerEvents } = await import('./handlers/playerEvents.js');
await loadPlayerEvents(player);

// Load Discord client events & commands
await loadEvents(client);
await loadCommands(client);

// Global error guards – keep the process alive
process.on('unhandledRejection', (err) => {
  console.error('[process] Unhandled rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('[process] Uncaught exception:', err);
});

await client.login(DISCORD_TOKEN);
