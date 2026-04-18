import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Scan src/events/*.js (but not subdirectories), import each, and bind to client.
 */
export async function loadEvents(client) {
  const eventsPath = join(__dirname, '..', 'events');
  const files = readdirSync(eventsPath).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    const filePath = join(eventsPath, file);
    const module = await import(`file://${filePath}`);
    const { name, once, execute } = module;

    if (once) {
      client.once(name, (...args) => execute(...args));
    } else {
      client.on(name, (...args) => execute(...args));
    }
  }
}
