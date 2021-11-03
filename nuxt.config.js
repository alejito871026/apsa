export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'apsa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/crypto-vue.js' },
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //https://auth.nuxtjs.org/guide/setup#installation
    '@nuxtjs/auth-next',
    //https://nuxt-socket-io.netlify.app/installation
    'nuxt-socket-io',
    
  ],
  io: {
    sockets: [ // Required
      { // At least one entry is required
        name: 'Listados',
        url:'https://apsaconvenios.herokuapp.com/', 
        default: true,
      }
    ],
   
  },
  auth: {
    strategies: {
		local: {
      endpoints: {
				// these are the API endpoints we created in Express
          login: {
            url: '/login/iniSesion',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: '/login/usuario',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
			  tokenType: "Bearer"
      }
    },
    redirect:false,
    rewriteRedirects: true,
  },
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://apsaconvenios.herokuapp.com/server',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es'
    }
  },
  env:{
    CONTRAS: process.env.CONTRAS
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  serverMiddleware: [
    { path: '/server', handler: '~/server/server.js' }
  ]
}
//'https://apsaconvenios.herokuapp.com/'
 //baseURL: 'https://apsaconvenios.herokuapp.com/server',
 //'http://localhost:3000'
//baseURL: 'http://localhost:3000/server',
