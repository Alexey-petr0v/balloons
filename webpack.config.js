const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  pages: path.resolve(__dirname, "pages"),
  docs: path.resolve(__dirname, "docs"),
  projBlocks: path.resolve(__dirname, "project.blocks").replace(/\\/g, "/"),
}
module.exports = {
  entry: {
    bundle: PATHS.pages + "/index.js"
  },
  output: {
    filename: "[name].js",
    path: PATHS.docs,
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { context: PATHS.projBlocks, from: "**/images/*", to: "images/", flatten: true },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/index.pug',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, 'library.blocks/fonts/'),
        use: [
                {
                  loader: 'file-loader?name=fonts/[name].[ext]'
                }
             ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: path.resolve(__dirname, 'library.blocks/fonts/'),
        use: [
                {
                  loader: 'file-loader?name=images/[name].[ext]'
                }
             ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, PATHS.docs)
  }
}