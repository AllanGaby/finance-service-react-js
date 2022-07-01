const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = () => {
  return {
    entry: './src/main/index.tsx',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'main-bundle-[fullhash].js',
      publicPath: '/'
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
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' }
        ]
      })
    ]
  }
}
