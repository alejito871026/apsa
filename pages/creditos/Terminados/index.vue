<template>
    <div>
        <barra-logeado/>
        <div class="bg-primary text-white text-center p-4">
            <h1><strong>CREDITOS TERMINADOS</strong></h1>
        </div>
        <barra-creditos/>
        <div v-if="verCreditoo">
            <div class="card text-center">
                <div class="card-header">
                    <h2>Credito  # {{credito.numeroCredito}}</h2>
                </div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> Nombre del cliente </label>
                        </div>
                        <div id class="form-control">{{credito.cliente.nombreCliente}} {{credito.cliente.primerApellidoCliente}} {{credito.cliente.segundoApellidoCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> # Telefono celular </label>
                        </div>
                        <div id class="form-control">{{credito.cliente.celularUnoCliente}}</div>
                        <div class="input-group-prepend">
                            <label class="input-group-text">Otro # de contacto</label>
                        </div>
                        <div id class="form-control">{{credito.cliente.celularDosCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Servicio</label>
                        </div>
                        <div id class="form-control">{{credito.servicio}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Monto Aprobado</label>
                        </div>
                        <div id class="form-control">{{new Intl.NumberFormat('es-CO').format(credito.cantidad)}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Fecha solicitud</label>
                        </div>
                        <div id class="form-control">{{verFecha(credito.fechaAgregado)}}</div>
                    </div>
                     <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Interes establecido</label>
                        </div>
                        <div id class="form-control">{{credito.interes}}</div>
                    </div>
                </div>
                <div class="card-footer">
                    <div style="height: auto;">
                        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                            <thead class="sticky-top text-white bg-dark">
                            <tr>

                                <th># </th>
                                <th>Fecha para pago</th>
                                <th>Total</th>
                                <th>Abono</th>
                                <th>Capital</th>
                                <th>Interes</th>
                                <th>Dias</th>
                                <th>Observacion</th>
                                <th>Fecha de cancelado</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pags,index) in credito.pagares.pagares" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{verFecha(pags.fecha)}}</td>
                                    <td><div class="form-control">{{new Intl.NumberFormat('es-CO').format(pags.capital+pags.interes+pags.interesAlaMora-pags.abono)}}</div></td>
                                    <td>{{pags.abono}}</td>
                                    <td>{{pags.capital}}</td>
                                    <td>{{pags.interes}}</td>
                                    <td>
                                        <div class="alert alert-success" v-if="pags.dias>=0">{{pags.dias}}</div>                                    
                                        <div class="alert alert-danger" v-else-if="pags.dias<0">{{pags.dias}}</div>                                              
                                        <div class="alert alert-info" v-else>{{pags.diasFavor}}</div></td>
                                    <td><div v-if="pags.observacion">{{pags.observacion}}</div><div v-else>Se cancelo como pago normal</div></td>
                                    <td>{{verFecha(pags.fechaPago)}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="btn btn-outline-info btn-block p-2 mb-3" v-if="historiall.length===0" @click="historial(credito._id)"><h3>Historial</h3></div>
                        <div v-if="historiall.length>0">
                            <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                                <thead>
                                    <tr>
                                        <th>Fecha ingreso</th>
                                        <th>capital</th>
                                        <th>Interes</th>
                                        <th>Descripcion</th>
                                        <th>Concepto</th>
                                        <th>Imprimir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="pagos in historiall" :key="pagos._id">
                                        <td>{{verFecha(pagos.fechaIngresoEfectivo)}}</td>
                                        <td>
                                            <div v-if="pagos.concepto === 'cuota credito'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Abono a capital'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Interes Mora'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Abono'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'inicial'">{{pagos.capital}}</div>                                            
                                            <div v-if="pagos.concepto === 'Pago total'">{{pagos.capital}}</div>                                             
                                            <div v-if="pagos.concepto === 'cuota credito disminucion capital'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Renovacion'">{{pagos.capital}}</div>      
                                        </td>
                                        <td>
                                            <div v-if="pagos.concepto === 'cuota credito'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Abono a capital'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Interes Mora'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Abono'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'inicial'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Pago total'">{{pagos.interes}}</div>                                          
                                            <div v-if="pagos.concepto === 'cuota credito disminucion capital'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Renovacion'">{{pagos.interes}}</div>
                                        </td>
                                        <td>{{pagos.descripcion}}</td>
                                        <td>{{pagos.concepto}}</td>
                                        <td><div class="btn btn-outline-info">Imprimir</div></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="btn btn-outline-success btn-block p-2" @click="cerrarHistorial()"><h3>Cerrar historial</h3></div>
                        </div>
                    </div>
                    <div class="btn btn-outline-success btn-block p-2" @click="cerrarVerCredito()"><h3>Cerrar credito</h3></div>
                </div>                
            </div>
        </div>
        <div v-else> 
            <div class="p-2">
                <div class="input-group mb-3">
                    <input class="form-control mr-sm-2" type="text" @keyup="buscando(x)"  v-model="x"  placeholder="Buscar">
                </div>
            </div>
            <table class="table table-hover table-sm text-center mx-auto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Telefonos</th>
                        <th>Direccion</th>
                        <th>Servicio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="credito in terminados" :key="credito._id" @click="verCredito({_id:credito._id})">
                        <td>{{credito.numeroCredito}}</td>
                        <td>{{credito.nombreCliente}}</td>
                        <td>{{credito.cliente.celularUnoCliente}} <a v-if="credito.cliente.celularDosCliente">--- {{credito.cliente.celularDosCliente}}</a></td>
                        <td>{{credito.cliente.direccionCliente}}</td>
                        <td>{{credito.servicio}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <div class="bg-primary text-white text-center p-4">
                <h1><strong>CREDITOS NEGADOS</strong></h1>
            </div>
            <table class="table table-hover table-sm text-center mx-auto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Telefonos</th>
                        <th>Direccion</th>
                        <th>Servicio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="credito in negados" :key="credito._id" @click="verCredito({_id:credito._id})">
                        <td>{{credito.numeroCredito}}</td>
                        <td>{{credito.nombreCliente}}</td>
                        <td>{{credito.cliente.celularUnoCliente}} <a v-if="credito.cliente.celularDosCliente">--- {{credito.cliente.celularDosCliente}}</a></td>
                        <td>{{credito.cliente.direccionCliente}}</td>
                        <td>{{credito.servicio}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const f = require ("../../../funciones/funciones.js")
export default {
    middleware: 'auth',
    async asyncData({$axios,app}){
        let logueado = await f.validarUsuario($axios)
        if(logueado.access===false){
            app.$auth.logout()
            app.router.push('/inicioSesion')
        }        
    },
    data() {
        return {
            x:'',
            terminados: [],
            terminaDos: [],
            verCreditoo: false,
            credito:{},
            historiall:[],
            negaDos:[],
            negados:[],
        }
    },
    created(){
        this.cargarCreditosTerminados()
        this.cargarCreditosNegados()
    },
    methods: {
        async verCredito(_id) {
            this.credito = await this.$axios.$post('/creditos/verCreditoUnico', _id)
            this.verCreditoo = true
        },
        async cargarCreditosTerminados() {
            this.terminaDos = await this.$axios.$get('/creditos/terminados')
            this.terminados = this.terminaDos
        },
        async cargarCreditosNegados() {
            this.negaDos = await this.$axios.$get('/creditos/negados')
            this.negados = this.negaDos
        },
        cerrarVerCredito(){
            this.credito = {}
            this.verCreditoo = false
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
        async buscando(x){ 
            let persona = {}
            let y = isNaN(x)   
            if(y){
                persona.nombre = x
                const creditosPersona = await this.$axios.$post("/creditos/creditosClienteTerminadosNombre", persona)
                if (creditosPersona.length>0) {
                    this.terminados = creditosPersona
                }  else {
                    this.terminados = this.terminadosDos
                } 
            } else {
                persona.cedula = x
                const creditosPersona = await this.$axios.$post("/creditos/creditosClienteTerminadosCedula", persona)
                if (creditosPersona.length>0) {
                    this.terminados = creditosPersona
                }  else {
                    this.terminados = this.terminaDos
                } 
            }                    
        },
        async historial(id) {
            this.historiall = await this.$axios.$post('/contabilidad/HistorialCredito',{id})
            console.log(this.historiall)
        },
        async cerrarHistorial(){
            this.historiall = []
        },
    },
}
</script>

<style>

</style>