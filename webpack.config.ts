import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Configuration, ResolveOptions, RuleSetRule } from 'webpack';

type ExtendedConfiguration = Configuration & {
  devServer?: {
    static?: {
      directory: string;
    };
    port?: number;
    open?: boolean;
    hot?: boolean;
    historyApiFallback?: boolean;
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rules: RuleSetRule[] = [
  {
    test: [/.ts$/, /.tsx$/],
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
      },
    ],
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
];

const resolve: ResolveOptions = {
  modules: [__dirname + '/node_modules'],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
};

const configuration: ExtendedConfiguration = {
  mode: 'development',
  entry: './src/app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: './dist',
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  module: { rules },
  resolve,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};

export default configuration;
