<template>
  <div class="p-4 text-center bg-secondary">
    <div class="card">
        <div class="card-header bg-white">
          <h4>Ingresos Papeleria</h4>
        </div>
        <div class="card-body" style="height: auto; max-height: 390px; overflow-y: scroll;">
            <table class="table table-responsive-sm table-sm table-hover" id="tabla">
                <thead class="sticky-top text-white bg-dark">
                    <tr>
                        <th># Ingreso</th>
                        <th># Concepto</th>
                        <th>Descripcion</th>
                        <th>Valor</th>
                        <th>fecha de ingreso</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="(ingreso, index) in ingresos" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{ingreso.concepto}}</td>
                            <td>{{ingreso.descripcion}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(ingreso.capital)}}</td>
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
    <div class="card">
        <div class="card-header bg-white">
          <h4>Egresos Papeleria</h4>
        </div>
        <div class="card-body" style="height: auto; max-height: 390px; overflow-y: scroll;">
            <table class="table table-responsive-sm table-sm table-hover" id="tabla">
                <thead class="sticky-top text-white bg-dark">
                    <tr>
                        <th># Ingreso</th>
                        <th># Concepto</th>
                        <th>Descripcion</th>
                        <th>Valor</th>
                        <th>fecha de ingreso</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="(ingreso, index) in egresos" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{ingreso.concepto}}</td>
                            <td>{{ingreso.descripcion}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(ingreso.valor)}}</td>
                            <td>{{verFecha(ingreso.fechaEgreso)}}</td>
                        </tr>
                    </tbody>
            </table>
        </div>
        <div class="card-footer">
           <nav>
                <ul class="pagination justify-content-center d-flex">
                    <li class="page-item"><div class="page-link" v-if="parPageE>1" @click="cambiarPagina(parPageE=parPageE-1)" >Anterior</div></li>
                    <li class="page-item" v-for="paginaE in paginasE" :key="paginaE">
                        <div class="page-link active btn-outline-primary text-white" v-if="paginaE == parPageE"  @click="cambiarPagina(parPageE=paginaE)">{{paginaE}}</div>
                        <div class="page-link active" v-else  @click="cambiarPagina(parPageE=paginaE)">{{paginaE}}</div>
                    </li>
                    <li class="page-item"><div class="page-link" v-if="parPageE<paginasE.length" @click="cambiarPagina(parPageE=parPageE+1)">Siguiente</div></li>
                </ul>
            </nav>
        </div>
    </div>
    <h3 class="text-center p-3 bg-white"><strong>$total:{{total}}</strong></h3>
  </div>
</template>

<script>
export default {
    mounted(){
        this.cargarIngresos()
        this.cargarEgresos()
        this.totall()
    },
    data(){
        return {
            ingresos : [],
            egresos : [],
            paginas : [],
            paginasE : [],
            pagina : 0,
            parPage:0,
            paginaE : 0,
            parPageE:0,
            clientes:[],
            total:0
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
        async paginacion(){
            let paginas = await this.$axios.$post("/contabilidad/totalIngresosOtros")
            let totalPaginas = Math.ceil(paginas / 20)
            console.log(totalPaginas)
            for(let a = 1;a<=totalPaginas;a++){
                this.paginas.push(a)
            }
        },
        async paginacionE(){
            let paginas = await this.$axios.$post("/contabilidad/totalEgresosOtros")
            let totalPaginasE = Math.ceil(paginas / 20)
            console.log(totalPaginasE)
            for(let a = 1;a<=totalPaginasE;a++){
                this.paginasE.push(a)
            }
        },
        async cambiarPagina (pagina) {
            const pag = {
                pagina
            }
            let ingresos = await this.$axios.$post("/contabilidad/ingresosOtros", pag)
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
        async cambiarPaginaE (pagina) {
            const pag = {
                pagina
            }
            let Egresos = await this.$axios.$post("/contabilidad/egresosOtros", pag)
            if(Egresos.success===false){  
                if(Egresos.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                }
                this.$router.push('/inicioSesion')
            }else{
                this.egresos = Egresos.egresos
            }
        },
        async cargarEgresos(){
            let pagina = 1
            let Egresos = await this.$axios.$post("/contabilidad/egresosOtros",pagina)
            if(Egresos.success===false){  
                if(Egresos.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                }
                this.$router.push('/inicioSesion')
            }else{
                this.egresos = Egresos.egresos
                this.paginacionE()
            }
        },
        async cargarIngresos(){
            let pagina = 1
            let ingresos = await this.$axios.$post("/contabilidad/ingresosOtros",pagina)
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
                this.paginacion()
                this.ingresos = ingresos.ingresos
            }
        },
        async totall(){
            let total = await this.$axios.$post('/contabilidad/totalOtros')
            this.total = parseInt(total.a-total.b)
        }, 
    }
}
</script>

<style>

</style>