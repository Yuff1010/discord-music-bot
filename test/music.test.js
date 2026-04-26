import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildQueueFields,
  formatTrackDuration,
  formatTrackLine,
  getUpcomingTracks,
} from '../src/utils/music.js';

test('formatTrackDuration prefers provided display duration', () => {
  assert.equal(formatTrackDuration({ duration: '03:21', durationMS: 201_000 }), '03:21');
});

test('formatTrackDuration falls back to durationMS', () => {
  assert.equal(formatTrackDuration({ durationMS: 65_000 }), '01:05');
});

test('formatTrackLine includes index, markdown link, author, and duration', () => {
  const line = formatTrackLine(
    {
      title: 'Song',
      author: 'Artist',
      duration: '02:34',
      url: 'https://example.test/song',
    },
    0,
  );

  assert.equal(line, '1. [Song - Artist](https://example.test/song) (02:34)');
});

test('getUpcomingTracks supports discord-player track collections', () => {
  const queue = {
    tracks: {
      toArray: () => ['a', 'b', 'c'],
    },
  };

  assert.deepEqual(getUpcomingTracks(queue, 2), ['a', 'b']);
});

test('buildQueueFields renders current and upcoming tracks', () => {
  const fields = buildQueueFields({
    currentTrack: { title: 'Current', duration: '01:00' },
    tracks: [{ title: 'Next', duration: '02:00' }],
  });

  assert.equal(fields[0].name, '正在播放');
  assert.match(fields[0].value, /Current/);
  assert.equal(fields[1].name, '接下来');
  assert.match(fields[1].value, /Next/);
});

