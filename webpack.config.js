const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  console.log(env)
  console.log(env.browser)
  const config = {
    entry: {
      background: "./background_scripts/background.js",
      popup: "./popup/popup.js"
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: `./manifest/${env.browser}.json`, to: "manifest.json" },
          { from: "./popup/popup.css" },
          { from: "./popup/popup.html" },
          { from: "./icons", to: "icons" },
          { from: "./_locales", to: "_locales" },
          { from: './node_modules/webextension-polyfill/dist/browser-polyfill.js' },
        ],
      }),
    ]
  }
  return config
};