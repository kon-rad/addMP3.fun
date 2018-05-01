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
  console.log(url);

  const video = youtubedl(url,
    // Optional arguments passed to youtube-dl.
    // ['--format=18'],
    ['-x', '--audio-format', 'mp3'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname });

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info.filename);
    console.log('size: ' + info.size);
  });


  res.header({
    'Content-Disposition': 'attachment; filename="youtubeAudio.mp3"'
  });
  // fs.createReadStream('file.txt').pipe(res);
  video.pipe(fs.createWriteStream('myaudio.mp3').pipe(res));
  // res.download('youtubeAudio.mp3', )
  // res.json({ hi: 'post hi this is server', reqbody: req.body });
}
