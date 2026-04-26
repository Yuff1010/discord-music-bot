import { formatDuration } from './format.js';

const UNKNOWN_DURATION = '直播/未知';

export function formatTrackTitle(track) {
  if (!track) return '未知曲目';

  const title = track.title || track.name || track.raw?.title || '未知曲目';
  const author = track.author || track.raw?.author;

  return author ? `${title} - ${author}` : title;
}

export function formatTrackDuration(track) {
  if (!track) return UNKNOWN_DURATION;
  if (track.duration) return track.duration;
  if (Number.isFinite(track.durationMS) && track.durationMS > 0) {
    return formatDuration(track.durationMS);
  }
  return UNKNOWN_DURATION;
}

export function formatTrackLine(track, index) {
  const prefix = Number.isInteger(index) ? `${index + 1}. ` : '';
  const url = track?.url;
  const title = formatTrackTitle(track);
  const duration = formatTrackDuration(track);
  const label = url ? `[${title}](${url})` : title;

  return `${prefix}${label} (${duration})`;
}

export function getUpcomingTracks(queue, limit = 10) {
  const tracks = queue?.tracks;

  if (!tracks) return [];
  if (typeof tracks.toArray === 'function') return tracks.toArray().slice(0, limit);
  if (Array.isArray(tracks)) return tracks.slice(0, limit);

  return [];
}

export function buildQueueFields(queue, limit = 10) {
  const current = queue?.currentTrack;
  const upcoming = getUpcomingTracks(queue, limit);

  const fields = [
    {
      name: '正在播放',
      value: current ? formatTrackLine(current) : '暂无正在播放的曲目。',
    },
  ];

  fields.push({
    name: '接下来',
    value: upcoming.length
      ? upcoming.map((track, index) => formatTrackLine(track, index)).join('\n')
      : '队列为空。',
  });

  return fields;
}

