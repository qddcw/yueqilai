module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    devServer: {
        port: 8888,
        open: true,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                //目标服务器地址
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                  ['^' + process.env.VUE_APP_BASE_API]: '',
                }
              }
        }
    }
}