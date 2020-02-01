<template>
  <div class="container p-4">
    <div class="mx-auto">
      <div class="card text-center bg-primary text-white">
        <div class="card-header">
          <h3 class="p-2">Registrar Empleado</h3>
        </div>
        <div class="card-body">
          <form method="post" @submit.prevent="guardarEmpleado()">
            <div class="form-group">
              <span>
                <h4>Nombre del Empleado</h4>
              </span>
              <input
                v-model="empleado.nombreE"
                type="text"
                placeholder="Nombre completo"
                class="form-control"
              />
            </div>
            <div class="row form-group">
              <div class="col-lg-6">
                <span>1 Apellido</span>
                <input
                  v-model="empleado.primerApellidoE"
                  required
                  type="text"
                  min="3"
                  placeholder="primer apellido"
                  class="form-control"
                />
              </div>
              <div class="col-lg-6">
                <span>2 apellido</span>
                <input
                  v-model="empleado.segundoApellidoE"
                  required
                  type="text"
                  min="3"
                  placeholder="segundo apellido"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row form-group">
              <div class="col-lg-6">
                <span>Cedula</span>
                <input
                  v-model="empleado.cedulaE"
                  type="text"
                  placeholder="cedula"
                  class="form-control"
                />
              </div>
              <div class="col-lg-6">
                <span>Contraseña</span>
                <input
                  v-model="empleado.contrasenaE"
                  type="password"
                  placeholder="Contraseña"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-lg-6">
                <span>Telefono</span>
                <input
                  v-model="empleado.celularE"
                  type="text"
                  placeholder="Telefono"
                  class="form-control"
                />
              </div>
              <div class="form-group col-lg-6">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  class="form-control"
                  v-model="empleado.emailE"
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-lg-6">
                <span>fecha de nacimiento</span>
                <input
                  v-model="empleado.fechaNacE"
                  type="date"
                  placeholder="Fecha de nacimiento"
                  class="form-control"
                />
              </div>
              <div class="form-group col-lg-6">
                <span>Rol</span>
                <select v-model="empleado.rol" required class="col-lg-12 form-control">
                  <option v-if="suadmin">SUPERADMIN</option>
                  <option v-if="!suadmin">ADMIN</option>
                  <option v-if="!suadmin">EMPLEADO</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <span>Direccion</span>
              <input
                v-model="empleado.direccionE"
                type="text"
                placeholder="Direccion"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button class="btn btn-success btn-block">Guardar</button>
            </div>
          </form>
          <div class="form-group">
            <a class="btn btn-danger btn-block">regresar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class empleado {
  constructor(
    nombreE,
    primerApellidoE,
    segundoApellidoE,
    cedulaE,
    contrasenaE,
    celularE,
    direccionE,
    emailE,
    fechaNacE,
    rol,
    fechaAgregado
  ) {
    this.nombreE = nombreE;
    this.primerApellidoE = primerApellidoE;
    this.segundoApellidoE = segundoApellidoE;
    this.cedulaE = cedulaE;
    this.contrasenaE = contrasenaE;
    this.celularE = celularE;
    this.direccionE = direccionE;
    this.emailE = emailE;
    this.rol = rol;
    this.fechaAgregado =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
  }
}
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
import axios from 'axios'
export default {
  name: "clientes",
  components: {},
  data() {
    return {
      empleado: new empleado(),
      user: new usuario(),
      persona: [],
      suadmin:false
    };
  },
  created() {
    let token = localStorage.getItem('unicaRSU')
    if (token != null){
      const unica = this.CryptoJS.HmacSHA1("*DAhd871026#",'*DAhd871026#')
      const dos = this.CryptoJS.HmacSHA1(unica,'*DAhd871026#') 
        if (token == dos){
          this.suadmin = true
          localStorage.clear()
        }
      }
  },
  mounted() {
    if(this.suadmin == false){
      axios.get('/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
      .then(res => {
        this.user=res.data.user
      })
    }
  },
  
  methods: {
    guardarEmpleado() {
      const muestra = confirm(
        "seguro de agrgar empleado" + JSON.stringify(this.empleado)
      );
      if (muestra) {
        this.axios
          .post("/api/login/registro", this.empleado)
          .then(res => {
            alert("Empleado Creado con Exito");
            this.empleado = new empleado();
            this.$router.push("/inicioSesion");
          })
          .catch(err => {
            console.log(err.response);
            alert(
              "Empleado no registrado, la Cedula # " +
                this.empleado.cedulaE +
                "  ya se encuentra registrada"
            );
          });
      }
    }
  }
};
</script>

<style>
</style>