import { makeEmbed } from '../../utils/embed.js';

export const name = 'emptyQueue';

export async function execute(queue) {
  await queue.metadata?.channel?.send({
    embeds: [makeEmbed({ description: '队列已播放完毕。' })],
  });
}

