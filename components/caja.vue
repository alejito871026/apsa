<template>
    <div>
        <br>
        <moviminetos-caja/>
        <div class="card">
            <div class="card-body">
                <div class="caja p-4 bg-info">
                    <div class="row text-center">
                        <div class="col-md-4 text-white"><h3><strong>Caja $</strong></h3></div>
                        <div class="col-md-8 bg-white rounded"><h3><strong>{{new Intl.NumberFormat('es-CO').format(capitalIngresos + interesIngresos - capitalEgresos )}}</strong></h3></div>
                    </div>
                </div>
            </div>
        </div>        
        <ingresos/>
        <egresos/>
        <cartera/>
        <dia-adia/>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    created(){        
    },
    mounted(){ 
        if(this.capitalEgresos===0){
            this.totall()             
        }               
    },
    data() {
        return {
            total:0
        }
    },
    computed: {
        ...mapState('storeContabilidad',['capitalIngresos','interesIngresos','capitalEgresos']),        
    },
    methods: {
        ...mapActions('storeContabilidad',['cargarValoresCapital','cargarValoresInteres','cargarValoresEgresos']),
        async totall() {
            this.cargarValoresCapital()
            this.cargarValoresInteres()
            this.cargarValoresEgresos()
        }
    },
}
</script>

<style>

</style>