<template>
  <div>
    <div class="p-4 border border-warning">
        <h4 class="p-3 text-center"><strong>Cuadro contable</strong></h4>
      <br>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="input-group-prepend">
          <label class="input-group-text">Fecha inicio</label>
        </div>
        <input class="form-control mr-sm-2" id="uno" type="date" v-model="fechas.fUno">
        <div class="input-group-prepend">
          <label class="input-group-text">Fecha fin</label>
        </div>
        <input class="form-control mr-sm-2" id="dos" type="date" v-model="fechas.fDos">
        <button class="btn btn-success" @click="busqueda()">Buscar</button>
      </nav>  
      <br>
      <div v-if="ver" class="mb-3 btn btn-block btn-outline-warning" @click="ver=false"><h2><strong>Cerrar cuadro contable</strong></h2></div>
      <div v-if="totalIngCapital>0 && !ver" class="mb-3 btn btn-block btn-outline-warning" @click="ver=true"><h2><strong>Ver cuadro contable</strong></h2></div>
        <div v-if="ver">
          <div class="text-center">
            <h2 class="bg-primary text-center text-white"><strong>INGRESOS</strong></h2>
            <div class="p-2">
              <h4><strong>ingresos por capital</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Concepto</th>
                      <th>Capital</th>                    
                      <th>Interes</th>                    
                      <th>Total</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreCapital,index) in ingCapital" :key="index">
                      <td>{{verFecha(ingreCapital.fechaIngresoEfectivo)}}</td>
                      <td>{{ingreCapital.concepto}}</td>
                      <td v-if="ingreCapital.capital>0">{{new Intl.NumberFormat('es-CO').format(ingreCapital.capital)}}</td>
                      <td v-else>0</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreCapital.interes)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreCapital.capital + ingreCapital.interes)}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL</strong></h2>                  
                    <h2><strong>A capital : $ {{new Intl.NumberFormat('es-CO').format(totalIngCapital)}}</strong></h2>
                    <h2><strong>A interes : $ {{new Intl.NumberFormat('es-CO').format(totalIngInteres)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por intereses a la mora</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>fecha</th>
                      <th>valor</th>                    
                      <th>Cliente</th>                    
                      <th># Credito</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreIntereses,index) in ingIntMora" :key="index">
                      <td>{{verFecha(ingreIntereses.fechaIngresoEfectivo)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreIntereses.interes)}}</td>
                      <td>{{ingreIntereses.nombre}}</td>
                      <td>{{ingreIntereses.numeroCredito}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalInteresMora)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por ventas en efectivo</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreVentE,index) in ingVentEfectivo" :key="index">
                      <td>{{ingreVentE.descripcion}}</td>
                      <td>{{verFecha(ingreVentE.fechaIngresoEfectivo)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreVentE.capital)}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalVentasEfectivo)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por inversion</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreInverion,index) in ingInversion" :key="index">
                      <td>{{ingreInverion.descripcion}}</td>
                      <td>{{verFecha(ingreInverion.fechaIngresoEfectivo)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreInverion.capital)}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalInversion)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por inicial</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>
                      <th>Decripcion</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreInicial,index) in ingInicial" :key="index">
                      <td>{{verFecha(ingreInicial.fechaIngresoEfectivo)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreInicial.capital)}}</td>
                      <td>{{ingreInicial.descripcion}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalInicial)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por comision</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th> 
                      <th>Cliente</th>                   
                      <th># Credito</th>                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreComision,index) in ingComision" :key="index">
                      <td>{{verFecha(ingreComision.fechaIngresoEfectivo)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreComision.capital)}}</td>
                      <td>{{ingreComision.nombre}}</td>
                      <td>{{ingreComision.numeroCredito}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalComision)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4><strong>ingresos por Papeleria</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Concepto</th>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ingreInverion,index) in ingPapeleria" :key="index">
                      <td>{{ingreInverion.concepto}}</td>
                      <td>{{ingreInverion.descripcion}}</td>
                      <td>{{verFecha(ingreInverion.fechaIngresoEfectivo)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(ingreInverion.capital)}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalPapeleria)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <h2 class="bg-info text-center text-white"><strong>EGRESOS</strong></h2>
            <div class="p-2">
              <h4 class="bg-primary text-white"><strong>Egresos pagos soats, tecnomecanicas y licencias</strong></h4>
                <h4><strong>Egresos por desembolsos</strong></h4>
                <div class="row">
                <table class="table table hover table-sm col-sm-8">
                    <thead>
                        <tr>
                            <th>#Credito</th>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Cliente</th>
                            <th>Valor</th>                    
                            <th>Inicial</th>                    
                            <th>total</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(egresos,index) in egresosDesembolsos" :key="index">
                            <td>{{egresos.numCredito}}</td>
                            <td>{{verFecha(egresos.fechaReflejadoEgreso)}}</td>
                            <td>{{egresos.descripcion}}</td>
                            <td>{{egresos.nombreCliente}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(egresos.valor)}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(egresos.cuotaInicial)}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(egresos.valor + egresos.cuotaInicial)}}</td>
                        </tr>
                    </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalEgresosDesembolsos)}}</strong></h2>
                    <div>
                      <h3><strong>Soats : $ {{new Intl.NumberFormat('es-CO').format(totalEgresosSOAT)}}</strong></h3>
                      <h3><strong>Tecnomecanica : $ {{new Intl.NumberFormat('es-CO').format(totalEgresosTEC)}}</strong></h3>
                      <h3><strong>Licencias : $ {{new Intl.NumberFormat('es-CO').format(totalEgresosLIC)}}</strong></h3>
                      <h3><strong>Soats - tecnomecanica: $ {{new Intl.NumberFormat('es-CO').format(totalEgresosST)}}</strong></h3>
                      <h3><strong>Libre Inversion : $ {{new Intl.NumberFormat('es-CO').format(totalEgresosLI)}}</strong></h3>
                      <h3><strong>Pignoracion : $ {{new Intl.NumberFormat('es-CO').format(totalEgresosPIG)}}</strong></h3>
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="p-2">
              <h4 class="bg-primary text-white"><strong>Egresos por funcionamiento</strong></h4>
              <div class="row">
                <table class="table table hover table-sm col-sm-8">
                  <thead>
                    <tr>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Valor</th>                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(eFuncionamiento,index) in EgresoFuncionamiento" :key="index">
                      <td>{{eFuncionamiento.descripcion}}</td>
                      <td>{{verFecha(eFuncionamiento.fechaEgreso)}}</td>
                      <td>{{new Intl.NumberFormat('es-CO').format(eFuncionamiento.valor)}}</td>
                    </tr>
                  </tbody>                
                </table>
                <div class="col-sm-4">
                  <div class="container bg-primary text-white">
                    <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalFuncionamiento)}}</strong></h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
                <h4 class="bg-primary text-white"><strong>Egresos Nominas</strong></h4>
                <div class="row">
                    <div class="col-sm-8">
                        <h4><strong>egresos por nomina</strong></h4>
                        <table class="table table hover table-sm ">
                        <thead>
                            <tr>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Valor</th>                    
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(eNomina,index) in EgresoNomina" :key="index">
                            <td>{{eNomina.descripcion}}</td>
                            <td>{{verFecha(eNomina.fechaEgreso)}}</td>
                            <td>{{new Intl.NumberFormat('es-CO').format(eNomina.valor)}}</td>
                            </tr>
                        </tbody>                
                        </table>
                        <h4><strong>egresos por avance</strong></h4>
                        <table class="table table hover table-sm ">
                            <thead>
                                <tr>
                                <th>Descripcion</th>
                                <th>Fecha</th>
                                <th>Valor</th>                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(eAvance,index) in EgresoAvance" :key="index">
                                <td>{{eAvance.descripcion}}</td>
                                <td>{{verFecha(eAvance.fechaEgreso)}}</td>
                                <td>{{new Intl.NumberFormat('es-CO').format(eAvance.valor)}}</td>
                                </tr>
                            </tbody>                
                        </table>
                    </div>
                    <div class="col-sm-4">
                        <div class="container bg-primary text-white">
                            <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalAvance + totalNomina)}}</strong></h2>
                            <h3><strong>Nomina : $ {{new Intl.NumberFormat('es-CO').format(totalNomina)}}</strong></h3>
                            <h3><strong>Avances : $ {{new Intl.NumberFormat('es-CO').format(totalAvance)}}</strong></h3>
                        </div>
                    </div>                    
                </div>
            </div>  
            <div class="p-2">          
                <h4 class="bg-primary text-white"><strong>Egresos por Compras</strong></h4>
                <div class="row">
                    <table class="table table hover table-sm col-sm-8">
                    <thead>
                        <tr>
                        <th>Descripcion</th>
                        <th>Fecha</th>
                        <th>Valor</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(eCompras,index) in EgresoCompras" :key="index">
                        <td>{{eCompras.descripcion}}</td>
                        <td>{{verFecha(eCompras.fechaEgreso)}}</td>
                        <td>{{new Intl.NumberFormat('es-CO').format(eCompras.valor)}}</td>
                        </tr>
                    </tbody>                
                    </table>
                    <div class="col-sm-4">
                    <div class="container bg-primary text-white">
                        <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalCompras)}}</strong></h2>
                    </div>
                    <h2><strong></strong></h2>
                    </div>
                </div>
            </div>
            <div class="p-2">          
                <h4 class="bg-primary text-white"><strong>Egresos por Papeleria</strong></h4>
                <div class="row">
                    <table class="table table hover table-sm col-sm-8">
                    <thead>
                        <tr>
                        <th>Descripcion</th>
                        <th>Fecha</th>
                        <th>Valor</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(eCompras,index) in EgresoPapeleria" :key="index">
                        <td>{{eCompras.descripcion}}</td>
                        <td>{{verFecha(eCompras.fechaEgreso)}}</td>
                        <td>{{new Intl.NumberFormat('es-CO').format(eCompras.valor)}}</td>
                        </tr>
                    </tbody>                
                    </table>
                    <div class="col-sm-4">
                    <div class="container bg-primary text-white">
                        <h2 ><strong>TOTAL : $ {{new Intl.NumberFormat('es-CO').format(totalComprasPapeleria)}}</strong></h2>
                    </div>
                    <h2><strong></strong></h2>
                    </div>
                </div>
            </div>
          </div>
        <div v-if="ver" class="mb-3 btn btn-block btn-outline-warning" @click="ver=false"><h2><strong>Cerrar cuadro contable</strong></h2></div>
        </div>
    </div>    
  </div>
</template>

<script>
export default {
    data(){
      return{
        fechas:{
          fUno:'',
          fDos:'',
        },
        ingCapital:[],
        totalIngCapital:0,
        ingInteres:[],
        totalIngInteres:0,
        ingVentEfectivo:[],
        totalVentasEfectivo:0,
        ingInversion:[],
        totalInversion:0,
        ingComision:[],
        totalComision:0,
        ingInicial:[],
        totalInicial:0,
        ingresos:[],
        egresos:[],
        egresosDesembolsos:[],
        totalEgresosDesembolsos:0,                
        EgresoCompras:[],
        totalCompras:0,
        EgresoFuncionamiento:[],
        totalFuncionamiento:0,
        EgresoAvance:[],
        totalAvance:0,
        EgresoNomina:[],
        totalNomina:0,
        totalInteresMora:0,
        ingIntMora:[],
        totalEgresosSOAT:0,
        totalEgresosTEC:0,
        totalEgresosLIC:0,
        totalEgresosST:0,
        totalEgresosLI:0,
        totalEgresosPIG:0,
        totalEgresosPROD:0,
        ver:false,
        EgresoPapeleria:[],
        totalComprasPapeleria:0,
        ingPapeleria:[],
        totalPapeleria:0,
      }
    },
    created() {
      //this.verIngresos();
      //this.verEgresos();
    },
    methods:{
        async verIngresos(){
            await this.$axios.$get('/contabilidad/verIngresos')
            .then(res=>{
            this.ingresos = res.data
            })
            .catch(err=>{
            console.log(err)
            })
        },
        async verEgresos(){
            await this.$axios.$get('/contabilidad/verEgresos')
            .then(res=>{
            this.Egresos = res.data
            })
            .catch(err=>{
            console.log(err)
            })
        },
        /* actualizarIngresos(){
            for(let a=6001; a<= 6978;a++){
            let fecha = new Date(this.ingresos[a].fechaIngresoEfectivo)
            let id = this.ingresos[a]._id
            this.cambiar(fecha,id)
            }
        }, */
        async cambiar(fecha,id){
            this.a = this.a ++
            let datos = {
            fecha,
            id
            }
            await this.$axios.$post('/contabilidad/cambiarFechaIngreso',datos)
            .then(res=>{console.log(res.data.mensaje,'  ', res.status)})
            .catch(err=>{console.log(err.response)})
            
        },
        /* actualizarEgresos(){
            for(let a=0; a<= this.Egresos.length-1;a++){
            if(this.Egresos[a].concepto == 'nomina'||this.Egresos[a].concepto == 'avance'||this.Egresos[a].concepto == 'compras'||this.Egresos[a].concepto == 'funcionamiento' ||this.Egresos[a].descripcion == 'desembolso Libre Inversion'||this.Egresos[a].descripcion == 'desembolso pignoracion'){
            let fecha = new Date(this.Egresos[a].fechaEgreso)
            let id = this.Egresos[a]._id
            this.cambiar2(fecha,id)
            }else{
            let fecha = new Date(this.Egresos[a].fechaReflejadoEgreso)
            let id = this.Egresos[a]._id
            this.cambiar2(fecha,id)
            }
            }
        }, */
        async cambiar2(fecha,id){
            this.a = this.a ++
            let datos = {
            fecha,
            id
            }
            await this.$axios.$post('/contabilidad/cambiarFechaEgreso',datos)
            .then(res=>{console.log(res.data.mensaje,'  ', res.status)})
            .catch(err=>{console.log(err.response)})
            
        },
        busqueda(){
            this.ver=true
            console.log(this.fechas)
            let valores = this.fechas;
            this.ingresoCapital(valores);
            this.ingresoVentasEfectivo(valores);
            this.ingresoInversion(valores);                   
            this.ingresoComision(valores);                   
            this.ingresoIntMora(valores);                   
            this.ingresoInicial(valores); 
            this.ingresoPapeleria(valores)  
            //-------------------
            this.egresoDesembolsos(valores)      
            this.egresoCompras(valores)
            this.egresoFuncionamiento(valores)
            this.egresoAvance(valores)
            this.egresoNomina(valores)
            this.egresoPapeleria(valores)

        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
        async ingresoCapital(valores){
            this.totalIngCapital= 0
            this.totalIngInteres = 0
            this.ingCapital = await this.$axios.$post('/creditos/ingCapFechas',valores)
            for(let a = 0; a<this.ingCapital.length;a++){
                this.totalIngCapital = this.totalIngCapital + this.ingCapital[a].capital
                this.totalIngInteres = this.totalIngInteres + this.ingCapital[a].interes
            }
        },
        async ingresoVentasEfectivo(valores){
            this.totalVentasEfectivo = 0
            this.ingVentEfectivo =  await this.$axios.$post('/creditos/ingVenEfecFechas',valores) 
            for(let a = 0; a<this.ingVentEfectivo.length;a++){
                this.totalVentasEfectivo = this.totalVentasEfectivo + this.ingVentEfectivo[a].capital
            }     
        },
        async ingresoIntMora(valores){
            this.totalInteresMora= 0
            this.ingIntMora =  await this.$axios.$post('/creditos/ingIntMora',valores)
            for(let a = 0; a<this.ingIntMora.length;a++){
                this.totalInteresMora = this.totalInteresMora + this.ingIntMora[a].interes
            }     
        },
        async ingresoInversion(valores){
            this.totalInversion = 0
            this.ingInversion =  await this.$axios.$post('/creditos/ingInverFechas',valores) 
            for(let a = 0; a<this.ingInversion.length;a++){
                this.totalInversion = this.totalInversion + this.ingInversion[a].capital
            }       
        },
        async ingresoComision(valores){
            this.totalComision = 0
            this.ingComision =  await this.$axios.$post('/creditos/ingComision',valores)
            for(let a = 0; a<this.ingComision.length;a++){
                this.totalComision = this.totalComision + this.ingComision[a].capital
            } 
        },
        async ingresoPapeleria(valores){
            this.totalPapeleria = 0
            this.ingPapeleria =  await this.$axios.$post('/creditos/ingPapeleria',valores)
            for(let a = 0; a<this.ingPapeleria.length;a++){
                this.totalPapeleria = this.totalPapeleria + this.ingPapeleria[a].capital
            } 
        },
        async ingresoInicial(valores){
            this.totalInicial = 0
            this.ingInicial = await this.$axios.$post('/creditos/ingInicial',valores)
            for(let a = 0; a<this.ingInicial.length;a++){
                this.totalInicial= this.totalInicial+ this.ingInicial[a].capital
            }
        },
        async egresoDesembolsos(valores){
            this.totalEgresosSOAT=0
            this.totalEgresosTEC=0
            this.totalEgresosLIC=0
            this.totalEgresosST=0
            this.totalEgresosLI=0
            this.totalEgresosPIG=0
            this.totalEgresosDesembolsos = 0
            this.egresosDesembolsos = await this.$axios.$post('/creditos/egresosDesembolsos',valores)
            for(let a = 0; a<this.egresosDesembolsos.length;a++){
                this.totalEgresosDesembolsos = this.totalEgresosDesembolsos + this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                if(this.egresosDesembolsos[a].descripcion == 'desembolso Soat'){
                    this.totalEgresosSOAT=this.totalEgresosSOAT+this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                }
                if(this.egresosDesembolsos[a].descripcion == 'desembolso Tecnomecanica'){
                    this.totalEgresosTEC=this.totalEgresosTEC+this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                }
                if(this.egresosDesembolsos[a].descripcion == 'desembolso Licencia'){
                    this.totalEgresosLIC=this.totalEgresosLIC+this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                }
                if(this.egresosDesembolsos[a].descripcion == 'desembolso Soat-Tecnomecanica'){
                    this.totalEgresosST=this.totalEgresosST+this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                }
                if(this.egresosDesembolsos[a].descripcion == 'desembolso Libre Inversion'){
                    this.totalEgresosLI=this.totalEgresosLI+this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                }
                if(this.egresosDesembolsos[a].descripcion == 'desembolso pignoracion'){
                    this.totalEgresosPIG=this.totalEgresosPIG+this.egresosDesembolsos[a].valor+this.egresosDesembolsos[a].cuotaInicial
                }
            }
        },    
        async egresoCompras(valores){
            this.totalCompras = 0
            this.EgresoCompras = await this.$axios.$post('/creditos/egresoCompras',valores)
            for(let a = 0; a<this.EgresoCompras.length;a++){
                this.totalCompras= this.totalCompras+ this.EgresoCompras[a].valor
            }
        },
        async egresoPapeleria(valores){
            this.totalComprasPapeleria = 0
            this.EgresoPapeleria = await this.$axios.$post('/creditos/egresoComprasPapeleria',valores)
            for(let a = 0; a<this.EgresoPapeleria.length;a++){
                this.totalComprasPapeleria= this.totalComprasPapeleria+ this.EgresoPapeleria[a].valor
            }
        },
        async egresoFuncionamiento(valores){
            this.totalFuncionamiento = 0
            this.EgresoFuncionamiento = await this.$axios.$post('/creditos/egresoFuncionamiento',valores)
            for(let a = 0; a<this.EgresoFuncionamiento.length;a++){
                this.totalFuncionamiento = this.totalFuncionamiento+ this.EgresoFuncionamiento[a].valor
            }
        },
        async egresoAvance(valores){
            this.totalAvance = 0
            this.EgresoAvance = await this.$axios.$post('/creditos/egresoAvance',valores)        
            for(let a = 0; a<this.EgresoAvance.length;a++){
                this.totalAvance= this.totalAvance+ this.EgresoAvance[a].valor
            }
        },
        async egresoNomina(valores){
            this.totalNomina = 0
            this.EgresoNomina = await this.$axios.$post('/creditos/egresoNomina',valores)
            for(let a = 0; a<this.EgresoNomina.length;a++){
                this.totalNomina= this.totalNomina+ this.EgresoNomina[a].valor
            }
        },
    }
}
</script>

<style>

</style>