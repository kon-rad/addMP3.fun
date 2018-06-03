const fs = require('fs');
// let	ffmpeg = require('fluent-ffmpeg');
let youtubedl = require('youtube-dl');
let path = require('path');
const { spawn } = require('child_process');

/**
 * Post audio
 * @param req
 * @param res
 * @returns void
 *
 * test url:
 * https://www.youtube.com/watch?v=Lo3769VtgHM
 */
export function postAudio(req, res) {
  const url = req.body.post.url.trim();
  let filename = url.split('watch?v=')[1] + '.mp3';
  const file = path.join(__dirname, '..', 'tmp');

  youtubedl.exec(url,
    ['-x', '--audio-format', 'mp3', '-o', `${file}/%(id)s.%(ext)s`, '--prefer-ffmpeg'],
    {},
    function exec(err, output) {
      'use strict';
      if (err) {
        res.send('error, please try again');
        throw err;
      }
      console.log(output.join('\n'));

      res.send({ downloadLink: `${filename}` });
  });
}

/**
 * download sends download of mp3 file
 * @param req
 * @param res
 * @returns void
 */
export function download(req, res) {
  const fileId = req.params.id.trim();
  const file = path.join(__dirname, '..', 'tmp', fileId);

  fs.exists(file, (exists) => {
    if (exists) {
      res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
      res.setHeader('Content-Type', 'application/audio/mpeg3')
      let rstream = fs.createReadStream(file);
      rstream.pipe(res).on('finish', function() {
        fs.unlink(file);
      });
    } else {
      res.send('error, please try again');
      res.end();
    }
  })
}

/**
 * changeRate changes rate of given mp3 file and sends back notification when it is done
 * @param req
 * @param res
 * @returns void
 */
export function changeRate(req, res) {
  const fileId = req.params.fileId.trim();
  const file = path.join(__dirname, '..', 'tmp', fileId);
  const speed = parseFloat(req.params.playbackRate.trim());
  const playbackRate = "atempo=" + speed;
  const outputFileName = speed + 'x_' + fileId;
  const outputFile = path.join(__dirname, '..', 'tmp', outputFileName);

  let ffmpeg = spawn('ffmpeg', ['-i', file, '-filter:a', playbackRate, '-vn', outputFile ]);

  ffmpeg.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  ffmpeg.stderr.on('end', function () {
    console.log('file has been converted succesfully', outputFile);
  });

  ffmpeg.stderr.on('exit', function () {
    console.log('child process exited');
  });

  ffmpeg.stderr.on('close', function() {
    console.log('...closing time! bye');
    res.send({ downloadLink: outputFileName });

    fs.exists(file, (exists) => {
      if (exists) {
        fs.unlink(file);
      } else {
        console.log('error, could not delete ' + file);
        res.end();
      }
    })
  });


}
