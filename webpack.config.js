const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  resolve: {
    fallback: {
      timers: require.resolve("timers-browserify"), // 'timers' 모듈 브라우저 폴리필
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
};
