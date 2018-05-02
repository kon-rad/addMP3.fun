const fs = require('fs');
const youtubedl = require('youtube-dl');


/**
 * Post audio
 * @param req
 * @param res
 * @returns void
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

  res.header({
    'Content-Disposition': 'attachment; filename="youtubeAudio.mp3"'
  });
  video.pipe(res);
}
