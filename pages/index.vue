<template>
  <div>
    <barra-logeado v-if="$auth.$state.loggedIn"/>
    <barra v-else/>
  </div>
</template>
<script>
const f = require ("../funciones/funciones.js")
export default {
  middleware: 'auth',
  async asyncData({$axios,app}){
    if(app.$auth.$state.loggedIn){
      let logueado = await f.validarUsuario($axios)
      if(logueado.access===false){
          app.$auth.logout()
          app.router.push('/')
      } 
    }               
  },

}
</script>
