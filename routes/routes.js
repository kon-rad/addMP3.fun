const Controllers = require("../controllers/controllers");

module.exports = app => {
  // Post audio
  app.post("/api/audio", Controllers.audio);

  // download audio
  app.get("/api/download/:id", Controllers.download);

  // changeRate audio
  app.get("/api/changeRate/:fileId/:playbackRate", Controllers.changeRate);
};
