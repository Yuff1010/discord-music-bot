import { ActivityType } from 'discord.js';

export const name = 'ready';
export const once = true;

export function execute(client) {
  client.user.setActivity('/play 音乐', { type: ActivityType.Listening });
  console.log(`[ready] Logged in as ${client.user.tag}`);
}
