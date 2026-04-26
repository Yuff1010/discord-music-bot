import { makeEmbed } from '../../utils/embed.js';

export const name = 'disconnect';

export async function execute(queue) {
  await queue.metadata?.channel?.send({
    embeds: [makeEmbed({ description: '已从语音频道断开。' })],
  });
}

