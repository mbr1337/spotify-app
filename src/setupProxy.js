const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/auth/**', '/me', '/me/**', '/browse/**'],
        createProxyMiddleware({
            target: 'http://localhost:5000',
            // changeOrigin: true,
        })
    );
};