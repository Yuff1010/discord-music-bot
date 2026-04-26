import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

export const player = new Player(client, {
  skipFFmpeg: false,
});

client.player = player;

await player.extractors.register(YoutubeiExtractor, {
  disablePlayer: true,
});
