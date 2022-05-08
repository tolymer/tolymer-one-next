module.exports = {
  async redirects() {
    return [
      {
        // 昔のURLをリダイレクト
        source: "/events/:token/table",
        destination: "/events/:token",
        permanent: true,
      },
    ];
  },
};
