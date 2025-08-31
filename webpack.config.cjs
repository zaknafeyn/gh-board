const path = require('path');
const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = {
  // Tell webpack the root file of our console application
  entry: {
    'index.js': './src/index.tsx',
    'gh-board-darwin-arm64': './src/index.tsx',
    'gh-board-darwin-x86_64': './src/index.tsx',
    'gh-board-linux-i386': './src/index.tsx',
    'gh-board-linux-x86_64': './src/index.tsx',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts', '.tsx'],
    },
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // disable chunks
    chunkFormat: false,
    module: true,
    library: {
      type: 'module',
    },
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: 'gh-mindsight' }],
    // }),
    new ShebangPlugin({ chmod: 0o755, shebangRegExp: /[\s\n\r]*(#!.*)[\s\n\r]*/gm }),
  ],
  optimization: {
    minimize: true,
  },
  experiments: {
    outputModule: true
  }
};
