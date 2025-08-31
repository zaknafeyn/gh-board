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
  externalsPresets: {
    node: true,
  },
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
    module: true,
    chunkFormat: 'module',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: 'gh-mindsight' }],
    // }),
    new ShebangPlugin({ chmod: 0o755, shebangRegExp: /[\s\n\r]*(#!.*)[\s\n\r]*/gm }),
  ],
  // plugins: [
  //   {
  //     apply: (compiler) => {
  //       const { Compilation } = compiler.webpack;
  //       compiler.hooks.compilation.tap('AddShebangPlugin', (compilation) => {
  //         compilation.hooks.processAssets.tap(
  //           {
  //             name: 'AddShebangPlugin',
  //             stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
  //           },
  //           (assets) => {
  //             // Add shebang to all platform binaries
  //             Object.keys(assets).forEach(assetName => {
  //               if (assetName.startsWith('gh-board')) {
  //                 const asset = assets[assetName];
  //                 const source = asset.source();
  //                 const newSource = '#!/usr/bin/env node\n' + source;
  //                 compilation.updateAsset(assetName, new compiler.webpack.sources.RawSource(newSource));
  //               }
  //             });
  //           }
  //         );
  //       });
  //     }
  //   }
  // ],
  optimization: {
    minimize: false,
  },
};
