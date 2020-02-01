<template>
  <div class="home">
   <Registro v-if="primero" class="container text-center p-4"></Registro> 
  </div>
</template>
<script>
import Registro from '../components/Registro.vue'
export default {
  name: 'registroSuperU',
  components: {
    Registro
  },
  data (){
    return{
      primero : false
    }
  },
  created() {
    let token = localStorage.getItem('unicaRSU')
    if (token != null){
      const unica = this.CryptoJS.HmacSHA1("*DAhd871026#",'*DAhd871026#')
      const dos = this.CryptoJS.HmacSHA1(unica,'*DAhd871026#') 
        if (token == dos){
            this.primero= true
        }
      }else{
        console.log(token)
        if(token == null){
        this.$router.push("/inicioSesion");
        }
    }
  },
}
</script>
