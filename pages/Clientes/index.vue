<template>
  <div class="Clientes">
    <barra-logeado/>
    <div class="bg-primary text-white text-center p-4">
      <h1><strong>CLIENTES</strong></h1>
    </div>
    <barra-clientes :ccc="cc" />
  </div>
</template>

<script>

import f from '../../funciones/funciones.js'
import {mapMutations} from "vuex"
export default {
  middleware: 'auth',
  async asyncData({$axios,app}){
      let logueado = await f.validarUsuario($axios)
      if(logueado.access===false){
          app.$auth.logout()
          app.router.push('/inicioSesion')
      }        
  },
  created(){    
    this.validarParams()
  },
  data() {
    return{
      cc:{},
    }
  },
  methods: {
    ...mapMutations('storeViewComponentsClientes',['estadoBotonCrearCliente','estadoCrearCliente']),
    validarParams(){
      if(this.$route.query.$$){
        this.cc.n = this.$route.query.$$
        this.cc.cc = this.$route.query.$
        this.estadoCrearCliente(true)
        this.estadoBotonCrearCliente(true)
      }else  if(this.$route.query.$!= null){
        this.cc.cc = this.$route.query.$
        this.estadoCrearCliente(true)
        this.estadoBotonCrearCliente(true)
      }else{
        this.cc = null
      }
    },
  },
}  
</script>

<style>

</style>