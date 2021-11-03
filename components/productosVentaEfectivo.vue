<template>
    <div>
        <div class="row text-center">
            <h2 class="mx-auto p-4"><strong>Productos vendidos</strong></h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Tipo Producto</th>
                        <th>Modelo</th>
                        <th>Cod- referencia</th>
                        <th>Fecha venta</th>
                        <th>Valor compra</th>
                        <th>Valor venta</th>
                        <th>Cliente</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(producto,index) in productos" :key="index">
                        <td>{{producto.tipoProducto}}</td>
                        <td>{{producto.modelo}}</td>
                        <td>{{producto.referencia}}</td>
                        <td>{{verFecha(producto.fechaVenta)}}</td>
                        <td>{{new Intl.NumberFormat('es-CO').format(producto.valorCompra)}}</td>
                        <td>{{new Intl.NumberFormat('es-CO').format(producto.valorVentaFinal)}}</td>
                        <td>{{producto.cliente.nombreCliente +' '+ producto.cliente.primerApellidoCliente +' '+producto.cliente.segundoApellidoCliente}}</td>
                        <td><button class="btn btn-outline-warning" @click="ver(producto)">Ver</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.verVentasEfectivo()
    },
    data() {
        return {
            productos: []
        }
    },
    methods:{
        async verVentasEfectivo(){
            this.productos = await this.$axios.$get('/productos/ventasEfectivo')
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
    }
}
</script>

<style>

</style>