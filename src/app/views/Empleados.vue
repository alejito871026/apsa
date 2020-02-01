<template>
  <div class="">
   <div><Barra></Barra></div> 
   <Registro v-if="pri" class="container text-center p-4"></Registro>
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
// @ is an alias to /src
//import HelloWorld from '../components/Validacion.vue'
import Barra from '../components/Barra.vue'
import Registro from '../components/Registro.vue'
export default {
  name: 'empleados',
  components: {
    Barra,
    Registro
  },
  data (){
    return{
      user:new usuario(),
      pri:false
    }
  },
  created(){
     if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    } else {
    this.axios.get('/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
    .then(res => {
      this.user=res.data.user
      this.pri = true
    })
    .catch(err => {
      localStorage.clear()
      if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    }
    });
    }
  },
}
</script>
