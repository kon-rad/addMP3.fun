const Controllers = require("../controllers/controllers");

module.exports = app => {
  // Post audio
  app.post("/postAudio", Controllers.postAudio);

  // download audio
  app.get("/download/:id", Controllers.download);

  // changeRate audio
  app.get("/changeRate/:fileId/:playbackRate", Controllers.changeRate);
};
