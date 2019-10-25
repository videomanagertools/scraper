import ffmpeg from 'fluent-ffmpeg';
import { mkdirSync } from 'fs-extra';
/**
 * multiple screenshots very slow
 * https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/860
 */
export const takeScreenshots = ({
  file,
  count,
  folder = '',
  size = '800x?'
}) => {
  try {
    mkdirSync(folder);
  } catch (err) {
    console.error(err);
  }
  const walk = mark =>
    new Promise((resolve, reject) => {
      ffmpeg(file)
        .screenshots({
          count: 1,
          folder,
          timemarks: [mark],
          filename: `%s.jpg`,
          size
        })
        .on('end', () => {
          resolve(mark);
        });
    });
  return new Promise((resolve, reject) => {
    ffmpeg(file).ffprobe((err, meta) => {
      if (err) return;
      const { duration } = meta.format;
      const interval = Math.ceil(duration / (count + 1));
      const timemarks = new Array(count)
        .fill(0)
        .map((v, i) => interval * (i + 1));
      Promise.all(timemarks.map(mark => walk(mark)))
        .then(marks => resolve(file))
        .catch(error => {
          console.error(error);
        });
    });
  });
};
