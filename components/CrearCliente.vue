<template>
  <div class="container p-4 ">
        <div class="mx-auto">
          <div class="card bg-primary text-white">
            <div class="card-head p-2">
              <div class="p-2 bg-primary text-center">
                <h2 class="p-3" v-if="editando"><strong>Editando Cliente</strong></h2>
                <h2 class="p-3" v-else><strong>Agregar nuevo Cliente</strong></h2>
              </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="guardarCliente">                
                <div class="row form-group">
                    <div class="col-sm-4">
                        <span>Nombre Cliente</span>
                        <input v-model="cliente.nombreCliente" required type="text" min="3" placeholder="Nombre" class="form-control"/>
                    </div>
                  <div class="col-sm-4">
                    <span>1 Apellido</span>
                    <input
                      v-model="cliente.primerApellidoCliente" required type="text" min="3" placeholder="primer apellido" class="form-control" />
                  </div>  
                  <div class="col-sm-4">
                    <span>2 apellido</span>
                      <input
                      v-model="cliente.segundoApellidoCliente" required type="text" min="3" placeholder="segundo apellido" class="form-control"/>
                  </div>
                </div>  
                <div class="row form-group"  >
                    <div class="col-sm-4" v-if="editando">                        
                      <span>Numero de Cedula cliente</span>
                      <div class="form-control">{{cliente.cedulaIdCliente}}</div>
                    </div>
                    <div class="col-sm-4" v-else>                        
                      <span>Numero de Cedula cliente</span>
                      <input
                          v-model="cliente.cedulaIdCliente"
                          required
                          type="text"
                          min="7"
                          placeholder="CC"
                          class="form-control"
                      />
                    </div>
                    <div class="col-sm-4">
                        <span>Celular</span>
                        <input
                        v-model="cliente.celularUnoCliente"
                        required
                        type="text"
                        min="10"
                        placeholder="Celular personal"
                        class="form-control "
                    />
                    </div>  
                    <div class="col-sm-4">
                        <span>Otro Numero de contacto</span>
                        <input
                        v-model="cliente.celularDosCliente"
                        required
                        type="text"
                        min="10" placeholder="Otro numero de contacto" class="form-control"
                    />
                    </div>
                </div>
                <div class="row form-group">
                    <div class=" col-md-4">
                    <span>Direccion</span>
                    <input
                        v-model="cliente.direccionCliente"
                        required
                        type="text"
                        min="13"
                        placeholder="Direccion"
                        class="form-control"
                    />
                    </div>
                    <div class="col-md-4">
                    <span>Barrio</span>
                    <input
                        v-model="cliente.barrioCliente"
                        required
                        type="text"
                        min="13"
                        placeholder="Direccion"
                        class="form-control"
                    />
                    </div>
                    <div class="col-md-4">
                    <span>Ciudad</span>
                    <input
                        v-model="cliente.ciudadCliente"
                        required
                        type="text"
                        min="13"
                        placeholder="Direccion"
                        class="form-control"
                    />
                    </div>                
                </div>         
                <div class="row form-group">
                    <div class=" col-md-4">
                    <span>Tipo de vivienda</span>
                    <select v-model="cliente.tViviendaCliente" required  class="custom-select">
                        <option value="propia">Propia</option>
                        <option value="familiar">Familiar</option>
                        <option value="alquiler">Alquiler</option>
                    </select>
                    </div>
                    <div class="col-md-4">
                    <span>Ocupacion</span>
                    <input
                        v-model="cliente.ocupacionCliente"
                        required
                        type="text"
                        placeholder="Ocupacion"
                        class="form-control"
                    />
                    </div>
                    <div class="col-md-4">
                    <span>Personas a cargo</span>
                    <input
                        v-model="cliente.PcargoCliente"
                        required
                        type="number"
                        min="0"
                        class="form-control"
                    />
                    </div>                
                </div>
                <div class="row form-group">
                    <div class="col-md-6">
                    <span>Email</span>
                    <input
                        v-model="cliente.emailCliente"
                        type="email"
                        min="13"
                        placeholder="Email"
                        class="form-control"
                    />
                    </div>
                    <div class=" col-md-6">
                      <span>Fecha nacimiento</span>
                      <input
                          v-model="cliente.fechaNacCliente"
                          required
                          type="date"
                          class="form-control"
                      />
                    </div>              
                </div>
                <div v-if="editando">
                  <span>Descripcion de la edicion</span>
                  <textarea v-model="cliente.descripcionEdicion" rows="2" class="form-control" required></textarea>
                  <br>
                </div>   
                <div class="form-group">
                  <div class="btn btn-success btn-block" v-if="editando" @click="guardarEdicion()"><h2><strong>Reguardar el  Cliente</strong></h2></div>
                  <button class="btn btn-success btn-block" v-else><h2><strong>Registrar cliente</strong></h2></button>
                  <div class="btn btn-danger btn-block" v-if="editando" @click="cancelarEdicion()"><h2><strong>Cancelar edicion</strong></h2></div>
                  <div class="btn btn-danger btn-block" v-else @click="cancelarRegistro()"><h2><strong>Cancelar registro cliente</strong></h2></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
  props:['cc'],
  data(){
      return {
          cliente:{},
          editando:false,
      }
  },
  created(){
    this.validarProps()    
  },
  methods: {
    ...mapMutations('storeViewComponentsClientes',['estadoBotonCrearCliente','estadoCrearCliente','estadoTablaClientes']),
    validarProps() {
      if(this.$route.query.$$){
        this.cc.cedulaId=this.$route.query.$
        this.cargarCliente(this.cc)
      }else if(this.cc!=null){
        this.cliente.cedulaIdCliente = parseInt(this.cc.cedulaId)
      }else{
        this.cliente.cedulaIdCliente = null
      }                 
    },
    async guardarCliente(){
      if( this.cliente.nombreCliente == "" || this.cliente.nombreCliente == undefined 
      || this.cliente.primerApellidoCliente =="" || this.cliente.primerApellidoCliente ==undefined 
      || this.cliente.segundoApellidoCliente =="" || this.cliente.segundoApellidoCliente ==undefined 
      || this.cliente.cedulaIdCliente == "" || this.cliente.cedulaIdCliente == undefined
      || this.cliente.celularUnoCliente =="" || this.cliente.celularUnoCliente ==undefined
      || this.cliente.direccionCliente =="" || this.cliente.direccionCliente ==undefined
      || this.cliente.barrioCliente =="" || this.cliente.barrioCliente == undefined
      || this.cliente.ciudadCliente =="" || this.cliente.ciudadCliente == undefined
      || this.cliente.tViviendaCliente =="" || this.cliente.tViviendaCliente == undefined
      || this.cliente.ocupacionCliente =="" || this.cliente.ocupacionCliente == undefined
      || this.cliente.PcargoCliente =="" || this.cliente.PcargoCliente == undefined
      || this.cliente.emailCliente =="" || this.cliente.emailCliente == undefined
      || this.cliente.fechaNacCliente =="" || this.cliente.fechaNacCliente == undefined
      ){
          alert('todos los campos son obligatorios')
          return
      }else{ 
        let h = new Date()
        let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
        this.cliente.fechaAgregadoCliente = hoy
        let cliente = this.cliente
        console.log(this.cliente)
        let res  = await this.$axios.$post("clientes/registro",cliente)
        if(res.status===205){
            alert('El token a vencido o no existe')
            this.$auth.logout()
            this.$router.push("/inicioSesion")
        }
        if(res.status===200){
            this.cliente = {}
            alert(res.msg)
            this.estadoCrearCliente(false)
            this.estadoBotonCrearCliente(false)
            this.estadoTablaClientes(true)
        }                    
        if (res.status==202) {
          console.log(res)
            let mens = ''
            for(var property in res.error.keyValue) {
                mens = res.error.keyValue[property];
            }
            alert(res.title +' Este dato ya se encuentra registrado '+ mens)
        }                
      }       
    },
    async cargarCliente(cc){  
      this.editando = true         
      const cliente = await this.$axios.$post("/clientes/busqueda",cc)
      this.cliente = cliente.cliente[0]
      let fechaNacCliente =""
      for (let a = 0; a < 10; a++) {
        fechaNacCliente = fechaNacCliente+cliente.cliente[0].fechaNacCliente[a]; 
      }
      this.cliente.fechaNacCliente = fechaNacCliente
    },
    cancelarEdicion(){
      this.estadoCrearCliente(false)
      this.estadoBotonCrearCliente(false)
      this.cliente = {}
      if(this.$route.query.$$==2){
        this.$router.push('/creditos')
      }
      if(this.$route.query.$$==3){
        this.estadoCrearCliente(false)
        this.estadoBotonCrearCliente(false)
      }
    },
    cancelarRegistro(){
      this.estadoCrearCliente(false)
      this.estadoBotonCrearCliente(false)
      this.cliente = {}
    },
    async guardarEdicion(){
      if( this.cliente.nombreCliente == "" || this.cliente.nombreCliente == undefined 
      || this.cliente.primerApellidoCliente =="" || this.cliente.primerApellidoCliente ==undefined 
      || this.cliente.segundoApellidoCliente =="" || this.cliente.segundoApellidoCliente ==undefined 
      || this.cliente.cedulaIdCliente == "" || this.cliente.cedulaIdCliente == undefined
      || this.cliente.celularUnoCliente =="" || this.cliente.celularUnoCliente ==undefined
      || this.cliente.direccionCliente =="" || this.cliente.direccionCliente ==undefined
      || this.cliente.barrioCliente =="" || this.cliente.barrioCliente == undefined
      || this.cliente.ciudadCliente =="" || this.cliente.ciudadCliente == undefined
      || this.cliente.tViviendaCliente =="" || this.cliente.tViviendaCliente == undefined
      || this.cliente.ocupacionCliente =="" || this.cliente.ocupacionCliente == undefined
      || this.cliente.PcargoCliente =="" || this.cliente.PcargoCliente == undefined
      || this.cliente.emailCliente =="" || this.cliente.emailCliente == undefined
      || this.cliente.fechaNacCliente =="" || this.cliente.fechaNacCliente == undefined
      || this.cliente.descripcionEdicion=="" || this.cliente.descripcionEdicion== undefined
      ){
          alert('todos los campos son obligatorios')
          return
      }else{ 
        let cliente = this.cliente
        cliente.codigoEmpleadoEditor = this.$auth.user._id
        console.log(this.cliente)
        let res  = await this.$axios.$post("clientes/guardarEdicionCliente",cliente)
        console.log(res)
        if(res.status===205){
            alert('El token a vencido o no existe')
            this.$auth.logout()
            this.$router.push("/inicioSesion")
        }
        if(res.status===200){
            this.cliente = {}
            alert(res.message)
            this.estadoCrearCliente(false)
            this.estadoBotonCrearCliente(false)
            this.estadoTablaClientes(true)
        }                    
        if (res.status==202) {
          console.log(res)
            let mens = ''
            for(var property in res.error.keyValue) {
                mens = res.error.keyValue[property];
            }
            alert(res.message)
        }
        if (res.status==201) {
            alert(res.message)
        }                
      }       
    },
  },
}
</script>

<style>

</style>