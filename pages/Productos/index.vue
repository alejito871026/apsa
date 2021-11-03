<template>
  <div class="Productos">
    <barra-logeado/>
    <div class="bg-primary text-white text-center p-4">
      <h1><strong>PRODUCTOS</strong></h1>
    </div>
    <div class="p-4 border border-primary">
            <nav class="navbar navbar-expand-lg navbar-light bg-primary text-white">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="nav mr-auto mt-2 mt-lg-0  justify-content-end">
                        <li class="nav-item">
                            <button class="btn btn-primary" @click="verProductos(),cerrarCreditosProductos(),cerrarVendidos()">Productos</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-primary" @click="creditosProductos(),cerrarVerProductos(),cerrarVendidos()">Creditos</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-primary" @click="vendidos(),cerrarCreditosProductos(),cerrarVerProductos()">Vendidos</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div v-if="products">
            <stock-productos />
        </div>
        <div v-if="creditsProducts">
            <creditos-productos/>
        </div>
        <div v-if="productsSale">
            <productos-venta-efectivo/>
        </div>
  </div>
</template>

<script>
const f = require ("../../funciones/funciones.js")
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
        products:false,
        creditsProducts:false,
        productsSale:false,
      }
    },
    methods: {
      verProductos(){
          this.products=true
      },
      creditosProductos(){
          this.creditsProducts=true
      },
      vendidos(){
          this.productsSale=true
      },
      cerrarVerProductos(){
          this.products=false
      },
      cerrarCreditosProductos(){
          this.creditsProducts=false
      },
      cerrarVendidos(){
          this.productsSale=false
      }
    },
}
</script>

<style>

</style>