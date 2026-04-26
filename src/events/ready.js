import { ActivityType } from 'discord.js';

export const name = 'clientReady';
export const once = true;

export function execute(client) {
  client.user.setActivity('/play 音乐', { type: ActivityType.Listening });
  console.log(`[clientReady] Logged in as ${client.user.tag}`);
}
