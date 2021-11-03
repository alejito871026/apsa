<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark"> 
        <b-navbar-nav>
          <router-link to="/" class="nav-link text-white"><h5>Convenios-APSA</h5></router-link>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <router-link to="/"  class="nav-link">Inicio</router-link>
            <router-link to="/inicioSesion" class="nav-link">iniciar Sesion</router-link>            
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  </div>
</template>
<script>
export default {
  name: "barra",
  mounted(){
  },
  data(){
    return {      
    }
  },
  methods:{
  }
};
</script>