const pkg = require('./package')

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Router config
   */
  router: {
    middleware: 'check',
    linkExactActiveClass: 'active'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/scss/bracket.scss',
    'vue-multiselect/dist/vue-multiselect.min.css',
    '~/assets/css/fontawesome.all.css',
    '~/assets/Ionicons/css/ionicons.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vcalendar', '~/plugins/axiosplugin',
    {
      src: '~/plugins/formatDatePlugins.js',
      ssr: false
    },
    {
      src: '~/plugins/dropzone.js',
      ssr: false
    },
    {
      src: '~/plugins/toggle-button.js',
      ssr: false
    },
    // todo change this lib
    {
      src: '~/plugins/zoomer.js',
      ssr: false
    },
    '~/plugins/vuewizard'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    'nuxt-izitoast'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true, // Can be also an object with default options
    credentials: true
    // proxyHeaders: false
  },
  proxy: {
    '/api_proxy/': {
      // target: 'https://muhit.xyz/',
      target: 'http://localhost:8080/',
      pathRewrite: {
        '^/api_proxy/': ''
      }
    }
  },

  /*
   ** izitoast
   */
  izitoast: {
    position: 'topRight',
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {

        /*
          config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        */
      }
    }
  }
}
