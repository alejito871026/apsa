<template>
    <div class="text-center border mb-3 p-3">
        <div class="bg-info p-3 text-center">
            <h3 class="text-white mb-2"><strong>Movimientos del dia</strong></h3>
            <div class="btn btn-warning" @click="verMovimientosDia()" v-if="!botom">Ver movimientos</div>  
            <div v-else>
                <div  class="rounded bg-white mb-2">
                    <div id="creditos">
                        <h2>Creditos</h2>
                        <table class="table table-hover teble-sm">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Valor</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="creditos in movimientos.creditos" :key="creditos._id">
                                    <td>{{creditos.nombreCliente}}</td>
                                    <td>{{creditos.cantidad}}</td>
                                    <td>{{creditos.valorTotal}}</td>
                                    <td>{{creditos.estadoInterno}}</td>
                                    <td>{{verFecha(creditos.fechaAgregado)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="ingresos">
                        <h2>Ingresos</h2>
                        <table class="table table-hover teble-sm">
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Descripcion</th>
                                    <th>Capital</th>
                                    <th>Interes</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ingresos in movimientos.ingresos" :key="ingresos._id">
                                    <td>{{ingresos.concepto}}</td>
                                    <td>{{ingresos.descripcion}}</td>
                                    <td>{{ingresos.capital}}</td>
                                    <td>{{ingresos.interes}}</td>
                                    <td>{{verFecha(ingresos.fechaIngresoEfectivo)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="egresos">
                        <h2>Egresos</h2>
                        <table class="table table-hover teble-sm">
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Descripcion</th>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="egresos in movimientos.egresos" :key="egresos._id">
                                    <td>{{egresos.concepto}}</td>
                                    <td>{{egresos.descripcion}}</td>
                                    <td>{{egresos.valor}}</td>
                                    <td>{{verFecha(egresos.fechaEgreso)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="productos">
                        <h2>Productos</h2>
                        <table class="table table-hover teble-sm">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Modelo</th>
                                    <th>Proveedor</th>
                                    <th>Referencia</th>
                                    <th>Valor compra</th>
                                    <th>Valor venta</th>
                                    <th>Fecha</th>
                                    <th>Vendido</th>
                                </tr>
                            </thead>
                            <tbody>
                                 <tr v-for="productos in movimientos.productos" :key="productos._id">
                                    <td>{{productos.tipoProducto}}</td>
                                    <td>{{productos.modelo}}</td>
                                    <td>{{productos.proveedor}}</td>
                                    <td>{{productos.referencia}}</td>
                                    <td>{{productos.valorCompra}}</td>
                                    <td>{{productos.valorVenta}}</td>
                                    <td>{{verFecha(productos.fechaCompra)}}</td>
                                    <td v-if="productos.entregado">
                                        <div v-if="productos.efectivo">En efectivo</div>
                                        <div v-else>A credito</div>
                                    </td>
                                    <td v-else>No vendido</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="btn btn-warning" @click="botom=false">cerrar movimientos</div>  
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    data(){
        return{
            moviminentos:{},
            botom:false
        }
    },
    methods : {
        async verMovimientosDia(){
            this.movimientos = await this.$axios.$post('/creditos/diaAdia')
            this.botom=true
            console.log(this.movimientos)
        },
        verFecha(fecha){
            console.log(fecha)
            let h = new Date()
            let hoy = new Date(h.getFullYear(),(h.getMonth()+1),(h.getDate()),0,0,1)
            console.log(hoy)
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            if(fech.getDate()<hoy.getDate()){
                fech.setDate(hoy.getDate())
            }
            console.log(fech.getDate())
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
    }
}
</script>

<style>

</style>