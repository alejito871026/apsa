<template>
<div>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end sticky-top">
  <a class="navbar-brand" href="/">
    Convenios Apsa
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse  justify-content-end container" id="navbarNav">
    <ul class="navbar-nav ">
        <li class="nav-item ">
          <router-link to="/"  v-if="!adentro"  class="nav-link">Inicio</router-link>
        </li>
        <li class="nav-item" v-if="adentro" >
          <router-link to="/creditos"  class="nav-link">Creditos</router-link>
        </li>
        <li class="nav-item " v-if="adentro">
          <router-link to="/clientes"  class="nav-link">Clientes</router-link>
        </li>
        <li class="nav-item " v-if="user.rol=='SUPERADMIN'">
          <router-link to="/Empleados"  class="nav-link">empleados</router-link>
        </li> 
        <li class="nav-item " v-if="adentro">
          <router-link to="/clientes"  class="nav-link">Mi Perfil</router-link>
        </li>
        <li class="nav-item " v-if="!adentro" >
          <router-link to="/inicioSesion"  class="nav-link">iniciar Sesion</router-link>
        </li>
        <li class="nav-item " v-if="adentro">
          <a @click="salir"  class="nav-link">salir</a>
        </li>
    </ul>
  </div>
</nav>
</div>
</template>

<script>
class usuario {
  constructor(){
    this.nombre = '';
    this.apellidos = '';
    this.codigo = '';
    this.direccion = '';
    this.celular = '';
    this.rol= '';
  }
}
import { mapGetters } from 'vuex'
export default {
  
  name: 'Barra',
  props: {
    msg: String
  },
  data(){
    return{
      adentro:true,
      user : new usuario()
    }
  },
  computed:{
    //...mapGetters(["siEstaAdentro"])
  },
   created() {
     if(localStorage.getItem ('token') === null){
    this.adentro=false
  }else{
  this.axios.get('/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
    .then(res => {
      this.user=res.data.user
    })
  }
  }, 
  methods:{
     salir(){
       localStorage.clear()
       this.$router.push('/inicioSesion')
     }
  }
} 
</script>

<style>

</style>