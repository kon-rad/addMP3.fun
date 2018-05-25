const fs = require('fs');
const youtubedl = require('youtube-dl');
var	ffmpeg = require('fluent-ffmpeg');

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

  const url = req.body.post.url;

  const video = youtubedl(url,
    ['-x', '--audio-format', 'mp3'],
    { cwd: __dirname });

  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
  });

  video.pipe(fs.createWriteStream('test.mp3'));
  video.on('end', function() {
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg'
    });
    video.pipe(res);
  });



  // video.on('end', function() {
  //   res.writeHead(200, {
  //     'Content-Type': 'audio/mpeg'
  //   });
  // })


  // video.pipe(fs.createWriteStream('myvideo.mp3'));

  // var proc = new ffmpeg({source:video});
  // proc.setFfmpegPath('/Applications/ffmpeg/ffmpeg');
  // proc.save(mp3 + '.mp3');

  // res.header({
  //   'Content-Disposition': 'attachment; filename="youtubeAudio.mp3"'
  // });

}
