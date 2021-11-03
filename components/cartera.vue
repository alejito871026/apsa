<template>
    <div>
        <div class="card">
            <div class="card-body text-center">
                <div class="bg-info p-4">
                    <div class="text-white pb-3"><h2>Estado cartera</h2></div>
                    <div class="row pb-3">
                        <div class="col-md-6 row">
                            <div class="col-sm-4 text-white"><h3>Capital $</h3></div>
                            <div class="col-sm-8 form-control">{{new Intl.NumberFormat('es-CO').format(carteraCapital)}}</div>
                        </div>
                        <div class="col-md-6 row">
                            <div class="col-sm-4 text-white"><h3>Interes $</h3></div>
                            <div class="col-sm-8 form-control">{{new Intl.NumberFormat('es-CO').format(carteraInteres)}}</div>
                        </div>
                    </div>
                    <div class="btn btn-block btn-danger text-center"  v-if="tablaCartera" @click="cerrarTablaCartera()"><h3>Cerrar tabla cartera</h3></div> 
                    <div class="btn btn-warning" v-else @click="verTablaCartera()">Ver tabla de cartera</div>
                </div>
            </div>
        </div>
    <table class="table table-hover" v-if="tablaCartera">
        <thead>
            <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>$ Capital</th>
                <th>$ Interes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(credito) in creditosActivosCartera" :key="credito._id">
                <td>{{credito.numeroC}}</td>
                <td>{{credito.nombreCliente}}</td>
                <td>{{credito.capital}}</td>
                <td>{{credito.interes}}</td>
            </tr>
        </tbody> 
    </table>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    created(){
        this.verCartera()
    },
    mounted(){
        this.cargarValores()
    },
    data() {
        return {
            creditosActivosCartera:[],
            sum:0,
            tablaCartera:false,
        }
    },
    computed: {
        ...mapState('storeContabilidad',['carteraCapital','carteraInteres']),        
    },
    methods: {
        ...mapActions('storeContabilidad',['cargarCarteraCapital','cargarCarteraInteres']),
        async verCartera() {
            this.creditosActivosCartera = await this.$axios.$get('/creditos/valoresCreditos')  
                               
        },
        async cargarValores(){
            if(this.carteraCapital==0){
                this.cargarCarteraCapital()
                this.cargarCarteraInteres() 
            } 
        },
        verTablaCartera(){
            this.tablaCartera = true
        },
        cerrarTablaCartera(){
            this.tablaCartera = false
        },
    },
}
</script>

<style>

</style>