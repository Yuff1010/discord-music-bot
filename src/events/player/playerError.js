import { errorEmbed } from '../../utils/embed.js';

export const name = 'playerError';

export async function execute(queue, error) {
  console.error('[playerError]', error);
  await queue.metadata?.channel?.send({
    embeds: [errorEmbed('播放时发生错误，已尝试继续处理队列。')],
  });
}

