<template>
    <div>
        <barra-logeado/>
        <div class="bg-primary text-white text-center p-4">
            <h1><strong>CREDITOS APROBADOS</strong></h1>
        </div>
        <barra-creditos/>
        <div v-if="verCredit">
            <div class="card text-center">
                <div class="card-header">
                    <h2>Credito por entregar # {{credito.numeroCredito}} <a v-if="credito.OldValores">Renovacion</a></h2>
                </div>
                <div class="card-body">
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text"> Nombre del cliente </label>
                    </div>
                    <div id class="form-control">{{credito.cliente.nombreCliente}} {{credito.cliente.primerApellidoCliente}} {{credito.cliente.segundoApellidoCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text"> # Telefono celular </label>
                    </div>
                    <div id class="form-control">{{credito.cliente.celularUnoCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text">Otro # de contacto</label>
                    </div>
                    <div id class="form-control">{{credito.cliente.celularDosCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Servicio</label>
                        </div>
                        <div id class="form-control">{{credito.servicio}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Monto Aprobado</label>
                        </div>
                        <div id class="form-control">{{new Intl.NumberFormat('es-CO').format(credito.cantidad)}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Fecha solicitud</label>
                        </div>
                        <div id class="form-control">{{verFecha(credito.fechaAgregado)}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Cuota inicial</label>
                        </div>
                        <div id class="form-control">{{new Intl.NumberFormat('es-CO').format(credito.cuotaInicial)}}</div>
                        <div  v-if="credito.cuotaInicialEntregada == true" class="btn btn-success">validado</div>
                        <div v-if="credito.cuotaInicialEntregada==false" class="btn btn-danger" @click="spiner=true, ingresoInicialCredito(credito._id,credito.cuotaInicial, credito.empleados)">ingreso a caja cuota inicial</div>
                    </div>
                    <div class="card" v-if="credito.OldValores">
                        <div class="card-body">
                            <h3>Valores del credito anterior</h3>                        
                            <div class="input-group mb-3" >
                                <div class="input-group-prepend">
                                    <label class="input-group-text">Capital</label>
                                </div>
                                <div id class="form-control">{{credito.OldValores.capital}}</div>
                            </div>
                            <div class="input-group mb-3" >
                                <div class="input-group-prepend">
                                    <label class="input-group-text">Interes</label>
                                </div>
                                <div id class="form-control">{{credito.OldValores.interes}}</div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="btn btn-success btn-block" @click="pagarCreditoAnterior(credito.OldValores)" 
                            v-if="creditoAnterior.estadoInterno!='terminado'"><h3><strong>Pagar credito anterior</strong></h3></div>
                            <div class="btn btn-success btn-block" v-else><h3><strong>Cancelado</strong></h3></div>
                        </div> 
                        <br>
                        <div class="btn btn-outline-danger btn-block p-2"><h3><strong>El valor a entregar es de $ {{new Intl.NumberFormat('es-CO').format(credito.cantidad+credito.OldValores.capital)}}</strong></h3></div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn-group mb-3 col-lg-12">
                        <button class="btn btn-primary text-white" v-if="!credito.clienteInformado" @click="marcarInformado(credito._id)"><h2><strong>Marcar como informado</strong></h2></button>
                        <button class="btn btn-success" v-if="credito.clienteInformado"><h2><strong>informado </strong></h2></button>
                        <button class="btn btn-warning" @click="regresando()"><h2><strong>regresar</strong></h2></button>
                    </div>
                    <br>  
                    <div class="input-group mb-3">
                        <div class="btn btn-info col-md-10" @click="verDocumento(credito)"><h2><strong> Imprimir certificado de credito</strong></h2></div>
                        <div class="btn col-md-2 bg-success p-2">
                            <input type="checkbox" class="mx-auto p-2" style="width:20px;height:20px;" v-model="impreso"><br>
                            <span class="text-white">ya esta impreso?</span>
                        </div>
                    </div>  
                    <div class="btn btn-primary btn-block" @click="modal=true" v-if="credito.clienteInformado==true  && impreso == true"><h2><strong>Entregar Credito</strong></h2></div>                
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                  <div class="btn btn-block p-1 btn-outline-success" @click="regresando()"><h2>Cerrar</h2></div>  
                </div>
            </div>            
        </div>   
        <table class="table table-hover table-sm text-center" v-else>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Servicio</th>
                    <th>Valor</th>
                    <th>Frecuencia</th>
                    <th>Cliente ?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="credito in aprobados" :key="credito._id" @click="verCredito(credito)">
                    <td>{{credito.numeroCredito}}</td>
                    <td>{{credito.cliente.nombreCliente}} {{credito.cliente.primerApellidoCliente}} {{credito.cliente.segundoApellidoCliente}}</td>
                    <td>{{credito.servicio}}<a v-if="credito.OldValores"> Renovacion a credito # {{credito.OldValores.numeroC}}</a></td>
                    <td>{{credito.valTotalCred}}</td>
                    <td>{{credito.frecuencia}}</td>
                    <td v-if="credito.clienteInformado" class="bg-success">Si <b-icon-check class="text-primary"></b-icon-check></td>
                    <td v-else class="bg-warning">No <strong class="text-danger">X</strong></td>
                </tr>
            </tbody>
        </table>
        <b-modal v-model="spiner" no-close-on-backdrop no-close-on-esc hide-header-close hide-header hide-footer 
            lazy centered size="lg">
            <div class="text-center">
                <div class="spinner-border text-primary p-5"><h2><strong>A</strong></h2></div>
                <div class="spinner-grow text-success p-4"></div>
                <div class="spinner-border text-info p-5"><h2><strong>P</strong></h2></div>
                <div class="spinner-grow text-warning p-4"></div>
                <div class="spinner-border text-danger p-5"><h2><strong>S</strong></h2></div>
                <div class="spinner-grow text-secondary p-4"></div>
                <div class="spinner-border text-dark p-5"><h2><strong>A</strong></h2></div>
            </div>
            <br>
            <div class="text-center"><h2><strong>Cargando !!</strong></h2></div>
        </b-modal>
        <b-modal v-model="verImpresion" id="verImpresion" no-close-on-backdrop centered no-close-on-esc hide-header-close hide-header hide-footer lazy size="xl">
            <div class="card border border-white text-center" id="imprimiendo">
                <div class="card-header bg-white text-right border-white">
                    <br>
                    Cartago {{verFecha(new Date())}}<br>
                    <br><br>
                    <div class="card-header bg-white text-center border-white ">
                        <img src="/logo.jpeg" alt="" style="width:400px;height:100px;"><br>               
                        <h2><strong> Certificado entrega credito # {{credito.numeroCredito}} </strong></h2>              
                    </div> 
                </div>
                <div class="card-body border-white">
                    <br>
                    Se hace entrega al señor(a) {{credito.cliente.nombreCliente}} {{credito.cliente.primerApellidoCliente}} {{credito.cliente.segundoApellidoCliente}} 
                    identificado con la CC# {{credito.cliente.cedulaIdCliente}} la suma de {{new Intl.NumberFormat('es-CO').format(credito.cantidad)}} por el servicio de {{credito.servicio}}, el cual sera cancelado 
                    en cuotas {{credito.frecuencia}}es por un periodo de  {{credito.tiempo}} <a v-if="credito.tiempo == 1">mes</a> <a v-if="credito.tiempo > 1">meses</a> <br>
                    el valor total del credito es de {{new Intl.NumberFormat('es-CO').format(credito.valTotalCred)}}, <a v-if="credito.frecuencia=='Mensual'"> 
                    las cuotas mensuales tendran un valor de {{new Intl.NumberFormat('es-CO').format(credito.valCuotaMens)}} pesos. y sera terminado en la fecha 
                    {{verFecha(credito.pagares.pagares[credito.pagares.pagares.length-1].fecha)}}</a><a v-if="credito.frecuencia=='Quincenal'"> 
                    las cuotas Quincenales tendran un valor de {{new Intl.NumberFormat('es-CO').format(credito.valCuotaMens/2)}} pesos. y sera terminado en la fecha 
                    {{verFecha(credito.pagares.pagares[credito.pagares.pagares.length-1].fecha)}}</a><a v-if="credito.frecuencia=='Semanal'"> 
                    las cuotas semanales tendran un valor de {{new Intl.NumberFormat('es-CO').format(credito.pagares.pagares[0].capital+credito.pagares.pagares[0].interes)}} pesos. y sera terminado en la fecha 
                    {{verFecha(credito.pagares.pagares[credito.pagares.pagares.length-1].fecha)}}</a>
                    <a v-if="credito.frecuencia=='Pago Unico'"> 
                        las cuotas Mensuales tendran un valor de {{new Intl.NumberFormat('es-CO').format(credito.pagares.pagares[0].capital+credito.pagares.pagares[0].interes)}} pesos. y una cuota final de 
                        {{new Intl.NumberFormat('es-CO').format(credito.cantidad+credito.pagares.pagares[0].interes)}} la cual debera ser cancela el {{verFecha(credito.pagares.pagares[credito.pagares.pagares.length-1].fecha)}}
                    </a>
                    <br><br>
                    Para constancia se firma en Cartago el dia {{verFecha(new Date())}}
                    <br><br><br>
                    <div class="row">
                        <div class="col-lg-6">
                            Firma cliente <br>
                            <br>___________________________________________________
                        </div>
                        <div class="col-lg-6">
                            Firma gerente<br>
                            <br>___________________________________________________
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white border-white text-center" id="botones">
                    <div @click="impripdf()" class="btn btn-info col-md-6"><h2><strong>Imprimir</strong></h2></div>
                    <div @click="verImpresion = false" class="btn btn-warning col-md-6"><h2><strong>Cancelar</strong></h2></div>
                </div>
            </div>
        </b-modal>
        <b-modal v-model="modal" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered>
            <div class="text-center">
                <div class="alert alert-danger"><h4>Esta seguro de entregar el credito?</h4></div>
                <div class="btn btn-block btn-outline-primary" @click="spiner=true, entregado(credito.producto,credito._id,credito.cantidad,credito.numeroCredito,credito.servicio,credito.cuotaInicial,credito)"><h4>Entregar</h4></div>
            </div>
            <br>
            <div class="btn btn-block btn-outline-info" @click="modal=false"><h4>Cerrar</h4></div>
        </b-modal>
    </div>
</template>

<script>
const f = require ("../../../funciones/funciones.js")

export default {
    middleware: 'auth',
    async asyncData({$axios,app}){
        let logueado = await f.validarUsuario($axios)
        if(logueado.access===false){
            app.$auth.logout()
            app.router.push('/inicioSesion')
        } 
        const aprobados = await $axios.$get('/creditos/aprobados') 
        return {aprobados}       
    },
    data() {
        return {
            spiner:false,
            verCredit: false,
            credito:{
                cliente:{},
                pagares:{
                    pagares:[]
                },
            },
            verImpresion:false,
            impreso:false,
            modal: false,
            mostrar:false,
            creditoAnterior:{},
        }
    },
    methods: {
        async verCredito(credito) {
            console.log(credito)
            if(credito.cuotaInicial===0){
                credito.cuotaInicialEntregada = true
                this.credito = credito
            }else{
                this.credito = credito
            }
            if(credito.OldValores){
                this.verCreditoAnterior(credito.OldValores.id)
            }
            this.verCredit = true
        },
        async verCreditoAnterior(_id){
            this.creditoAnterior =  await this.$axios.$post('/creditos/creditoAnterior',{_id})
            console.log(this.creditoAnterior)
        },
        async pagarCreditoAnterior(valores){
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            valores.pagaresId = this.creditoAnterior.pagares
            valores.fechaIngresoEfectivo =  hoy
            valores.codigoEmpleado = this.$auth.$state.user._id
            console.log(valores)
            const pagarOk = await this.$axios.$post('/creditos/pagarCreditoAnterior',valores)
            console.log(pagarOk)
            if(pagarOk.success){
                this.verCreditoAnterior(valores.id)
            }
        },
        async verDocumento(){
            this.verImpresion = true            
        },
        async impripdf() {
            print({
                printable: 'imprimiendo',
                targetStyles: ['*'],
                type: 'html',
                maxWidth:1200,
                style: '@page { landscape; }',
                ignoreElements:['botones'],
            })
        },
        async marcarInformado(id){
            this.credito.clienteInformado = true
            let informado ={
                id : id
            }
            const informadoOk = await this.$axios.$post("/creditos/marcarInformado", informado)
            if(informadoOk.success){
                alert('se a actualizado')
                this.credito.clienteInformado = true
            }else{
                alert('error en la actualizacion')
            }
        },
        async regresando(){
            this.verCredit = false
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
        async ingresoInicialCredito(idCredito,cuotaInicial,idEmpleadosCreditos){
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            let valores = {
                concepto: 'inicial',
                capital:cuotaInicial,
                descripcion:'cuota inicial',
                idCredito : idCredito,
                codigoEmpleado : this.$auth.$state.user._id,
                fechaIngresoEfectivo:hoy,
                idEmpleadosCreditos
            }
            const ingresoOk = await this.$axios.$post("/contabilidad/guardarIngreso", valores)
            console.log(ingresoOk)
            if (ingresoOk.success) {
                this.spiner = false
                this.credito.cuotaInicialEntregada = true
                alert('se a guardado el ingreso')
            }else{
                alert('a ocurrido un error al guardar el ingreso'+ ingresoOk.data)
            }
        },
        async entregado(producto,id,valor,cn,cs,cuotainicial,credito){
            let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            if(this.impreso==false){
                alert('no se imprimio') 
                return  
            }       
            let entregado ={
                id,
                estadoInterno:'Entregado',
                entregadoPor : this.$auth.$state.user._id,
                fechaEntregado : hoy                   
            }
            const entregadoOk = await this.$axios.$post("/creditos/cambiarEstadoInterno", entregado)
            if(entregadoOk.success){
                this.spiner=false
                this.guardarPrimeraVezTotales(id,valor) 
                this.guardar
                if(producto == null){
                    this.egresoDesembolso(id,valor,cn,cs,cuotainicial)
                }
                this.verCredit = false
            }           
        },
        async guardarPrimeraVezTotales(id,valor){
            const interes = this.credito.valTotalCred - valor
            const datos={
                id,
                numeroC:this.credito.numeroCredito,
                cedula:this.credito.cliente.cedulaIdCliente,
                nombreCliente:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                enMora:false,
                interes,
                capital:valor,
                total : this.credito.valTotalCred
            }
            const guardarPV = await this.$axios.$post('/creditos/guardarEstado',datos)
            console.log(guardarPV)
            if(guardarPV.success){
                this.$nuxt.refresh()
                this.modal = false

            }else{
                alert('error al guardar el estado por primera vez')
            }
        },
        async egresoDesembolso(id,n,cn,cs,cuotainicial){
            let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            console.log(cs)
            let f_o_v = false
            let fre
            if(cs == 'Libre Inversion' || cs == 'pignoracion' || cs == 'Hipoteca' || cs == 'Vacaciones' || cs == 'compraVehiculo'){
                f_o_v = true
                fre = hoy
            } else {
                f_o_v = false
                fre =''
            }
            let egreso = {
                concepto : 'desembolso',
                valor: n,
                descripcion: 'desembolso '+cs,
                codigoEmpleado : this.$auth.$state.user._id,
                idCredito:id,
                cuotaInicial:cuotainicial,
                numCredito:cn,
                fechaEgreso: hoy,   
                egreso : f_o_v ,
                codigoEmpleadoReflejadoEgreso: '',  
                fechaReflejadoEgreso: fre,
                numeroC:cn,
                cedula:this.credito.cedula,
                nombreCliente:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,           
            }
            const egresoOk = await this.$axios.$post("/contabilidad/guardarEgreso", egreso)
            console.log(egresoOk)
            if (egresoOk.success){
                this.spiner=false
            }            
        },
    },
}
</script>

<style>

</style>