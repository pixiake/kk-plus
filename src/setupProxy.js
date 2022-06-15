const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware( {
            target: 'http://139.198.113.239:38080',
            changeOrigin: true,
            // pathRewrite: {'^/api': ''}
        })
    )
}