module.exports = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
    domains: ['fastly.picsum.photos'], // ✅ Add this line
  },
}