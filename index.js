const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

require("./routes/routes")(app);

const PORT = 8080;

// if (process.env.NODE_ENV === "production") {
// express will serve production assets
app.use(express.static("client/build"));
// express will serve static files if it doesn't recognize the route
const path = require("path");
console.log("inside prod");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
