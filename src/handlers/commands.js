import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Scan src/commands/*.js, import each module, and store in client.commands Map.
 */
export async function loadCommands(client) {
  const commandsPath = join(__dirname, '..', 'commands');
  const files = readdirSync(commandsPath).filter((f) => f.endsWith('.js'));

  client.commands = new Map();

  for (const file of files) {
    const filePath = join(commandsPath, file);
    const module = await import(`file://${filePath}`);

    if (!module.data || !module.execute) {
      console.warn(`[commands] Skipping ${file}: missing data or execute export`);
      continue;
    }

    client.commands.set(module.data.name, module);
  }

  return client.commands;
}
