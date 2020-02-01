<template>
  <div>
    <div>
      <div>
      <h2 class="text-center p-4 bg-primary text-white">Creditos </h2>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end sticky-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse  justify-content-end container" id="navbarNav">
          <ul class="navbar-nav ">
            <li class="btn btn-warning btn-sm" @click="solicitudes()">
                Solicitudes
              </li>
              <li class="btn btn-success btn-sm" @click="aprovados()">
                Aprovados
              </li>
              <li class="btn btn-danger btn-sm" @click="solicitudes()">
                No Aprovados
              </li>
              <li class="btn btn-success btn-sm" @click="terminados()">
                terminados
              </li>
              <li class="btn btn-warning btn-sm" @click="solicitudes()">
                No Entregados
              </li>
              <li class="btn btn-danger btn-sm" @click="enMora()">
                en mora
              </li>
              <li class="btn btn-success btn-sm" @click="activos()">
                Activos
              </li>    
          </ul>
        </div>
      </nav>
    </div>
    <Solicitudes v-if="solicitud" :respu="respues"/>
  </div>
</div>
</template>

<script>
class respu {
  constructor(respuesta) {
    this.respuesta = respuesta;
  }
}
import axios from 'axios'
import Solicitudes from '../components/Solicitudes.vue'
export default {
  name: "credito",
  components :{
    Solicitudes
  },
  data() {
    return {
      solicitud :false,
      respuesta: {},
    };
  },
  
  mounted() {
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
    this.respues = new respu()
    this.respues = this.respu
    this.solicitud = true
  },
  props: ["respu"],
  methods: {
    solicitudes() {
      this.solicitud = true
    },
    aprovados(){
      this.solicitud = false
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
