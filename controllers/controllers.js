const fs = require('fs');
let youtubedl = require('youtube-dl');
let path = require('path');
const { spawn } = require('child_process');

/**
 * Post audio
 * @param req
 * @param res
 * @returns void
 */
module.exports.audio = (req, res) => {
  const ytCode = req.body.url.trim();

  const options = [];
  const url = 'http://www.youtube.com/watch?v=' + ytCode;

  youtubedl.getInfo(url, options, (err, info) => {
    if (err) {
      console.log('error: ', err);
      res.send({ error: `ERROR: ${url} is not a valid URL` });
      res.end();
      return;
    }
    const slug = info.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    let filename = slug + '.mp3';
    const file = path.join(__dirname, '..', 'tmp');
    getAudio(file, filename, res, ytCode);
  });
};

const getAudio = (file, filename, res, ytCode) => {
  youtubedl.exec(
    ytCode,
    [
      '-x',
      '--audio-format',
      'mp3',
      '-o',
      `${file}/%(id)s.%(ext)s`,
      '--prefer-ffmpeg',
    ],
    {},
    function exec(err, output) {
      'use strict';
      if (err) {
        console.log('error: ', err);
        res.send({ error: `ERROR: ${ytCode} is not a valid URL` });
        res.end();
        return;
      }
      const tmpFilepath = path.join(__dirname, '..', 'tmp', `${ytCode}.mp3`);
      const newNameFilepath = path.join(__dirname, '..', 'tmp', filename);
      // rename file from yt code to video title
      fs.rename(tmpFilepath, newNameFilepath, (err) => {
        if (err) {
          console.log('error: ', err);
          res.send({ error: `ERROR. Please try again later.` });
          res.end();
          return;
        }
        // send back filename to create download link
        res.send({ downloadLink: `${filename}` });
      });
    }
  );
};

/**
 * download sends download of mp3 file
 * @param req
 * @param res
 * @returns void
 */
module.exports.download = (req, res) => {
  const fileId = req.params.id.trim();
  const file = path.join(__dirname, '..', 'tmp', fileId);

  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      res.send('an error occurred, please try again');
      res.end();
    } else {
      res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
      res.setHeader('Content-Type', 'application/audio/mpeg3');
      let rstream = fs.createReadStream(file);
      rstream.pipe(res).on('finish', function () {
        // todo: delete all files inside folder
        fs.unlink(file, (err) => {
          if (err) {
            console.log('error, unable to delete file ', file);
          }
        });
      });
    }
  });
};

/**
 * changeRate changes rate of given mp3 file and sends back notification when it is done
 * @param req
 * @param res
 * @returns void
 */
module.exports.changeRate = (req, res) => {
  const fileId = req.params.fileId.trim();
  const file = path.join(__dirname, '..', 'tmp', fileId);
  const speed = parseFloat(req.params.playbackRate.trim());
  const playbackRate = 'atempo=' + speed;
  const outputFileName = speed + 'x_' + fileId;
  const outputFile = path.join(__dirname, '..', 'tmp', outputFileName);

  let ffmpeg = spawn('ffmpeg', [
    '-i',
    file,
    '-filter:a',
    playbackRate,
    '-vn',
    outputFile,
  ]);

  ffmpeg.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  ffmpeg.stderr.on('end', function () {
    console.log('file has been converted succesfully', outputFile);
  });

  ffmpeg.stderr.on('exit', function () {
    console.log('child process exited');
  });

  ffmpeg.stderr.on('close', function () {
    console.log('...closing time! bye');
    res.send({ downloadLink: outputFileName });

    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        console.log('an error occurred, could not delete ' + file);
        res.end();
      } else {
        fs.unlink(file, (err) => {
          if (err) {
            console.log('error, unable to delete file ', file);
          }
        });
      }
    });
  });
};
