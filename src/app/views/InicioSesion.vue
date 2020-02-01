<template>
  <div>
    <Barra></Barra>

    <div class="p-4 container-col-lg-12 text-center">
      <div class="mx-auto">
        <div class="card text-center bg-primary text-white">
          <div class="card-header">
            <h3 class="p-2">Iniciar Sesion</h3>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="inicioSesionn">
              <div class="form-group">
                <div class="col-lg-12">
                  <span>Cedula</span>
                  <input v-model="cedula" type="text" placeholder="cedula" class="form-control" />
                </div>
                <div class="col-lg-12">
                  <span>Contraseña</span>
                  <input
                    v-model="contrasena"
                    type="password"
                    placeholder="Contraseña"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group col-lg-12">
                <button class="btn btn-success btn-block">Iniciar Sesion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Barra from "../components/Barra.vue";
import { mapActions } from "vuex";

export default {
  name: "inicioSesion",
  components: {
    Barra
  },

  created() {
    if (localStorage.getItem("token") != null) {
      this.$router.push("/Creditos");
    }
  },
  data() {
    return {
      cedula: "",
      contrasena: ""
    };
  },
  methods: {
    inicioSesionn() {
      const user = {
        cedula: this.cedula,
        contrasena: this.contrasena
      };
      if (user.cedula == '0000' && user.contrasena == '0000'){
        this.axios
          .post("/api/login/registroUnico", user)
          .then(res => {
            console.log(res)
            if(res.status === 200){    
              const unica = this.CryptoJS.HmacSHA1("*DAhd871026#",'*DAhd871026#')
              const dos = this.CryptoJS.HmacSHA1(unica,'*DAhd871026#') 
              localStorage.setItem('unicaRSU', dos)
              this.$router.push("/rsu");
            } 
          })
          .catch(err => {
            //console.log(err.response);
             return
          });
      }else{
        this.$store.dispatch('LOGIN',user)
        .then( res => {
            this.$router.push("/creditos");
        },
        err => {
          alert(err.response.data.error);
        }
      );
      } 
    }
  }
};
</script>
