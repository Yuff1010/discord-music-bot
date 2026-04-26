import { successEmbed } from '../../utils/embed.js';
import { formatTrackLine } from '../../utils/music.js';

export const name = 'audioTrackAdd';

export async function execute(queue, track) {
  await queue.metadata?.channel?.send({
    embeds: [successEmbed(`已加入队列：${formatTrackLine(track)}`)],
  });
}

