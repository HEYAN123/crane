const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 打包基础配置


// 配置css loader
const cssConfig = [
  'style-loader',
  {
    loader: 'css-loader',
    // 表示当前loader之后的loader数量
    options: {
      importLoaders: 1,
    },
  },
  'postcss-loader',
];
// 配置less loader
const lessConfig = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      // 表示当前loader之后的loader数量
      importLoaders: 2,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
      javascriptEnabled: true,
    },
  },
];

module.exports = {
  // 入口
  entry: path.join(__dirname, '../src/main.js'),
  // 出口 base里空着
  output: {
  },
  // 处理模块的规则
  module: {
    //文件转换：以什么方式去读取各种类型的文件
    rules: [
      // vue文件处理
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: cssConfig,
            less: lessConfig,
          },
          compilerOptions: {
            whitespace: 'condense',
          },
        },
      },
      // js文件处理
      {
        test: /\.js$/,
        // ?
        // loader: 'happypack/loader?id=happy-babel-js',
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      //  css样式文件处理
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', // 2 将css模块用js方法插入DOM
          'css-loader', // 1 读取css文件 转成模块
          {
            loader: 'postcss-loader', // 补全用于浏览器兼容的样式前缀
            options: {
              plugins: () => [require('autoprefixer')],
            },
          }],
      },
      //  less文件处理
      {
        test: /\.less$/,
        use: [
          'vue-style-loader', // 插入DOM
          'css-loader', // 转成模块
          {
            loader: 'postcss-loader', // 补全前缀
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          {
            loader: 'less-loader', // less转换为css
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      // 媒体文件处理
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        // ?
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: path.posix.join('', '[name].[ext]?[hash]'),
        },
      },
    ],
  },
  // 模块索引规则
  resolve: {
    extensions: ['.vue', '.js'], // 引入没有文件后缀名时按顺序匹配寻找文件
    //  三方模块寻找的位置
    modules: [
      path.resolve(__dirname, 'src'), 'node_modules',
    ],
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src/components'),
    },
  },
  // 插件
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    })
    // new ProgressBarPlugin({
    //   format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    // }),
    // new HappyPack({
    //   id: 'happy-babel-js',
    //   loaders: [{
    //     loader: 'babel-loader',
    //     cache: true,
    //     options: {
    //       babelrc: false, // 不使用 .babelrc 文件
    //       presets: [
    //         [
    //           '@babel/env',
    //           {
    //             // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
    //             modules: false,
    //             targets: {
    //               browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
    //             },
    //             // browserslist环境不支持的所有polify都导入
    //             useBuiltIns: 'entry',
    //             corejs: {
    //               version: 3, // 使用core-js@3
    //               proposals: true,
    //             },
    //             debug: false,
    //           },
    //         ],
    //       ],
    //       plugins: [
    //         '@babel/plugin-syntax-dynamic-import',
    //         // 装饰器
    //         [
    //           '@babel/plugin-proposal-decorators',
    //           {
    //             legacy: true,
    //           },
    //         ],
    //         [
    //           '@babel/plugin-proposal-class-properties',
    //           {
    //             // babel编译时，对class的属性采用赋值表达式，而不是Object.defineProperty（更简洁）
    //             loose: true,
    //           },
    //         ],
    //         [
    //           'component',
    //           {
    //             libraryName: '@jdt/find',
    //             styleLibraryName: 'theme-default',
    //           },
    //         ],
    //       ],
    //     },
    //   }],
    //   threadPool: HappyPack.ThreadPool({ size: 1 }),
    //   // 允许happPack输出日志
    //   verbose: true,
    // }),
    // new HardSourceWebpackPlugin(),
  ],
}
