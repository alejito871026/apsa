<template>
  <div>
    <div class="card">
      <div class="card-body text-center">
          <div class="caja p-4 bg-info">
              <div class="row pb-3">
                  <div class="col-md-4  text-white"><h3><strong>Ingresos$</strong></h3></div>
                  <div class="col-md-8  bg-white rounded"><h3><strong>{{new Intl.NumberFormat('es-CO').format(capitalIngresos + interesIngresos)}}</strong></h3></div>
              </div>
              <div class="btn btn-danger" v-if="verTablas" @click="cerrarTablasIngresos()">cerrar tablas Ingresos</div>
              <div class="btn btn-warning" v-else @click="verTablasIngresos()">Ver tablas Ingresos</div>
          </div>
      </div>
    </div>
    <div v-if="verTablas">
      <ingresos-creditos-cap-int/>
      <ingresos-creditos-int-mora/>
      <ingresos-comision/>
      <ingresos-creditos-a-d-s/>
      <ingresos-creditos-cuota-Incial />
      <ingresos-inversiones/>
      <ingresos-ventas-efectivo/>
      <ingresos-otros/>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      verTablas:false
    }
  },
  computed: {
      ...mapState('storeContabilidad',['capitalIngresos','interesIngresos','capitalEgresos']),        
    },
    methods: {
      verTablasIngresos(){
        this.verTablas = true
      },
      cerrarTablasIngresos(){
        this.verTablas = false
      },
    }
}
</script>

<style>

</style>