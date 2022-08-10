const path = require('path');

let latestBundledExtensionContent = '';

const config = [{
  name: 'extension',
  entry: './src/extension.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: data => {
      const contentHash = data.chunk.contentHash.javascript;
      const filename = `.extension-bundle.${contentHash}.js`;
      latestBundledExtensionContent = filename;
      return filename;
    }
  }
}, {
  entry: './src/index.js',
  dependencies: ['extension'],
  output: {
    path: path.resolve(__dirname, 'ourExtension'),
    filename: 'contentScript.js'
  },
  module: {
    rules: [{
      test: /index\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'BUNDLED_EXTENSION_CONTENT',
        replace: _ => {
          return path.resolve('src', latestBundledExtensionContent);
        }
      }
    }]
  }
}];

module.exports = config;
