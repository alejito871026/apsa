<template>
  <div class="p-4 text-center">
    <div class="card">
        <div class="card-header bg-white">
          <h4>Egresos creditos</h4>
        </div>
        <div class="card-body" style="height: auto; max-height: 390px; overflow-y: scroll;">
            <table class="table table-responsive-sm table-sm table-hover" id="tabla">
                <thead class="sticky-top text-white bg-dark">
                    <tr>
                        <th># Egreso</th>
                        <th>Valor</th>
                        <th># Credito</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>fecha de pago</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="(egreso, index) in egresos" :key="egreso._id">
                            <td>{{index + 1}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(egreso.valor)}} + {{new Intl.NumberFormat('es-CO').format(egreso.cuotaInicial)}} = {{new Intl.NumberFormat('es-CO').format(egreso.valor+egreso.cuotaInicial)}}</td>
                            <td>{{egreso.numCredito}}</td>
                            <td>{{egreso.nombreCliente}}</td>
                            <td>{{egreso.descripcion}}</td>
                            <td>{{verFecha(egreso.fechaEgreso)}}</td>
                            <td>
                                <div class="btn btn-info" v-if="egreso.egreso">Cancelado</div>
                                <div class="btn btn-warning" @click="egresoDesembolso(egreso)" v-else>Desembolsar</div>
                            </td>
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
    <b-modal v-model="desembolso" no-close-on-backdrop no-close-on-esc centered hide-header hide-footer size="md">
        <div class="card text-center">
            <div class="card-header bg-info text-white">{{datosModal.descripcion}}</div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text">Valor  a desembolsar</label>
                    </div>
                    <div class="form-control">{{new Intl.NumberFormat('es-CO').format(datosModal.valor+datosModal.cuotaInicial)}}</div>                    
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text">Valor comision</label>
                    </div>
                    <input type="number" class="form-control" v-model="datosModal.comision">
                    <div class="form-control" v-if="datosModal.comision>0">{{new Intl.NumberFormat('es-CO').format(datosModal.comision)}}</div>                    
                </div>
            </div>
            <div class="card-footer bg-white">
                <button class="btn btn-outline-primary btn-block" @click="desembolsar(datosModal)">Guardar desembolso</button>
                <button class="btn btn-outline-danger btn-block" @click="desembolso=false">cerrar</button>
            </div>
        </div>
    </b-modal>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    mounted(){
        this.cargarEgresos()
    },
    data(){
        return {
            egresos : [],
            paginas : [],
            pagina : 0,
            parPage:0,
            clientes:[],
            desembolso:false,
            datosModal:{},
        }
    },
    methods : {
        ...mapActions('storeContabilidad',['cargarValoresCapital','cargarValoresInteres','cargarValoresEgresos']),
        egresoDesembolso(credito){
            this.datosModal = credito
            this.desembolso  = true 
        },
        async desembolsar(datos){
            if(datos.comision===undefined || datos.comosion === ''){
                alert('si no hay comision debes escribir el 0')
                return
            }else{
                let h = new Date()
                let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
                datos.comision = parseInt(datos.comision)
                datos.fechaReflejadoEgreso = hoy
                datos.codigoEmpleadoReflejadoEgreso = this.$auth.$state.user._id
                const desembolsoOk = await this.$axios.$post('/contabilidad/desembolsarOk',datos)
                if(desembolsoOk.success){
                    this.cambiarPagina(this.parPage)
                    this.cargarValoresCapital()
                    this.cargarValoresInteres()
                    this.cargarValoresEgresos()
                    this.desembolso = false,
                    this.datosModal = {}
                }else{
                    console.log(desembolsoOk.error)
                }
            }             
        },
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
            let paginas = await this.$axios.$post("/contabilidad/totalEgresosCreditos")
            let totalPaginas = Math.ceil(paginas / 20)
            for(let a = 1;a<=totalPaginas;a++){
                this.paginas.push(a)
            }
        },
        async cambiarPagina (pagina) {
            const pag = {
                pagina
            }
            let egresos = await this.$axios.$post("/contabilidad/egresosCreditos", pag)
            if(egresos.success===false){  
                if(egresos.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                }
                this.$router.push('/inicioSesion')
            }else{
                this.egresos = egresos.egresos
            }
        },
        async cargarEgresos(){
            let pagina = 1
            let egresos = await this.$axios.$post("/contabilidad/egresosCreditos",pagina)
            if(egresos.status!=200){  
                if(egresos.status === 205){
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
                this.egresos = egresos.egresos
            }
        }, 
    }
}
</script>

<style>

</style>