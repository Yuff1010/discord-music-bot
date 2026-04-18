import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import { YoutubeiExtractor } from '@discord-player/extractor';

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

await player.extractors.register(YoutubeiExtractor, {});
