<template>
  <div>
    <div class="card">
      <div class="card-body">
          <div class="caja p-4 bg-info  text-center">
              <div class="row pb-3">
                  <div class="col-md-4 text-white"><h3><strong>Egresos $</strong></h3></div>
                  <div class="col-md-8 bg-white rounded"><h3><strong>{{new Intl.NumberFormat('es-CO').format(capitalEgresos)}}</strong></h3></div>
              </div>
               <div class="btn btn-danger" v-if="verTablas" @click="cerrarTablasIngresos()">cerrar tablas Egresos</div>
              <div class="btn btn-warning" v-else @click="verTablasIngresos()">Ver tablas Egresos</div>
          </div>
      </div>
    </div>
    <div v-if="verTablas">
      <egresos-creditos/>
      <egresos-compras/>
      <egresos-gastos-funcionamiento/>
      <egresos-nominas/>
      <egresos-avances/>
      <egresos-pagos-terceros/>
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