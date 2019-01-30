const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/public/index.html",
  filename: "./index.html"
});

const config = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "client/build"),
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};

if (process.env.NODE_ENV !== "production") {
  config.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ["nodemon index.js -- watch build"]
    })
  );
}

module.exports = config;
