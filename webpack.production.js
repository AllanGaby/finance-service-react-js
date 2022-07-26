const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = async () => {
  const publicKey = await fs.promises.readFile('./public_key.pem', { encoding: 'utf-8' })
  return {
    entry: './src/main/index.tsx',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'main-bundle-[fullhash].js',
      publicPath: ''
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    mode: 'production',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    devServer: {
      contentBase: './public',
      writeToDisk: true,
      historyApiFallback: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' }
        ]
      }),
      new Dotenv(),
      new DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
        'process.env.ACCESS_TOKEN_KEY': JSON.stringify(process.env.ACCESS_TOKEN_KEY),
        'process.env.ACCESS_TOKEN_NAME': JSON.stringify(process.env.ACCESS_TOKEN_NAME),
        'process.env.SECURITY_PUBLIC_KEY': JSON.stringify(publicKey)
      }),
      new HtmlWebpackPlugin({
        template: './src/main/application/templates/production.html',
        favicon: './src/assets/images/common/favicon.png'
      })
    ]
  }
}
