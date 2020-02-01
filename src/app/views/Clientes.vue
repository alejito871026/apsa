<template>
  <div class="agregarCliente">
    <div>
      <Barra />
    </div>
    <div class="row">
      <div class="container p-4 col-md-5">
        <div class="mx-auto">
          <div class="card bg-primary text-white">
            <div class="card-head p-2">
              <div class="p-2 bg-primary text-center">
                <h2 v-if="registrar">Agregar nuevo Cliente</h2>
                <h2 v-if="reguardar">Editando Cliente</h2>
              </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="validarCliente">
                <div class="form-group">
                  <span>Nombre Cliente</span>
                  <input
                    v-model="cliente.nombreCliente" required type="text" min="3" placeholder="Nombre" class="form-control"/>
                </div>
                <div class="row form-group">
                  <div class="col-lg-6">
                    <span>1 Apellido</span>
                    <input
                      v-model="cliente.primerApellidoCliente" required type="text" min="3" placeholder="primer apellido" class="form-control" />
                  </div>  
                  <div class="col-lg-6">
                    <span>2 apellido</span>
                      <input
                      v-model="cliente.segundoApellidoCliente" required type="text" min="3" placeholder="segundo apellido" class="form-control"/>
                  </div>
                </div>  
                <div v-if="registrar">
                <div class="form-group" >
                  <span>Numero de Cedula cliente</span>
                  <input
                    v-model="cliente.cedulaId"
                    required
                    type="text"
                    min="7"
                    placeholder="CC"
                    class="form-control"
                  />
                </div>
                </div>
                <div  v-if="reguardar"> 
                <div class="form-group" >
                  <span>Numero de Cedula cliente</span>
                  <input
                    v-model="cliente.cedulaId"
                    disabled
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="form-group" >
                  <span>Descripcion de la modificacion</span>
                  <textarea
                    v-model="cliente.modificacion"
                    required
                    type="text"
                    class="form-control"
                  />
                </div>
                </div>
                <div class="row form-group">
                  <div class="col-lg-6">
                    <span>Celular</span>
                    <input
                    v-model="cliente.celularUno"
                    required
                    type="text"
                    min="10"
                    placeholder="Celular personal"
                    class="form-control "
                  />
                  </div>  
                  <div class="col-lg-6">
                    <span>Otro Numero de contacto</span>
                     <input
                    v-model="cliente.celularDos"
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
                    v-model="cliente.OcupacionCliente"
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
                    v-model="cliente.email"
                    type="email"
                    min="13"
                    placeholder="Email"
                    class="form-control"
                  />
                </div>
                <div class=" col-md-6">
                  <span>Edad</span>
                  <input
                    v-model="cliente.edadCliente"
                    required
                    type="number"
                    min="16"
                    class="form-control"
                  />
                </div>              
                </div>
                <div class="form-group" v-if="registrar">
                  <button class="btn btn-success btn-block">Registrar Cliente</button>
                </div>
              </form>
              
              <div class="" v-if="registrar">
                  <button class="btn btn-danger btn-block" @click="cancelar()">Cancelar</button>
                </div>
                <div class="form-group" v-if="reguardar" >
                  <button class="btn btn-success btn-block" @click="reguardarCliente(cliente)">Guardar Cliente</button>
                   <button @click="cerrarPersona()" class="btn btn-danger btn-block">Cancelar</button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container p-4 col-lg-7" v-if="creditos">
        <h2 class="text-center p-4 bg-primary text-white">Clientes Activos</h2>
        <br />
        <div v-if="sinClientes">
          <h2 class="text-center p-4"> No existen Clientes Registrados<br>Registra el primero</h2>
        </div>
        <div style="height: auto; max-height: 390px; overflow-y: scroll;" v-if="clientesActivos">
          <table class="table table-hover border table-sm  bg-white text-dark table-responsive-sm">
            <thead>
              <tr>
                <th># Cedula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th> </th>
                <th>Cel 1</th>
                <th>Fecha agregado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="persona in clientesitos">
                <td>{{persona.cedulaId}}</td>
                <td>{{persona.nombreCliente}}</td>
                <td>{{persona.primerApellidoCliente}}</td>
                <td>{{persona.segundoApellidoCliente}}</td>
                <td>{{persona.celularUno}}</td>
                <td>{{persona.fechaAgregado}}</td>
                <button class="btn btn-primary btn-sm" @click="verCliente(persona.cedulaId)">ver cliente</button>                
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
      <div v-if="verPersona" class="col-md-7  p-4 text-center"> 
        <h2>{{personaUnica.nombreCliente}} {{personaUnica.primerApellidoCliente}}  {{personaUnica.segundoApellidoCliente}}</h2>
        {{personaUnica.cedulaId}}
        <button @click="verEdiciones(personaUnica.cedulaId)" class="btn btn-warning  btn-block">Ver Ediciones</button>
        <button @click="editarPersona(personaUnica.cedulaId)" class="btn btn-success btn-block">Editar</button>
        <button @click="cerrarPersona()" class="btn btn-primary btn-block">Volver Atraz</button>
        <br>
       <div  v-if="ediciones" >
         <h2 class="text-center p-4 bg-primary text-white">Estas son las ediciones para {{personaUnica.nombreCliente}}</h2>
        <div style="height: auto; max-height: 390px; overflow-y: scroll;">
          
          <table class="table table-hover border table-sm  bg-white text-dark table-responsive-sm">
            <thead>
              <tr>
                <th># Cedula</th>
                <th>Nombre</th>
                <th>apellidos</th>
                <th>Celular 1</th>
                <th>Telefono 2</th>
                <th>Direccion</th>
                <th>Email</th>
                <th>Fecha agregado</th>
                <th>Editò</th>
                <th>Fecha Editado</th>
                <th>Modificacion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="edit in editados">
                <td>{{edit.datosAnteriores[0].email}}</td>
                <td>{{edit.datosAnteriores[0].nombreCliente}}</td>
                <td>{{edit.datosAnteriores[0].primerApellidoCliente}}  {{edit.datosAnteriores[0].segundoApellidoCliente}}</td>
                <td>{{edit.datosAnteriores[0].celularUno}}</td>
                <td>{{edit.datosAnteriores[0].celularDos}}</td>
                <td>{{edit.datosAnteriores[0].direccionCliente}}</td>
                <td>{{edit.datosAnteriores[0].email}}</td>
                <td>{{edit.datosAnteriores[0].fechaAgregado}}</td>
                <td><button class="btn btn-primary" @click="edito(edit.cedulaIdEmpleado)">{{edit.cedulaIdEmpleado}}</button></td>
                <td>{{edit.fechaEdicion}}</td>     
                <td>{{edit.modificacion}}</td>         
              </tr>
            </tbody>
          </table>
        </div>
        <button @click="ediciones=false" class="btn btn-primary btn-block">Cerrar Ediciones</button>
       </div>
       
      </div>
    </div>
  </div>
</template>

<script>

class Cliente {
  constructor(
    nombreCliente,
    primerApellidoCliente,
    segundoApellidoCliente,
    cedulaId,
    modificacion,
    celularUno,
    celularDos,
    direccionCliente,
    barrioCliente,
    ciudadCliente,
    tViviendaCliente,
    OcupacionCliente,
    PcargoCliente,
    email,
    edadCliente,
    fechaAgregado
  ) {
    this.nombreCliente = nombreCliente;
    this.primerApellidoCliente = primerApellidoCliente;
    this.segundoApellidoCliente = segundoApellidoCliente;
    this.cedulaId = cedulaId;
    this.modificacion=modificacion;
    this.celularUno = celularUno;
    this.celularDos = celularDos;
    this.direccionCliente = direccionCliente;
    this.barrioCliente = barrioCliente;
    this.ciudadCliente = ciudadCliente;
    this.tViviendaCliente = tViviendaCliente;
    this.OcupacionCliente = OcupacionCliente;
    this.PcargoCliente = PcargoCliente;
    this.email=email;
    this.edadCliente = edadCliente;
    this.fechaAgregado =new Date().getDate() + "/" +(new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    this.efectividadDePago=100;
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

// @ is an alias to /src
//import HelloWorld from '../components/Validacion.vue'
import Swal from 'sweetalert2'
import Barra from "../components/Barra.vue";
import axios from 'axios'
export default {
  name: "clientes",
  components: {
    Barra
  },
  data() {
    return {
      cliente: new Cliente(),
      user: new usuario(),
      clientesitos: [],
      persona:[],
      personaUnica:[],
      verPersona:false,
      creditos: true,
      registrar:true,
      ediciones:false,
      reguardar:false,
      editados:{},
      datos:[],
      clientesActivos:true,
      sinClientes:false
    };
  },
  created(){
     if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    } else {
    axios.get('/api/login/usuario', {headers:{token:localStorage.getItem('token')}})
    .then(res => {
      this.user=res.data.user
      this.fetchClientes()
    })
    .catch(err => {
      localStorage.clear()
      if(localStorage.getItem ('token') === null){
    this.$router.push('/inicioSesion')
    }
    });
    }
    const ususarioAEditar = this.$route.params.cc
    if(ususarioAEditar == null){
      return
    }else{
      console.log(ususarioAEditar)
      this.editarPersona(ususarioAEditar)
    }
    
  },
  methods: {
    fetchClientes() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get("/api/clientes")
        .then(res => {
          this.clientesitos = res.data;
          if(this.clientesitos.length === 0){
            this.clientesActivos = false
            this.sinClientes = true
          }
        })
        .catch(err => {
          console.log(err)
        });
    },
    agregarCliente() {
      const muestra = confirm(
        "seguro de agrgar cliente" + JSON.stringify(this.cliente)
      );
      if (muestra) {
        this.axios
          .post("/api/agregarCliente",this.cliente)
          .then(res => {
            console.log('agregando')
            this.fetchClientes()
            this.sinClientes = false;
            this.clientesActivos = true
            this.cliente = new Cliente();
          })
          .catch(err => {
            alert("error al agregar cliente");
             console.log(this.cliente);
            return;
          });
      }
    },
    validarCliente(){
     const x =this.cliente;
     this.axios.post("/api/busqueda", x)
     .then(res => {
            this.persona = res.data;
            if (this.persona!= "") {
              alert('la cedula: '+this.persona[0].cedulaId+' ya se encuentra registrada a nombre de : '+this.persona[0].nombreCliente)              
            } else {
              this.agregarCliente();
            }
          });
    },
    cancelar(){
      this.cliente = new Cliente();
    },
    verCliente(cc){
      const x = {cedula:cc}
     this.axios.post("/api/verCliente", x)
    
     .then(res => {
       this.creditos=false
       this.verPersona=true
            this.personaUnica = res.data[0];
          });
    },
    cerrarPersona(){
        this.creditos=true;
        this.verPersona=false;
        this.registrar=true;
        this.reguardar=false;
        this.cliente = new Cliente();
        this.ediciones=false

    },
    editarPersona(cc){
      const x = {cedula:cc}
     this.axios.post("/api/verCliente", x)
     .then(res => {
            this.registrar=false
            this.reguardar=true
            this.cliente = res.data[0];
          });
    },
    reguardarCliente(persona){
      this.modif=this.cliente.modificacion
      if(this.modif==null){
        alert('Debe escribir reseña sobrela modificacion')
      }else if(this.modif.length<=20){
          alert('la reseña no contiene suficiente informacion')
      }else{
        this.ccedula={cedula:persona.cedulaId}
        this.axios.post("/api/actualizarCliente", persona)
        .then(res => {
          this.reguardar=false;
          this.registrar=true;
          this.fetchClientes();
          this.creditos=true;
          this.verPersona=false;
          this.ediciones=false;
          this.cliente=new Cliente();
          });
      }
      
    },
    verEdiciones(cc){
      const x =  {cedula:cc}
     this.axios.post("/api/verEdiciones", x)
      .then(res => {
            this.ediciones=true
            this.editados = res.data;

          });
    },
    edito(ccE){
      var cc={cedulaE:ccE}
     alert(cc.cedulaE)
    }
  }
};
</script>