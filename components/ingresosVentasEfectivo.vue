<template>
  <div class="p-4 text-center">
    <div class="card">
        <div class="card-header bg-white">
          <h4>Ingresos ventas efectivo</h4>
        </div>
        <div class="card-body" style="height: auto; max-height: 390px; overflow-y: scroll;">
            <table class="table table-responsive-sm table-sm table-hover" id="tabla">
                <thead class="sticky-top text-white bg-dark">
                    <tr>
                        <th># Ingreso</th>
                        <th>Capital</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>fecha de pago</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="(ingreso, index) in ingresos" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(ingreso.capital)}}</td>
                            <td>{{ingreso.nombre}}</td>
                            <td>{{ingreso.descripcion}}</td>
                            <td>{{verFecha(ingreso.fechaIngresoEfectivo)}}</td>
                        </tr>
                    </tbody>
            </table>
        </div>
        <div class="card-footer">
           <nav>
                <ul class="pagination justify-content-center d-flex">
                    <li class="page-item"><div class="page-link" v-if="parPage>1" @click="cambiarPagina(parPage=parPage-1)" >Anterior</div></li>
                    <li class="page-item" v-for="pagina in paginas" :key="pagina">
                        <div class="page-link active btn-outline-primary text-white" v-if="pagina == parPage"  @click="cambiarPagina(parPage=pagina)">{{pagina}}</div>
                        <div class="page-link active" v-else  @click="cambiarPagina(parPage=pagina)">{{pagina}}</div>
                    </li>
                    <li class="page-item"><div class="page-link" v-if="parPage<paginas.length" @click="cambiarPagina(parPage=parPage+1)">Siguiente</div></li>
                </ul>
            </nav>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){
        this.cargarIngresos()
    },
    data(){
        return {
            ingresos : [],
            paginas : [],
            pagina : 0,
            parPage:0,
            clientes:[]
        }
    },
    methods : {
        verFecha(fecha,n){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            if(n==1){
                const  y = meses[fech.getMonth()]+' del año '+ fech.getFullYear() 
                return y 
            }else{
                const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
                return y 
            }         
        },
        async paginacion(posicion){
            this.parPage = posicion
            let paginas = await this.$axios.$post("/contabilidad/totalIngresosVentas")
            let totalPaginas = Math.ceil(paginas / 20)
            for(let a = 1;a<=totalPaginas;a++){
                this.paginas.push(a)
            }
        },
        async cambiarPagina (pagina) {
            const pag = {
                pagina
            }
            let ingresos = await this.$axios.$post("/contabilidad/ingresosVentas", pag)
            if(ingresos.success===false){  
                if(ingresos.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                }
                this.$router.push('/inicioSesion')
            }else{
                this.ingresos = ingresos.ingresos
            }
        },
        async cargarIngresos(){
            let pagina = 1
            let ingresos = await this.$axios.$post("/contabilidad/ingresosVentas",pagina)
            if(ingresos.status!=200){  
                if(ingresos.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                    this.$router.push("/inicioSesion")
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                    this.$router.push("/inicioSesion")
                }
            }else{
                this.paginacion(pagina)
                this.ingresos = ingresos.ingresos
            }
        }, 
    }
}
</script>

<style>

</style>