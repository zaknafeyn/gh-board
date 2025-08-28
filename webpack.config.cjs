const path = require('path');

module.exports = {
  entry: './src/index.tsx',
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
    filename: 'index.js',
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
    {
      apply: (compiler) => {
        const { Compilation } = compiler.webpack;
        compiler.hooks.compilation.tap('AddShebangPlugin', (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: 'AddShebangPlugin',
              stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
            },
            (assets) => {
              const asset = assets['index.js'];
              if (asset) {
                const source = asset.source();
                const newSource = '#!/usr/bin/env node\n' + source;
                compilation.updateAsset('index.js', new compiler.webpack.sources.RawSource(newSource));
              }
            }
          );
        });
      }
    }
  ],
  optimization: {
    minimize: false,
  },
};