const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const fs = require('fs')
const Dotenv = require('dotenv-webpack')
const { DefinePlugin } = require('webpack')

module.exports = async () => {
  const publicKey = await fs.promises.readFile('./public_key.pem', { encoding: 'utf-8' })
  return {
    ...common(),
    mode: 'production',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    plugins: [
      new Dotenv(),
      new DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
        'process.env.ACCESS_TOKEN_KEY': JSON.stringify(process.env.ACCESS_TOKEN_KEY),
        'process.env.ACCESS_TOKEN_NAME': JSON.stringify(process.env.ACCESS_TOKEN_NAME),
        'process.env.SECURITY_PUBLIC_KEY': JSON.stringify(publicKey)
      }),
      new HtmlWebpackPlugin({
        template: './src/presentation/common/templates/production.html',
        favicon: './src/assets/images/common/favicon.png'
      })
    ]
  }
}
