# crane

## script

- npm run dev 启动开发环境服务
- npm run build 打包静态文件

## path

### build/ webpack相关

- build/build.js 打包静态文件脚本（使用prod配置）
- build/webpack.prod.config.js 打包时使用的webpack配置

- build/dev-server.js 启动开发环境服务脚本（使用dev配置）
- build/webpack.dev.config.js 开发环境使用的webpack配置

- build/webpack.base.config.js 基础webpack配置，dev和prod的公共配置
