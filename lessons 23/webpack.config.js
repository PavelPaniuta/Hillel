const path = require('path');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/main.js', // Входной файл
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
    clean: true,
  },
  mode: 'development', // Установите режим разработки
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html', // Укажите путь к вашему исходному index.html
      filename: 'index.html', // Имя выходного файла
    }),
  ],
  module: {
    rules: [
        {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            type: "asset",
        },
        {
            test: /\.scss$/, 
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        },
    ],
  },
  optimization: {
    minimizer: [
        "...", 
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    {
                                        name: "preset-default",
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                addAttributesToSVGElement: {
                                                    params: {
                                                        attributes: [
                                                            { xmlns: "http://www.w3.org/2000/svg" },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ],
},
};