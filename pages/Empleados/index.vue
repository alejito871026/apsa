<template>
  <div class="Empleados" v-if="autorizado">
    <barra-logeado/>
    <div class="bg-primary text-white text-center p-4">
      <h1><strong>EMPLEADOS</strong></h1>
    </div>
    <div class="row">
        <nuevo-empleado/>
        <ver-empleados/>
    </div>
  </div>
</template>

<script>
import f from "../../funciones/funciones.js";
export default {
  middleware: 'auth',
  async asyncData({$axios,app}) {   
    let logueado = await f.validarUsuario($axios)
    if(logueado.access===false){
      app.$auth.logout()
      app.router.push('/inicioSesion')
    }          
  }, 
  mounted(){
    if(this.$auth.$state.user.rol === 'ADMIN'|| this.$auth.$state.user.rol === 'SUPERADMIN'){
      this.autorizado = true
    }else{
       this.$router.push('/creditos')
    }  
  },
  data() {
    return{
      autorizado:false
    }
  }, 
}
</script>

<style>

</style>