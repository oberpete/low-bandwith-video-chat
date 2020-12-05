module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/low-bandwith-video-chat/'
  : '/'
}