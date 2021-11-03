<template>
  <div>
    <div class="container">
      <br>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Categoria</th>
            <th>producto</th>
            <th>valor</th>
            <th>cliente</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(creditos, index) in creditosProd" :key="index">
            <td>{{creditos.numeroCredito}}</td>
            <td>{{creditos.servicio}}</td>
            <td>{{creditos.producto.modelo}}</td>
            <td>{{creditos.valTotalCred}}</td>
            <td>{{creditos.nombreCliente}}</td>
            <td>{{creditos.estadoInterno}}</td>
            <td><div class="btn btn-warning text-white"><b-icon-eye></b-icon-eye> Ver</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
    name:'creditosProductos',
    props:['estado'],
    data() {
      return {
        creditosProd:[]

      }
    },
    created(){
    },
    mounted(){
      this.verCreditosProductos()
    },
    methods:{
      async verCreditosProductos(){
        this.creditosProd = await this.$axios.$get('/creditos/creditosProductos')
         console.log(this.creditosProd)
      },
    }
}
</script>

<style>

</style>