const path = require('path');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: './main.js', // Входной файл
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
  },
  mode: 'development', // Установите режим разработки
  devServer: {
    static: {
      directory: path.join(__dirname, './'), // Папка для статики
    },
    port: 8080, // Порт сервера (по умолчанию 8080)
    open: true, // Автоматически открывать браузер
    hot: true, // Включить горячую перезагрузку
  },
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