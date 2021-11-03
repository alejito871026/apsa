<template>
    <div>
        <div v-if="!renovando">
            <div class="mx-auto col-md-12 p-4" v-if="!estadoAgregarCredito">
                <div class="card bg-primary text-white">
                <div class="card-body">
                    <div class="p-2 bg-primary text-center">
                    <h2>Agregar nuevo Credito</h2>
                    <h2>Buscar Cliente por numero de cedula</h2>
                    </div>
                    <div class="form-group">
                    <div>
                        <input autofocus  @keyup="buscando()"  v-model="persona.cedulaId"  type="text" class="col-lg-12 form-group"/>
                    </div>
                    </div>
                    <div v-if="si_existe">
                        <div class="text-center" v-for="clie in cliente" :key="clie._id">
                            <h3>{{clie.nombreCliente}} {{clie.primerApellidoCliente}} {{clie.segundoApellidoCliente}}</h3>
                            <h3>CC : {{clie.cedulaIdCliente}}</h3>
                        </div>
                        <div class="form-group text-center" v-if=" conCreditos">
                            <div class="text-center">
                                <table class="text-center col-lg-12 border mb-3">
                                    <thead class="text-white bg-dark">
                                        <th># Credito</th>
                                        <th>Servicio</th>
                                        <th>Pagos</th>
                                        <th>% cuotas pagas</th>
                                        <th>estado</th>
                                        <th>En mora</th>
                                        <th>Cuotas a favor</th>
                                        <th>Cuotas en contra</th>
                                        <th>% Mhp</th>
                                        <th>Renovacion</th>
                                    </thead>
                                    <tbody v-for="cred in activos" :key="cred._id">
                                        <tr v-if="cred.renovacion" class="alert alert-danger">
                                            <td>{{cred.numeroCredito}}</td>
                                            <td>{{cred.servicio}}<a v-if="cred.OldValores"> Renovacion al credito # {{cred.OldValores.numeroC}}</a></td>
                                            <td>{{cred.pagos}} de {{cred.pagos+cred.nopagos}}</td>
                                            <td>{{cred.porcPagos}}</td>
                                            <td>{{cred.estadoInterno}}</td>
                                            <td v-if="cred.enMora" class="bg-danger">Si</td>
                                            <td v-else>No</td>
                                            <td>{{cred.aFavor}}</td>
                                            <td>{{cred.enContra}}</td>
                                            <td>{{cred.porcFavor}}</td>
                                            <td @click="renovar(cred._id)"><div class="btn btn-info" v-if="cred.estadoInterno==='Entregado' && cred.porcPagos>75 && cred.porcFavor<30 && cred.renovacion==false"><b-icon-check></b-icon-check></div></td>
                                        </tr>
                                        <tr v-else>
                                            <td>{{cred.numeroCredito}}</td>
                                            <td>{{cred.servicio}}<a v-if="cred.OldValores"> Renovacion al credito # {{cred.OldValores.numeroC}}</a></td>
                                            <td>{{cred.pagos}} de {{cred.pagos+cred.nopagos}}</td>
                                            <td>{{cred.porcPagos}}</td>
                                            <td>{{cred.estadoInterno}}</td>
                                            <td v-if="cred.enMora" class="bg-danger">Si</td>
                                            <td v-else>No</td>
                                            <td>{{cred.aFavor}}</td>
                                            <td>{{cred.enContra}}</td>
                                            <td>{{cred.porcFavor}}</td>
                                            <td @click="renovar(cred._id)"><div class="btn btn-info" v-if="cred.estadoInterno==='Entregado' && cred.porcPagos>75 && cred.porcFavor<30"><b-icon-check></b-icon-check></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="alert alert-info">Para acceder a una renovacion se debe haber cancelado mas del 75 % del credito
                                    y se debe tener un porcentaje menor al 30 % en mal habito del pago del credito a renovar</div>                           
                                <button v-if="!tieneDos" class="btn btn-success btn-block" @click="agregarCredito()">agregar Credito</button>
                                <div v-else class="alert alert-info" disabled>No puedes agregar mas creditos</div>
                            </div>
                        </div>
                        <div class="text-center" v-if="sinCreditos">
                            <h2>No existen Creditos asociados a este nombre</h2>
                            <button class="btn btn-success btn-block" @click="agregarCredito(cliente)">agregar Credito</button>
                        </div>
                        <div class="form-group text-center" v-if="inactivos.length>0">
                            <h3>Creditos terminados {{inactivos.length}}</h3>
                            <div class="text-center">
                                <table class="text-center col-lg-12 border mb-3">
                                    <thead class="sticky-top text-white bg-dark">
                                        <th># Credito</th>
                                        <th>Servicio</th>
                                        <th>Pagos</th>
                                        <th>%</th>
                                        <th>estado</th>
                                        <th>Cuotas a favor</th>
                                        <th>Cuotas en contra</th>
                                        <th>%</th>
                                    </thead>
                                    <tbody v-for="cred in inactivos" :key="cred._id">
                                        <td>{{cred.numeroCredito}}</td>
                                        <td>{{cred.servicio}}</td>
                                        <td>{{cred.pagos}} de {{cred.pagos+cred.nopagos}}</td>
                                        <td>{{cred.porcPagos}}</td>
                                        <td>{{cred.estadoInterno}}</td>
                                        <td>{{cred.aFavor}}</td>
                                        <td>{{cred.enContra}}</td>
                                        <td>{{cred.porcFavor}}</td>
                                    </tbody>
                                </table>  
                            </div>
                            <div class="card-body border border-white">
                                <h3>Comportamiento de pago</h3>
                                Buen habito de pago: {{totalFavor}} de {{totalLengths}} =   {{(totalFavor/totalLengths)*100}} %<br>
                                Mal habito de pago: {{totalContra}} de {{totalLengths}} =  {{(totalContra/totalLengths)*100}} % <br>
                                Cuotas que aun no se cumplen : {{totalNopagos}} de {{totalLengths}} = {{(totalNopagos/totalLengths)*100}} %<br>
                                _____________________________________________________________ <br>
                                Total : {{((totalFavor/totalLengths)*100)+((totalContra/totalLengths)*100)+((totalNopagos/totalLengths)*100)}} % <br>
                            </div>
                        </div>
                    </div>
                    <div class="text-center" v-if="es_una_palabra">
                    <h2>Debes buscar por numero de cedula</h2>
                    </div>               
                    <div class="text-center" id="palabra" v-if="escribirCedula">
                        <h2>Debes escribir numero de cedula</h2>
                    </div>
                    <div class="text-center" v-if="no_existe">
                    <h2>cliente no existe</h2>
                    <div>puede buscar de nuevo o ingresar un cliente</div>
                    <router-link :to="{path:'/Clientes', query: {$:persona.cedulaId}}" class="nav-link btn btn-success">Agregar Cliente</router-link>
                    </div>
                </div>
                </div>
            </div>
            <div class="mx-auto col-md-12 p-4" v-else>
                <nueva-solicitud :cli="cliente"/>
            </div>
        </div>
        <div class="mx-auto col-md-12 p-4" v-else>
            <renovacion :_id="idCredito"/>
            <div class="btn btn-block btn-outline-warning" @click="renovando = false"><h3>Cerrar renovacion</h3></div>
        </div>
    </div>
</template>

<script>

import {mapState,mapMutations} from "vuex"
export default {
    data(){
        return {
            persona: {},
            escribirCedula:false,
            es_una_palabra:false,
            no_existe:false,
            si_existe:false,
            conCreditos:false,
            sinCreditos:false,
            cliente:{},
            tieneDos:false,
            totalCpersona:0,
            activo:false,
            activos:[],
            Creditos:[],
            inactivos:[],
            cedula:null,
            estadoAgregarCredito:false,
            fiadorr:{},
            comportamientoPago:{},
            totalLengths:0,
            totalContra : 0,
            totalFavor : 0,
            totalNopagos : 0,
            idCredito : '',
            renovando : false,
        }
    },
    mounted(){
    },
    methods: {
        ...mapMutations('storeViewComponentsClientes',['estadoBotonCrearCliente','estadoCrearCliente']),
       async buscando() {
            var x = this.persona;
            if (x.cedulaId == "") {
                this.escribirCedula = true;
                this.es_una_palabra = false;
                this.no_existe = false;
                this.si_existe = false;
                this.persona.cedulaId = ''
                this.regreso()
                this.cedula = null
            } else {
                if (isNaN(x.cedulaId)) {
                    this.es_una_palabra = true;
                    this.persona = {};
                    this.no_existe = false; 
                    this.escribirCedula = false;
                    this.si_existe = false;
                } else {
                    const cliente =  await this.$axios.$post("/clientes/busqueda",x) 
                    if(cliente.status===205){
                        alert('El token a vencido o no existe')
                        this.$auth.logout()
                        this.$router.push("/inicioSesion")
                    }else if (cliente.cliente != "") {
                        this.cliente = cliente.cliente
                        this.si_existe = true;
                        this.es_una_palabra = false;
                        this.no_existe = false;
                        this.escribirCedula = false;
                        this.creditosActivos();
                        this.creditosInactivos();
                        this.regreso()
                    }else{
                        this.si_existe = false;
                        this.escribirCedula = false;
                        this.es_una_palabra = false;
                        this.no_existe = true;
                        this.cedula = x.cedulaId
                        this.agregar()  
                    }
                }
            }
        },
        async creditosActivos() {
            const cedula = this.persona;
            this.activos = await this.$axios.$post("/creditos/creditosCliente",cedula)
            const total = this.activos.length
            
            if(total===0){
                this.sinCreditos = true;
                this.conCreditos = false;
                this.tieneDos = false;
                this.totalCpersona = total;
                this.activo=false;
            }else if (total > 0 && total < 2) {   
                this.conCreditos = true;
                this.sinCreditos = false;
                this.tieneDos = false;
                this.totalCpersona = total;
                this.activo = false;
            } else if (total >= 2) {  
                this.totalLengths = 0
                this.totalFavor = 0
                this.totalContra = 0
                this.totalNopagos = 0            
                for (let a = 0; a < total; a++) {  
                    let aFavor=0
                    let enContra = 0 
                    let pagos = 0   
                    let nopagos = 0 
                    let porcPagos = 0 
                    let porcFavor = 0
                    let tot = this.activos[a].pagares.pagares.length
                    for(let b = 0; b < this.activos[a].pagares.pagares.length; b++ ){
                        if(this.activos[a].pagares.pagares[b].estado){
                            pagos = pagos + 1         
                            if(this.activos[a].pagares.pagares[b].dias<0){
                                enContra = enContra + 1
                            } else { 
                                aFavor = aFavor + 1
                            }                       
                        }else{
                            nopagos = nopagos + 1
                        }                        
                    } 
                    this.totalLengths = this.totalLengths + tot
                    this.totalFavor = this.totalFavor + aFavor  
                    this.totalContra = this.totalContra + enContra 
                    this.totalNopagos = this.totalNopagos  + nopagos 
                    this.activos[a].pagos = pagos
                    this.activos[a].nopagos = nopagos
                    porcPagos = pagos/tot*100
                    this.activos[a].porcPagos = porcPagos
                    
                    this.activos[a].aFavor = aFavor
                    this.activos[a].enContra = enContra
                    if(aFavor === 0 && enContra === 0){
                        porcFavor = 0
                    }else{
                        porcFavor = enContra/pagos*100
                    }
                    this.activos[a].porcFavor = porcFavor                          
                }
                this.tieneDos = true;
                this.sinCreditos = false;
                this.conCreditos = true;
                this.totalCpersona = total;
            }
        },
        async creditosInactivos(){
            const cedula = this.persona;
            this.inactivos = await this.$axios.$post("/creditos/creditosClienteTerminados",cedula)
            const total = this.inactivos.length
            for (let a = 0; a < total; a++) {  
                let aFavor=0
                let enContra = 0 
                let pagos = 0   
                let nopagos = 0 
                let porcPagos = 0 
                let porcFavor = 0
                let tot = this.inactivos[a].pagares.pagares.length
                for(let b = 0; b < this.inactivos[a].pagares.pagares.length; b++ ){
                    if(this.inactivos[a].pagares.pagares[b].estado){
                        pagos = pagos + 1         
                        if(this.inactivos[a].pagares.pagares[b].dias<0){
                            enContra = enContra + 1
                        } else { 
                            aFavor = aFavor + 1
                        }                       
                    }else{
                        nopagos = nopagos + 1
                    }                        
                } 
                this.totalLengths = this.totalLengths + tot
                this.totalFavor = this.totalFavor + aFavor  
                this.totalContra = this.totalContra + enContra  
                this.totalNopagos = this.totalNopagos  + nopagos
                this.inactivos[a].pagos = pagos
                this.inactivos[a].nopagos = nopagos
                porcPagos = pagos/tot*100
                this.inactivos[a].porcPagos = porcPagos                
                this.inactivos[a].aFavor = aFavor
                this.inactivos[a].enContra = enContra
                if(aFavor === 0 && enContra === 0){
                    porcFavor = 0
                }else{
                    porcFavor = enContra/tot*100
                }
                this.inactivos[a].porcFavor = porcFavor                          
            }
        },
        recargar(){
            
        },
        agregar(){
            this.estadoCrearCliente(true)
            this.estadoBotonCrearCliente(true)
        },
        regreso(){
            this.estadoCrearCliente(false)
            this.estadoBotonCrearCliente(false)
            this.cedula = null
        },
        async agregarCredito(){
            this.estadoAgregarCredito = true
        },
        renovar(id){
            this.renovando = true
            this.idCredito = id
        }
    },

}
</script>

<style>

</style>