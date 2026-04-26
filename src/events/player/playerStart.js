import { makeEmbed } from '../../utils/embed.js';
import { formatTrackLine } from '../../utils/music.js';

export const name = 'playerStart';

export async function execute(queue, track) {
  await queue.metadata?.channel?.send({
    embeds: [
      makeEmbed({
        title: '开始播放',
        description: formatTrackLine(track),
      }),
    ],
  });
}

