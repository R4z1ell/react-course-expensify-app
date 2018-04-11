const path = require("path");
const webpack = require("webpack");
/* This 'extract-text-webpack-plugin' is a third-party Webpack PLUGIN that will help us to EXTRACT ALL THE 'css'
or 'sass' files FROM our 'bundle.js' file and put them INSIDE their OWN file(that we named 'styles.css'). In
this way we'll be able to PASS the 'styles.css' file INSIDE our 'index.html'(through a 'link' tag as usual) file 
and LOAD them BEFORE we run our JavaScript */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}

module.exports = env => {
  // IF 'env' is equal to the string 'production' THEN this 'isProduction' variable will have a value of TRUE
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
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
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        )
      })
    ],
    /* When the 'isProduction' variable is TRUE we'll use the 'source-map' that is a source IDEAL for PRODUCTION
    and that give us a 'bundle.js' file that has a very SMALL size, instead if 'isProduction' is false we'll use 
    the OTHER source so the "inline-source-map" for DEVELOPMENT */
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      /* With this 'historyApiFallback' set to TRUE we're telling the 'Webpack Dev Server' that we're going to 
      be handling ROUTING via OUR Client side code(and NOT via Server side ANYMORE) and that it SHOULD send 
      BACK to us the ROOT Route which contains the 'index.html' AND the 'bundle.js' files so that we can have 
      the Client taking OVER the ROUTING */
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  };
};
