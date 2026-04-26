import { errorEmbed } from '../../utils/embed.js';

export const name = 'error';

export async function execute(queue, error) {
  console.error('[queueError]', error);
  await queue.metadata?.channel?.send({
    embeds: [errorEmbed('播放队列发生错误，请稍后重试或换一首歌。')],
  });
}

