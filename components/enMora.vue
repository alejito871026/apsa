<template>
  <div class="negados">
        <div class="" v-if="!vercred">
            <h1 class="text-center p-4">Creditos en mora </h1>
            <div style="height: auto; max-height: 390px; overflow-y: scroll;" >
                <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm text-center">
                    <thead class="sticky-top text-white bg-dark">
                        <tr>
                            <th># credito</th>
                            <th>Nombre</th>
                            <th>CC Cliente</th>
                            <th>Servicio</th>
                            <th>fecha de pago</th>
                            <th>frecuencia</th>
                            <th>En mora</th>
                            <th>Ver</th>
                            <th>compromisos de pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(credito, index) in Creditos" :key="index">
                        <td>{{credito.numeroCredito}}</td>
                        <td>{{credito.nombreCliente}}</td>
                        <td>{{credito.cedula}}</td>
                        <td>{{credito.servicio}}</td>
                        <td>{{verFecha(credito.Fp)}}</td>
                        <td>{{credito.frecuencia}}</td>
                        <td v-if="credito.enMora" class="bg-danger">En mora</td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="verCredito(credito._id)"><b-icon-eye></b-icon-eye> ver</button>
                        </td>
                        <td>
                            <button v-if="credito.compromiso" class="btn btn-info btn-sm" @click="verCompromiso(credito._id)"><b-icon-calendar></b-icon-calendar></button>
                            <button v-else class="btn btn-warning btn-sm" @click="valorCuotaVencida(credito)"><b-icon-plus></b-icon-plus> <b-icon-calendar></b-icon-calendar> Nuevo </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      <div id="verCredito" v-if="vercred">
          {{credito}}
      </div>
        <b-modal v-model="verCom" no-close-on-backdrop no-close-on-esc centered hide-header hide-footer size="md">
            <div class="card">
                <div class="card-body">{{compromis.nuevaF }} <br> {{compromis.observacion}} <br> {{compromis.fechaV}} </div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-block" @click="verCom=false,compromis={}">cerrar</button>
                </div>
            </div>
        </b-modal>
      <b-modal v-model="modal" no-close-on-backdrop no-close-on-esc centered hide-header hide-footer size="md">
         <div class="card text-center">
             <div class="card-header bg-white">
                 <h2 class="p-3"><strong>Nuevo compromiso de pago</strong></h2>
                 <h2>Credito numero: {{compromiso.numeroCredito}}</h2>
             </div>
             <div class="card-body">
                <form @submit.prevent="guardarCompromiso(compromiso)">
                    <div class="form-group">
                        <div class="form-control">{{compromiso.nombreCliente}}</div>
                    </div>
                    <div class="form-group">
                        <div class="form-control">{{compromiso.telefono}}</div>
                    </div>
                    <div class="row form-group">
                        <div class="col-sm-6">
                            <span>Fecha de pago establecida</span>
                            <div class="form-control">{{verFecha(compromiso.Fp)}}</div>
                        </div>  
                        <div class="col-sm-6">
                            <span>Valor</span>
                            <div class="form-control">{{Math.round(compromiso.val)}}</div>                           
                        </div>
                        <div class="col-sm-6">
                            <span>Frecuencia</span>
                            <div class="form-control">{{compromiso.frecuencia}}</div>
                        </div> 
                        <div class="col-sm-6">
                            <span>debe al dia de hoy</span>
                            <div class="form-control">{{Math.round(compromiso.valorAhoy)}}</div>
                        </div> 
                        <div class="col-sm-6">
                            <span>Cuotas Vencidas</span>
                            <div class="form-control">{{compromiso.cuotasVencidas}}</div>
                        </div>
                        <div class="col-sm-6">
                            <span>Proxima fecha de pago</span>
                            <div class="form-control">{{compromiso.proxFecha}}</div>
                        </div>
                        <div class="col-sm-6" v-if="!compromiso.estadoActivo">
                            <span>Credito vencido </span>
                            <div class="form-control">Vencido</div>
                        </div> 
                        <div class="col-sm-6" v-if="!compromiso.estadoActivo">
                            <span>Dias vencido </span>
                            <div class="form-control">{{compromiso.diasVencido}}</div>
                        </div> 
                        <div class="col-sm-6">
                            <span>Dias de atrazo</span>
                            <div class="form-control">{{compromiso.atrazo}}  </div>
                        </div>
                        <div class="col-sm-12" v-if="!compromiso.estadoActivo">
                            <span>Dias de atrazo + dias vencidos</span>
                            <div class="form-control">{{compromiso.atrazo+compromiso.diasVencido}}  </div>
                        </div>
                    </div>  
                    <div class="form-group">
                        <span>Observacion</span>
                        <textarea class="form-control"  cols="3"  v-model="compromiso.observacion"></textarea>
                    </div> 
                    <div class="row form-group">
                        <div class="col-lg-12">
                            <span>Nueva fecha de pago</span>
                            <input type="date" required class="form-control" v-model="compromiso.fecha">
                        </div> 
                    </div>                    
                    <button class="btn btn-primary btn-block">Guardar</button>
                </form>
             </div>
             <div class="card-footer">
                 <div class="btn btn-warning btn-block" @click="cerrarModal()">Cerrar sin guardar</div>
             </div>
         </div>
      </b-modal>
  </div>
</template>

<script>

export default {
    name:'enMora',
    data(){
        return{
            Creditos : {},
            vercred : false,
            modal:false,
            compromiso:{},
            compromis:{},
            verCom:false,
            r : '',
            credito:{},
        }
    },
    created(){
    },
    mounted(){  
        this.fetchCreditos()
    },
    methods:{
        async fetchCreditos() {
            this.Creditos = await this.$axios.$get("/compromisos/enMora")
        },
        almacenar(x){
            localStorage.setItem('cc',x)
        },
        async verCredito(_id){
            this.credito = await this.$axios.$post("/creditos/verCreditoUnico",{_id})
            this.vercred = true
        },
        verCompromiso(idCredito){
            let id={idCredito}
            let r
            this.$axios.$post('/compromisos/verCompromiso',id)
            .then(res => {
                this.verCom = true
                this.compromis.nuevaF = res.data.fechaCompromiso
                this.compromis.observacion = res.data.observacion
                this.compromis.fechaV = res.data.fechaVencida
            })
            .catch(err => console.log(err));
        },
        nuevoCompromiso(credito){
            console.log(credito)
            this.modal = true
            this.compromiso = credito
            this.compromiso.atrazo=credito.atrazo              
            this.compromiso.val = credito.val
            this.compromiso.valorAhoy = credito.valorAhoy
            this.compromiso.cuotasVencidas = credito.cuotasVencidas
            this.compromiso.proxFecha = credito.proxFecha
            this.compromiso.estadoActivo = credito.estadoActivo
            this.compromiso.diasVencido = credito.diasVencido   
                               
        },
        /* actualizarvalorAtrazo(idPagares,idCredito){
            //lo primero que vamos a actualizar en el credito
            //sera la frecuencia 
            //luego obtendremos el valor del dia desde la funcion de crear el compromiso para
            //saber lo que se le esta diciendo al cliente de cuanto me debe a el da de hoy en tiempo atrazado y 
            //poder calcular el impuesto al tiempo atrazado sobre el valor
            let id = {idPagares}
            this.$axios.$post('/compromisos/pagares',id)
            .then(res => {
                let b = ''
                let pagares = res.data.pagares
                let f1 = new Date(pagares[1].ano+'-'+pagares[1].mes+'-'+pagares[1].dia)
                let f2 = new Date(pagares[2].ano+'-'+pagares[2].mes+'-'+pagares[2].dia)
                let cantidadDias  = f2.getTime() - f1.getTime()
                cantidadDias = (cantidadDias/(1000*60*60*24)); 
                if(cantidadDias>10&&cantidadDias<25){
                    b='quincenal'
                    this.updateFrecuencia(b,idCredito)  
                }
                if(cantidadDias>=25&&cantidadDias<=32){
                    b='mensual'
                    this.updateFrecuencia(b,idCredito)  
                } 
                
            })
            .catch(err => {console.log(err)
                return
            });
        },
        updateFrecuencia(b,idCredito){
            let valores= {
                b,
                idCredito
            }
            this.$axios.$post('/compromisos/actualizar',valores)
            .then(res => {
                console.log('actualizado')
            })
            .catch(err => {console.log(err)})
        }, */
        async valorCuotaVencida(credito){
            console.log(credito)
            const pagares = await this.$axios.$post('/compromisos/pagares',{id:credito.pagares})
            console.log(pagares)  
            let b = 0
            let y = 0     
            for (let a = 0; a < pagares.pagares.length; a++) {
                if(pagares.pagares[a].estado == true) {
                    b=b+1;
                }                    
            }
            console.log(b)
            console.log(pagares.pagares.length)
            console.log(pagares.pagares[b])
            this.interesMora(pagares.pagares,b)                  
            y = pagares.pagares[b].capital+ pagares.pagares[b].interes - pagares.pagares[b].abono   
            let respuesta = this.cuotasVencidas(pagares.pagares,b)
            credito.atrazo=this.diasAtrazo(credito.Fp) 
            console.log(this.interesMora(pagares.pagares,b,respuesta.contador))  
            credito.atrazo = credito.atrazo - respuesta.atrazo 
            credito.diasVencido = respuesta.atrazo         
            credito.cuotasVencidas = respuesta.contador
            credito.proxFecha = respuesta.proxFecha
            credito.estadoActivo = respuesta.estadoActivo
            credito.val = y
            let valorMes = pagares.pagares[b].capital + pagares.pagares[b].interes
            let dias
            if(credito.frecuencia == 'semanal'){
                dias = 7.3
            }
            if(credito.frecuencia == 'quincenal'){
                dias = 15
            }
            if(credito.frecuencia == 'mensual'){
                dias = 30.3
            }
            let valorDia = valorMes / dias
            credito.valorAhoy = valorDia * credito.atrazo + y
            this.nuevoCompromiso(credito)             
            
        },
        interesMora(pagares,b,c){
            let n = b + c -1
            let hoy = new Date().getTime()    
            let valorInteresMoraCuota= []                 
            for (let a = b; a <=n; a++) { 
                let valores = {}  
                console.log(pagares[a])               
                let fp = new Date(pagares[a].fecha).getTime()                  
                let diasMoraCuota =  hoy - fp;
                diasMoraCuota = (diasMoraCuota/(1000*60*60*24));                  
                diasMoraCuota = parseInt(diasMoraCuota) 
                console.log(diasMoraCuota)
                valores.diasMoraCuota=diasMoraCuota
                if(pagares[a].abono > pagares[a].capital+ pagares[a].interes){
                    valores.valorMoraCuota = 0
                }else{
                    let valorCuota =  pagares[a].capital+ pagares[a].interes - pagares[a].abono
                    valorCuota = (((valorCuota *0.2419)/360)*diasMoraCuota)
                    valores.valorMoraCuota  = valorCuota
                }   
                valorInteresMoraCuota.push(valores)                            
            }
            
            return valorInteresMoraCuota
        },
        cuotasVencidas(pagares,b){
            let valores = {}
            let hoy = new Date().getTime()
            valores.contador = 0
            for(let a = b; a <pagares.length;a++){
                let fechaPag = new Date(pagares[a].fecha).getTime()
                if (hoy>fechaPag) {
                    valores.contador = valores.contador + 1
                }
                let bandera = b + (valores.contador-1)
                valores.proxFecha = pagares[bandera].fecha
            }
            let n = pagares.length-1
            let ultimaCuota = new Date(pagares[n].fecha).getTime()
            if(ultimaCuota>hoy){
                valores.estadoActivo = true
                valores.atrazo = 0
            }else{
                valores.estadoActivo = false
                var diff = hoy - ultimaCuota;
                diff = (diff/(1000*60*60*24));  
                valores.atrazo = parseInt(diff)
            }
            return valores
            
        },
        valorAtrazo(idPagares,index){
            let id = {idPagares}
            this.$axios.$post('/compromisos/pagares',id)
            .then(res => {
                let b = 0
                let pagares = res.data.pagares             
                for (let a = 0; a < pagares.length; a++) {
                    if(pagares[a].estado == true) {
                        b=b+1;
                    }                    
                }                
                this.Creditos[index].val = pagares[b].valorCuota + pagares[b].interesCuota - pagares[b].abono
                
            })
            .catch(err => console.log(err));
        },
        diasAtrazo(Fp){
            var fechaInicio = new Date(Fp).getTime();
            var fechaFin    = new Date().getTime();
            var diff = fechaFin - fechaInicio;
            diff = (diff/(1000*60*60*24));                            
            return parseInt(diff); 
        },
        guardarCompromiso(){
            if(this.compromiso.observacion === undefined){
                this.compromiso.observacion = 'Sin observacion'
            }
            let valores = {
                idCredito : this.compromiso._id,
                fechaVencida : this.verFecha(this.compromiso.Fp),
                observacion : this.compromiso.observacion,
                fechaCompromiso : this.compromiso.fecha
            }
            console.log(valores)
            this.axios.post(this.uri+'/api/compromisos/nuevoCompromiso',valores)
            .then(res =>{
                console.log('agregado')
                this.campromisoVerdadero(valores.idCredito)
            })
            .catch(err =>{})
        },
        campromisoVerdadero(id){
            let valores={id}
            this.axios.post(this.uri+'/api/compromisos/compromisoVerdadero',valores)
            .then(res =>{
                console.log('se ha cambiado correctamente')
                this.compromiso = {}
                this.modal = false
                this.fetchCreditos()
            })
            .catch(err =>{
                this.caompromisoVerdadero(valores)
                console.log('se ha reenviado para cambio correctoa verdadero el compromiso')
            })
        },
        cerrarModal(){
            this.modal = false,
            this.compromiso = {}
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
    },    
}
</script>

<style>

</style>