<template>
<div>
<div class="d-none" v-on="ff()">{{pros.respuesta.respuesta}}</div>
      <br />
      <div style="height: auto; max-height: 390px; overflow-y: scroll;" v-if="!vercred">
        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
          <thead>
            <tr>
              <th># credito</th>
              <th>CC Cliente</th>
              <th>Servicio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="credito in Creditos">
              <td>{{credito.numeroCredito}}</td>
              <td>{{credito.cedula}}</td>
              <td>{{credito.servicio}}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="verCredito(credito._id)">ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  <div v-if="vercred">
      <div id="infoDeudor">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Informacion del credito Numero {{verCred.numeroCredito}} </h2>
              </div>
              <div class="card-body border">
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control">Cliente: {{cliente.nombreCliente}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">CC: {{cliente.cedulaId}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">cel: {{cliente.celularUno}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Servicio: {{verCred.servicio}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Monto solicitado: {{verCred.cantidad}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Fecha de agregado: {{verCred.fechaAgregado}}</div>
                        </div>
                      </div>                      
                  </div>
                  <div class="btn-group col-lg-12" role="group" aria-label="">
                    <div class="form-control">Credito creado por: {{verCred.creadoPor}}</div>
                      <div class="btn btn-primary col-lg-6"  @click="verCreador(verCred.creadoPor)"> Ver <i class="fa fa-eye"></i></div>
                  </div>  
                    <br><br>
                    <div class="col-md-12 btn btn-primary" v-if="che1"  @click="aumentar(valor), che1=false">
                      {{valor}}% Validar informacion correcta <i class="fa fa-check s:5x"></i></div>
                    <div class="btn-group col-lg-12" role="group" aria-label="">
                      <div class="btn btn-success" v-if="!che1">Informacion correcta <i class="fa fa-check s:5x"></i></div>
                      <div class="btn btn-danger" v-if="!che1"  @click="borrar(valor), che1=true">Quitar validacion <i class="fa fa-trash"></i></div>
                    </div>
              </div>
          </div>
      </div>
      <div id="infolaboral" v-if="infolaboral">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Informacion Laboral Deudor</h2>
              </div>
              <div class="card-body border">
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control" v-if="!independiente">Nombre Empresa: {{verCred.infoLab.nombreEmpresa}}</div>
                            <div id class="form-control" v-if="independiente">Actividad o negocio: {{verCred.infoLab.nombreEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Ciudad: {{verCred.infoLab.ciudadEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Cargo: {{verCred.infoLab.cargoEmpleado}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Direccion: {{verCred.infoLab.direccionEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Telefono Empresa: {{verCred.infoLab.telefonoEmpresa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Salario: {{verCred.infoLab.salarioEmpleado}}</div>
                        </div>
                      </div>
                  </div>
                  <div v-if="!independiente">
                    <div class="col-md-12 btn btn-primary" v-if="che2"  @click="aumentar(10), che2=false">
                        10 % Validar informacion laboral <i class="fa fa-check s:5x"></i>
                    </div>
                    <div class="btn-group col-lg-12" role="group" aria-label="">
                      <div class="btn btn-success" v-if="!che2">Informacion laboral correcta <i class="fa fa-check s:5x"></i></div>
                      <div class="btn btn-danger" v-if="!che2"  @click="borrar(10), che2=true">Quitar validacion <i class="fa fa-trash"></i></div>
                    </div>
                  </div>
                  
                  <div v-if="independiente">
                    <div class="col-md-12 btn btn-primary">
                        debera validar informacion laboral de codeudor o prenda <i class="fa fa-check s:5x"></i>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div id="referenciasFamiliares" v-if="ref">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Referencias Familiares</h2>
              </div>
              <div class="card-body border"> 
                  <div>
                      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm col-lg-12 text-center">
                        <thead>
                            <tr>
                                <th>nombre referencia</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Parentesco</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="referencias,index in verCred.referidos" >
                                <td>{{referencias.nombreRF}}</td>
                                <td>{{referencias.direccionRF}}</td>
                                <td>{{referencias.telefonoRF}}</td>
                                <td>{{referencias.parentescoRF}}</td>
                                <td>
                                <div class="btn-group " role="group" aria-label=""> 
                                  <div v-if="quitar[index]"> 
                                  <div class=" btn btn-primary" v-if="che[index]"  @click="aumentar(10), che[index]=false, sinRespuesta [index] = false">
                                    10% Validar informacion referencia <i class="fa fa-check s:5x"></i></div>
                                  </div>  

                                  <div class=" btn btn-danger" v-if="sinRespuesta[index]"  @click="aumentarFallas(10), volverLlamar[index]=true, sinRespuesta[index] = false, quitar[index]=false">
                                    No contestan -- No lo conocen  <i class="fa fa-times s:5x"></i></div> 

                                  <div class=" btn btn-success" v-if="volverLlamar[index]"  @click="borrarFallas(10), aumentar(10), che[index] = false, volverLlamar[index]=false">
                                    10% Revalidar informacion referencia <i class="fa fa-check s:5x"></i></div> 

                                </div>    
                                  <div class="btn-group " role="group" aria-label="">
                                  <div class="btn btn-success" v-if="!che[index]">Informacion correcta <i class="fa fa-check s:5x"></i></div>
                                  <div class="btn btn-danger" v-if="!che[index]"  @click="borrar(10),sinRespuesta[index]=true,  che[index]=true, quitar[index]=true">
                                    Quitar validacion <i class="fa fa-trash"></i></div>
                                </div>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
      <div id="infoFiador" v-if="fiad">
          <div class="card">
              <div class="card-header border">
                  <h2 class="text-center">Informacion {{fiador.fiador_o_prenda}}</h2>
              </div>
              <div class="card-body border" v-if="prendaa">
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control">Tipo Vehiculo: {{fiador.tipoVehiculo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Modelo: {{fiador.modelo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Color: {{fiador.color}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Licencia de transito: {{fiador.licTransito}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control"># Motor: {{fiador.motor}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Servicio: {{fiador.servicio}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Estado seguro: {{fiador.seguro}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Estado Tecnicomecanica: {{fiador.tecnicomecanica}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Nombre propietario: {{}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control">Marca: {{fiador.marca}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Tipo: {{fiador.tipo}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Manifiesto: {{fiador.manifiesto}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Placa: {{fiador.placa}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control"># Chasis: {{fiador.chasis}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Cilindraje: {{fiador.cilindraje}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Fecha vencimiento seguro: {{fiador.venceSeguro}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control">Fecha vencimiento tecnicomecanica: {{fiador.venceTecno}}</div>
                        </div>
                        <div class="form-group">
                            <div id class="form-control"># CC  propietario: {{fiador.ccPropietario}}</div>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="card-body border" v-if="fiadorr || fiador.fiadorPrenda">
                <div v-if="fiador.fiadorPrenda" class="text-center"><h2>Fiador del credito con prenda</h2></div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Nombre fiador: {{fiador.fiadorPrenda.nombreFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Nombre fiador: {{fiador.nombreFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> 1 Apellido: {{fiador.fiadorPrenda.primerApellidoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> 1 Apellido: {{fiador.primerApellidoFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> 2 Apellido: {{fiador.fiadorPrenda.segundoApellidoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> 2 Apellido: {{fiador.segundoApellidoFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Cedula: {{fiador.fiadorPrenda.cedulaFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Cedula: {{fiador.cedulaFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> # Celular: {{fiador.fiadorPrenda.celularUnoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> # Celular: {{fiador.celularUnoFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Otro # de celular: {{fiador.fiadorPrenda.celularDosFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Otro # de celular: {{fiador.celularDosFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Edad : {{fiador.fiadorPrenda.edadFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Edad : {{fiador.edadFiador}}</div>
                        </div>
                        
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Email: {{fiador.fiadorPrenda.emailFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Email: {{fiador.emailFiador}}</div>
                        </div>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Direccion: {{fiador.fiadorPrenda.direccionFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Direccion: {{fiador.direccionFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Barrio: {{fiador.fiadorPrenda.barrioFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Barrio: {{fiador.barrioFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Ciudad: {{fiador.fiadorPrenda.ciudadFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Ciudad: {{fiador.ciudadFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr">Tipo vivienda: {{fiador.fiadorPrenda.tViviendaFiador}}</div>
                            <div id class="form-control" v-if="fiadorr">Tipo vivienda: {{fiador.tViviendaFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> ocupacion: {{fiador.fiadorPrenda.OcupacionFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> ocupacion: {{fiador.OcupacionFiador}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div id class="form-control" v-if="!fiadorr"> Personas a cargo: {{fiador.fiadorPrenda.PcargoFiador}}</div>
                            <div id class="form-control" v-if="fiadorr"> Personas a cargo: {{fiador.PcargoFiador}}</div>
                        </div>
                    </div>
                  </div>
                  <div v-if="!fiadorr">
                    <div class="col-md-12 btn btn-primary" v-if="che4"  @click="aumentar(6), che4=false">
                        6 % Validar informacion fiador credito con prenda <i class="fa fa-check s:5x"></i>
                    </div>
                    <div class="btn-group col-lg-12" role="group" aria-label="">
                      <div class="btn btn-success" v-if="!che4">Informacion fiador credito con prenda correcta <i class="fa fa-check s:5x"></i></div>
                      <div class="btn btn-danger" v-if="!che4"  @click="borrar(6), che4=true">Quitar validacion <i class="fa fa-trash"></i></div>
                    </div>
                  </div>
                  <div id="infolaboralfiadorPrenda" v-if="infolaboralFP">
                    <div class="card">
                        <div class="card-header border">
                            <h2 class="text-center">Informacion Laboral fiador del credito con prenda</h2>
                        </div>
                        <div class="card-body border">
                            <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                      <div id class="form-control">Nombre Empresa: {{fiador.infolabfiadorPrenda.nombreEmpresa}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control">Ciudad: {{}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control">Cargo: {{}}</div>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                      <div id class="form-control">Direccion: {{}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control">Telefono Empresa: {{}}</div>
                                  </div>
                                  <div class="form-group">
                                      <div id class="form-control">Salario: {{}}</div>
                                  </div>
                                </div>
                            </div>
                            <div >
                              <div class="col-md-12 btn btn-primary" v-if="che5"  @click="aumentar(valor3), che5=false">
                                 {{valor3}} % Validar informacion laboral <i class="fa fa-check s:5x"></i>
                              </div>
                              <div class="btn-group col-lg-12" role="group" aria-label="">
                                <div class="btn btn-success" v-if="!che5">Informacion laboral correcta <i class="fa fa-check s:5x"></i></div>
                                <div class="btn btn-danger" v-if="!che5"  @click="borrar(valor3), che5=true">Quitar validacion <i class="fa fa-trash"></i></div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>              
              <div class="card-footer border">
                <div class="btn btn-primary col-lg-12 " v-if="che3"  @click="aumentar(valor2), che3=false">
                    {{valor2}} % Validar informacion fiador o prenda<i class="fa fa-check s:5x"></i>
                </div>
                <div class="btn-group col-lg-12" role="group" aria-label="">
                  <div class="btn btn-success" v-if="!che3">Informacion fiador o prenda correcta <i class="fa fa-check s:5x"></i></div>
                  <div class="btn btn-danger" v-if="!che3"  @click="borrar(valor2), che3=true">Quitar validacion <i class="fa fa-trash"></i></div>
                </div>
              </div>      
          </div>
      </div>
      <br>
      <div class="progress">
        <div  class="progress-bar progress-bar-striped" role="progressbar" v-bind:style="n">{{progres}}%</div>
        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" v-bind:style="m">{{fallas}}%></div>
      </div> 
      <br>
      <div class="btn btn-warning btn-block" @click="borrar(100), borrarFallas(100), infolaboralFP=false, che1=true,che2=true,che3=true,che5=true,che5=true, vercred=false, che=[true,true,true,true,true,true], sinRespuesta=[true,true,true,true,true,true], quitar=[true,true,true,true,true,true], volverLlamar=[false,false,false,false,false,false]">Volver</div>
    </div>  
      <br><br>
</div>
</template>

<script>
class person {
  constructor(cedulaId) {
    this.cedulaId = cedulaId;
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
 name: 'solicitudes',
 data () {
     return {
       valor:0,
       valor2:0,
       valor3:8,
       infolaboral:true,
       infolaboralFP:false,
       ref : true,
       fiad: true,
       che:[true,true,true,true,true,true],
       che1:true,
       che2:true,
       che3:true,
       che4: true,
       che5:true,
       volverLlamar:[false,false,false,false,false,false],
       sinRespuesta:[true,true,true,true,true,true],
       quitar:[true,true,true,true,true,true],
        user: new usuario(),
        Creditos: {},
        pros: {},
        verCred: {},
        cliente: {},
        cedul: {},
        vercred:false,
        fiador :{},
        prendaa: false,
        fiadorr : false,
        independiente : false,
        progres :  0,
        fallas:0,
        n: {
          width: "0%",
          valuemin:"0",
          valuemax:"100",
          valuenow:0
        },
        m: {
          width: "0%",
          valuemin:"0",
          valuemax:"100",
          valuenow:0
        },
    }
 },
 props: ["respu"],
 created() {
    this.fetchCreditos();
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
},

 methods:{
     fetchCreditos() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios 
        .get("/api/creditos/Cotizacion")
        .then(res => {
          this.Creditos = res.data;
        })
        .catch(err => console.log(err));
    },
  aumentar(x){
    this.progres = this.progres + x
    if(this.progres>100){
      this.progres = 100
      return
    }
    this.n = {
          width: this.progres+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.progres
        }
        console.log(this.n)
  },
  borrar(x){
    this.progres = this.progres - x
    console.log('borrando')
     if(this.progres<0){
      this.progres = 0
      this.n = {
          width: this.progres+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.progres
        }
      return
    }
    this.n = {
          width: this.progres+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.progres
        }
        console.log(this.n)
  },
  aumentarFallas(x){
    this.fallas = this.fallas + x
    if(this.fallas>100){
      this.fallas = 100
      return
    }
    this.m = {
          width: this.fallas+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.fallas
        }
        console.log(this.m)
  },
  borrarFallas(x){
    this.fallas = this.fallas - x
    if(this.fallas<=0){
      this.fallas = 0
      this.m = {
          width: this.fallas+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.fallas
        }
      return
    }
    this.m = {
          width: this.fallas+"%",
          valuemin:"0",
          valuemax:"100",
          valuenow:this.fallas
        }
        console.log(this.m)
  },
  check(){
    
  }, 
    ff() {
      this.pros.respuesta = this.respu;
      if (this.pros.respuesta.respuesta == 2) {
        this.refrescar();
      } else {
        if (this.pros.respuesta.respuesta == 0) {
          return
        }
      }
    },
    refrescar() {
      
      this.fetchCreditos();
      this.pros.respuesta.respuesta = 0;
    },
    verCreador(n){
      console.log(n)
    },
    verCredito(id) {
      let idd = {
        id : id
      }
      this.axios
        .post("/api/creditos/verCredito", idd)
        .then(res => {
            console.log('esta es la data')
            console.log(res.data)
          this.verCred = res.data;
          this.valor = 10
          let y = this.valor
          if(this.verCred.infoLab == ""){
            this.infolaboral = false
            y = y + 10
          }else{
            if(this.verCred.infoLab.cargoEmpleado == null){
              this.verCred.infoLab.cargoEmpleado = 'Independiente'
              this.independiente = true
              this.infolaboral = true
               y = this.valor
            }else{
              this.independiente = false
              this.infolaboral = true
              y = this.valor
            }
          }
          this.valor = y
          if(this.verCred.referidos == null){
            y = y + 60
            this.ref = false
          }else{
            y = this.valor  
            this.ref = true
          }
          this.valor = y
          if(this.verCred.fiador == null){
            this.fiad = false
            this.valor = this.valor + 20
          }else{
            this.fiad = true
            this.valor = y
          }
          this.cccred = this.verCred.cedula;
          this.cedul = new person(this.cccred);
          this.verCliente(this.cedul) 
          let idFiador = {
              id : this.verCred.fiador
          }
          this.verFiadorPrenda(idFiador)
        })  
        .catch(err => console.log(err));
    },
    verCliente(n){
        this.axios.post("/api/busqueda", n)//este esta en la api clientes
          .then(res => {
            this.vercred=true
            this.cliente = res.data[0];
          })
          .catch(err => console.log(err));
    },
    verFiadorPrenda(n){
        this.axios.post("/api/creditos/FiadorPrenda", n)
          .then(res => {
              console.log(res.data)
            this.fiador = res.data;
            if(this.fiador.fiador_o_prenda == 'fiador'){
              this.valor2 = 20
              this.fiadorr = true
              this.prendaa = false
            }else{
              if(this.fiador.fiador_o_prenda == 'prenda'){
                    this.valor2 = 10
                }else{
                  this.valor2 = 20
                }
                if(this.fiador.fiadorPrenda != null){    
                  if(this.fiador.infolabfiadorPrenda !=null){
                    this.infolaboralFP = true
                    if(this.independiente){
                      this.valor3 = 18
                    }else{
                      this.valor3 = 8
                    }
                    
                    this.valor2 = 6
                  }else{
                    this.valor3 = 8
                    this.valor2 = 10
                    this.infolaboralFP = false
                  }
                this.fiadorr = false
                this.prendaa = true
              }
            }
         })
        .catch(err => console.log(err));
        
    },

    pagarCuota(id_cred,numCuota,valCuota){
      console.log(id_cred+'/'+numCuota+'/'+valCuota)
    },
    terminados() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get("/api/creditos/terminados")
        .then(res => {
          this.Creditos = res.data;
        })
        .catch(err => console.log(err));
    }, 
    enMora() {
      //const uri = "http://localhost:3000/api/clientes"
      this.axios
        .get("/api/creditos/enMora")
        .then(res => {
          this.Creditos = res.data;
        })
        .catch(err => console.log(err));
    },
    solicitudes() {
     this.fetchCreditos()
    },
    entregar(){
      this.axios.get("/api/creditos/")
    },

 }
}
</script>

<style>

</style>