<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand class="btn btn-warning col-sm-4 btn-sm" v-if="!botonCrearCliente" @click="agregar()">
            Crear cliente
        </b-navbar-brand>
        <b-navbar-brand class="btn btn-danger col-sm-4 btn-sm" v-else @click="regreso()">
            Cancelar creacion cliente
        </b-navbar-brand>
        <br>
        <b-navbar-toggle target="nav-collaps"></b-navbar-toggle>
        <b-collapse id="nav-collaps" is-nav>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar cliente" v-model="buscarCedula"></b-form-input>
        </b-collapse>
      </b-navbar>
      <div v-if="crearCliente">
        <crear-cliente :cc="cedula"/>
      </div>
      <div v-else>
        <tabla-clientes :cc="buscarCedula"/>
      </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
  props:['ccc'],
  data(){
    return{
      persona:{},
      cedula:{},
      buscarCedula:null,
    }
  },
  computed:{
    ...mapState('storeViewComponentsClientes',['botonCrearCliente','crearCliente']),
  },
  created(){
    this.validarProps()
  },
  methods: {
    ...mapMutations('storeViewComponentsClientes',['estadoBotonCrearCliente','estadoCrearCliente']),
    agregar(){
      this.estadoCrearCliente(true)
      this.estadoBotonCrearCliente(true)
    },
    regreso(){
      this.estadoCrearCliente(false)
      this.estadoBotonCrearCliente(false)
      this.cedula={}
    },
    validarProps(){
      if(this.ccc!=null){
          this.cedula.cedulaId = this.ccc.cc
          if(this.cedula.num){
            this.cedula.num = this.ccc.n
            this.estadoCrearCliente(true)
            this.estadoBotonCrearCliente(true)
          }
        }else{
          this.cedula = null
        }
    },
  }
}
</script>

<style>

</style>