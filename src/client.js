import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import extractors from '@discord-player/extractor';

const { YoutubeExtractor } = extractors;

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

await player.extractors.register(YoutubeExtractor, {});
