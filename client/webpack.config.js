const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },

    // List of plugins used in the build process
    plugins: [
      // Generate HTML file using provided template and title
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),

      // Generate the Webpack PWA manifest for the text editor app
      new WebpackPwaManifest({
        fingerprints: false, // Thanks to Milena Wheatcroft for helping me to ensure that the icon will display in the application.
        name: "JATE Text Editor",
        short_name: "JATE",
        description: "A text editor that can be accessed through a browser",
        background_color: "#36454F",
        theme_color: "#36454F",
        start_url: "./",
        publicPath: "./",
        display: "standalone",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // Use Workbox to inject a service worker into the build
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],

    // Module rules for handling different file types
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
