const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // 프록시를 설정할 경로
    createProxyMiddleware({
      target: 'https://www.koreaexim.go.kr', // API 서버 주소
      changeOrigin: true, // 원본 서버 도메인과 다를 경우 true
      pathRewrite: {
        '^/api': '', // '/api'를 제거하고 실제 API 엔드포인트를 호출
      },
    })
  );
};
