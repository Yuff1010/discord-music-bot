import { makeEmbed } from '../../utils/embed.js';

export const name = 'emptyChannel';

export async function execute(queue) {
  await queue.metadata?.channel?.send({
    embeds: [makeEmbed({ description: '语音频道无人，已停止播放。' })],
  });
}

