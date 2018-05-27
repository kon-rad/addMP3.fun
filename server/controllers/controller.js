const fs = require('fs');
let	ffmpeg = require('fluent-ffmpeg');
let youtubedl = require('youtube-dl');


/**
 * Post audio
 * @param req
 * @param res
 * @returns void
 *
 * test url:
 * https://www.youtube.com/watch?v=Lo3769VtgHM
 */
export async function postAudio(req, res) {

  const url = "https://www.youtube.com/watch?v=" + req.query.url.trim();
  // let file = 'youtubeAudio.mp3';

  let filename = url.split('watch?v=')[1] + '.mp3';
  // filename = filename.replace(/[ <>:"/\\|?*]/g, '_') + '.mp3';
  console.log(`/tmp/${filename}`);

  youtubedl.exec(url,
    ['-x', '--audio-format', 'mp3', '-o', '/tmp/%(id)s.%(ext)s', '--prefer-ffmpeg'],
    {},
    function exec(err, output) {
      'use strict';
      if (err) { throw err; }
      console.log(output.join('\n'));

      res.download(`/tmp/${filename}`);
  });

  // res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
  // res.setHeader('Content-Type', 'application/audio/mpeg3')
  // var rstream = fs.createReadStream(file);
  // rstream.pipe(res);
}

