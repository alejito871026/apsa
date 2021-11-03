<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand class="btn btn-warning col-sm-4 btn-sm" v-if="!botonAgregarCredito" @click="agregar()">
            Agregar nueva solicitud de crédito
        </b-navbar-brand>
        <b-navbar-brand class="btn btn-danger col-sm-4 btn-sm" v-else @click="regreso()">
            Cancelar solicitud de credito
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collaps"></b-navbar-toggle>
        <b-collapse id="nav-collaps" is-nav>
          <b-navbar-nav class="ml-auto">
            <ul class="navbar-nav">
              <router-link to="/creditos/Solicitudes" class="nav-link text-white btn btn-sm">solicitudes</router-link>
              <router-link to="/creditos/PorAprobacion" v-if="$auth.$state.user.rol==='ADMIN'|| $auth.$state.user.rol ==='SUPERADMIN'" 
              class="nav-link btn text-white btn-sm">Por aprobacion</router-link>
              <router-link to="/creditos/Aprobados" class="nav-link text-white btn btn-sm">Aprobados</router-link>
              <router-link to="/creditos/Activos" class="nav-link text-white btn btn-sm">Activos</router-link>
              <router-link to="/creditos/En_mora" class="nav-link text-white btn btn-sm">En mora</router-link>
              <router-link to="/creditos/No_aprobados" class="nav-link text-white btn btn-sm">No aprobados</router-link>
              <router-link to="/creditos/Terminados" class="nav-link text-white btn btn-sm">Terminados</router-link>
              <router-link to="/creditos/Listados" class="nav-link text-white btn btn-sm">Listados</router-link>
            </ul>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div v-if="buscarClienteCreditoNuevo">
        <buscador-cliente-credito-nuevo/>
      </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapState('storeViewComponentsCreditos',['buscarClienteCreditoNuevo','botonAgregarCredito']),
  }, 
  methods: {
    ...mapMutations('storeViewComponentsCreditos',['estadoBuscadorClienteCreditoNuevo','estadoBotonAgregarCredito']),
    agregar(){
      this.estadoBuscadorClienteCreditoNuevo(true)
      this.estadoBotonAgregarCredito(true)
    },
    regreso(){
      this.estadoBuscadorClienteCreditoNuevo(false)
      this.estadoBotonAgregarCredito(false)
    },
  }

}
</script>

<style>

</style>