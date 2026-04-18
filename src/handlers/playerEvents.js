import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Scan src/events/player/*.js and bind each event to the discord-player instance.
 */
export async function loadPlayerEvents(player) {
  const eventsPath = join(__dirname, '..', 'events', 'player');
  let files;
  try {
    files = readdirSync(eventsPath).filter((f) => f.endsWith('.js'));
  } catch {
    // No player events directory yet – that's fine
    return;
  }

  for (const file of files) {
    const filePath = join(eventsPath, file);
    const module = await import(`file://${filePath}`);
    const { name, execute } = module;
    player.events.on(name, (...args) => execute(...args));
  }
}
