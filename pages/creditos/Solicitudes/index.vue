<template>
    <div>
        <barra-logeado/>
        <div class="bg-primary text-white text-center p-4">
            <h1><strong>SOLICITUDES ACTIVAS</strong></h1>
        </div>
        <barra-creditos/>
        <div v-if="!verCreditoUnico">
            <table class="table table-hover table-sm text-center"  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Servicio</th>
                        <th>Valor</th>
                        <th>Frecuencia</th>
                        <th>Meses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="solicitud in solicitudes" :key="solicitud._id" @click="verSolicitud(solicitud._id)">
                        <td>{{solicitud.numeroCredito}}</td>
                        <td>{{solicitud.cliente.nombreCliente+' '+solicitud.cliente.primerApellidoCliente+' '+solicitud.cliente.segundoApellidoCliente}}</td>
                        <td>{{solicitud.servicio}}</td>
                        <td>{{solicitud.valTotalCred}}</td>
                        <td>{{solicitud.frecuencia}}</td>
                        <td>{{solicitud.tiempo}}</td>
                    </tr>
                </tbody>
            </table> 
            <br>
            <h2 class="text-center card-title">No aprobados</h2>       
            <table class="table table-hover table-sm text-center" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Servicio</th>
                        <th>Valor</th>
                        <th>Frecuencia</th>
                        <th>Meses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="solicitudr in rechazos" :key="solicitudr._id" @click="verSolicitud(solicitudr._id)">
                        <td>{{solicitudr.numeroCredito}}</td>
                        <td>{{solicitudr.cliente.nombreCliente+' '+solicitudr.cliente.primerApellidoCliente+' '+solicitudr.cliente.segundoApellidoCliente}}</td>
                        <td>{{solicitudr.servicio}}</td>
                        <td>{{solicitudr.valTotalCred}}</td>
                        <td>{{solicitudr.frecuencia}}</td>
                        <td>{{solicitudr.tiempo}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <validacion-solicitud :solicitud="solicitud"/>
            <br>
            <div class="btn btn-block btn-outline-primary col-sm-10 mx-auto " @click="estadoVerCreditoUnico(false)"><h2>Cerrar</h2></div>
        </div>
        
        
        <br><br>

    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
const f = require ("../../../funciones/funciones.js")
    export default {
    middleware: 'auth',
    async asyncData({$axios,app}){
        const solicitudes = await $axios.$get('/creditos/solicitudes') 
        const  rechazos = await $axios.$get('/creditos/rechazos') 
        return {solicitudes, rechazos}   
    },
    computed: {
        ...mapState('storeViewComponentsCreditos',['verCreditoUnico','cargarCreditos']),
    },
    watch: {
        cargarCreditos() {
            if(this.cargarCreditos==true){
                this.$nuxt.refresh()
            }
        },
    },
    data(){
        return {
            solicitud:{},
        }
    },
    methods: {
        ...mapMutations('storeViewComponentsCreditos',['estadoVerCreditoUnico']),
        verSolicitud(solicitud) {
            console.log(solicitud)
            let id = {
                _id:solicitud
            }
            this.solicitud = id
            this.estadoVerCreditoUnico(true)
        },
    },
}
</script>

<style>

</style>