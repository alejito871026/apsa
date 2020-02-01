<template>
  <div>
    <div><Barra/></div>
    <div>
      <div >
        <Validacion/>
      </div>
    </div>
  </div>
</template>
<script>
import Validacion from '../components/Validacion.vue'
import Barra from '../components/Barra.vue'
import axios from 'axios'
import {mapActions} from 'vuex'

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

export default {
 
  name: 'creditos',
  data () {
    return {
      user: new usuario()
    }
  },
  components: {
    Validacion,
    Barra
},
created() {
     if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    } else {
    axios.get('/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
    .then(res => {
      this.user=res.data.user
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