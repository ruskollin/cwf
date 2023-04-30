const Dotenv = require('dotenv-webpack');

module.exports = {
  // Other configuration options...
  plugins: [
    // Other plugins...
    new Dotenv()
  ],
  resolve: {
    fallback: {
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify"),
        "fs": false
      }
  }
};