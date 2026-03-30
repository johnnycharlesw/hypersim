import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

/** @type {import('webpack').Configuration} */
export default {
  mode,
  target: 'electron-renderer',
  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
  entry: {
    mainview: './src/browser/mainview.ts',
    titlescreen: './src/browser/titlescreen.ts',
  },
  output: {
    path: path.resolve(__dirname, 'out/browser'),
    filename: '[name].js',
    clean: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.renderer.json',
          transpileOnly: true,
        },
      },
    ],
  },
};
