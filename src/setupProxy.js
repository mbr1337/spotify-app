const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/auth/**', '/spotify/**', 'spotify/browse/**', 'spotify/playlist/**', '/playlist/**'],
        createProxyMiddleware({
            target: 'http://localhost:5000',
            // changeOrigin: true,
        })
    );
};