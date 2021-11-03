<template>
  <div class="sticky-top">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-nav>
          <router-link to="/" class="nav-link text-white"><h5>Convenios-APSA</h5></router-link>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav @click="abrirCalculadora()" class="nav-link btn">Calculadora</b-navbar-nav>
            <router-link to="/creditos" class="nav-link btn">Creditos</router-link>
            <router-link to="/productos" class="nav-link btn">Productos</router-link>
            <router-link to="/clientes" class="nav-link btn">Clientes</router-link> 
            <router-link v-if="$auth.$state.user.rol==='ADMIN'|| $auth.$state.user.rol ==='SUPERADMIN'" to="/empleados" class="nav-link btn">Empleados</router-link>
            <router-link to="/contabilidad" class="nav-link btn">Contabilidad</router-link>
            <router-link to="/perfil" class="nav-link btn">Mi Perfil</router-link>
            <b-navbar-nav @click="salir()" class="nav-link btn">Cerrar sesion</b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>  
    <footer-activo/>
    <calcu-creditos v-if="modalCalculadora"/>    
  </div>
</template>
<script>
import f from "../funciones/funciones.js";
import {mapState,mapMutations} from "vuex"
export default {
  name: "barraLogeado",
  computed:{
    ...mapState('Autenticacion',['modalCalculadora'])
  },    
  data(){
    return {
      admin:true, 
      logueado:false,
      calculadora:false,   
      contras : "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%",        
    }
  },
  
  mounted(){
  },
  methods: { 
    ...mapMutations('Autenticacion',['estadoCalculadora']),    
    abrirCalculadora(){
      this.estadoCalculadora(true)
    },
    salir() {
      localStorage.clear();
      this.$router.push("/inicioSesion");
      this.$auth.logout()
    },
  }
}

</script>

<style>

</style>