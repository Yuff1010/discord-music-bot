/**
 * Format milliseconds to MM:SS or HH:MM:SS
 */
export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');
  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Render a Unicode progress bar.
 * @param {number} current - current position in ms
 * @param {number} total   - total duration in ms
 * @param {number} length  - bar character count
 */
export function progressBar(current, total, length = 15) {
  if (!total || total <= 0) return '▬'.repeat(length);
  const filled = Math.round((current / total) * length);
  const bar = '▬'.repeat(Math.max(0, filled - 1)) + '🔘' + '▬'.repeat(Math.max(0, length - filled));
  return bar;
}
