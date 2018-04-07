const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    /* With this 'historyApiFallback' set to TRUE we're telling the 'Webpack Dev Server' that we're going to be
    handling ROUTING via OUR Client side code(and NOT via Server side ANYMORE) and that it SHOULD send BACK to 
    us the ROOT Route which contains the 'index.html' AND the 'bundle.js' files so that we can have the Client 
    taking OVER the ROUTING */
    historyApiFallback: true
  }
};
