<template>
  <div>
    <div class="row col-lg-12">
      <b-dropdown id="dropdown-1" text="Realizar Ingreso" variant="primary"  class="col-lg-6">
        <b-dropdown-item @click="abrirIngreso()">Ingreso Efectivo</b-dropdown-item>
        <b-dropdown-item @click="abrirIngresoADS()">Ingreso Dinero creditos ADS</b-dropdown-item>
      </b-dropdown>
      <b-dropdown id="dropdown-1" text="Egreso Efectivo" variant="primary" class="col-lg-6" >
        <b-dropdown-item @click="abrirEgreso()">Egreso Efectivo</b-dropdown-item>
      </b-dropdown>
    </div>
    <br />
    <div v-if="ingreso" class="col-md-12 row">
      <div  class="col-md-12 row">
        <div class="col-md-4"></div>
          <div class="card col-md-4">
            <div class="card-header bg-white">
              <h1 class="text-center">ingreso de efectivo al sistema</h1>
            </div>
               
              <div class="card-body justify-content-center">
                <select class="form-control col-md-12" v-model="ingresoEfectivo.concepto">
                  <option v-for="option in options" :key="option" >{{option}}</option>
                </select>
                <h3 class="text-center p-4">Valor a ingresar $</h3>           
                <input type="number" min="0" class="form-control col-md-12" required v-model="ingresoEfectivo.valor">            
                <h3 class="text-centerc p-4">Descripcion del ingreso</h3>            
                <textarea class="col-md-12 form-control" rows="4" required v-model="ingresoEfectivo.descripcion"></textarea>
            </div>
            <div class="card-footer bg-white">
              <div class="btn-group mb-3 col-lg-12">
                <div class="btn btn-warning" @click="guardarIngresoEfectivo(ingresoEfectivo.concepto,ingresoEfectivo)">Guardar Ingreso</div>
                <div class="btn btn-danger" @click="cerrarIngreso()">Volver</div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
      </div>
    </div>
    <div v-if="ingresoDineroCreditos" class="col-md-12 row">
      <div  class="col-md-12 row">
        <div class="col-md-4"></div>
          <div class="card col-md-4">
            <div class="card-header bg-white">
              <h1 class="text-center">ingreso de efectivo al sistema</h1>
            </div>
              <div class="card-body justify-content-center">
                <h3 class="text-center p-4">Valor capital $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="ingresoEfectivo.valor">   
                <h3 class="text-center p-4">Valor interes $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="ingresoEfectivo.interes">          
                <h3 class="text-centerc p-4">Descripcion del ingreso</h3>            
                <textarea class="col-md-12" rows="4" required v-model="ingresoEfectivo.descripcion"></textarea>
            </div>
            <div class="card-footer bg-white">
              <div class="btn-group mb-3 col-lg-12">
                <div class="btn btn-warning" @click="guardarIngresoEfectivo('dineroCreditoADS',ingresoEfectivo)">Guardar Ingreso</div>
                <div class="btn btn-danger" @click="cerrarIngresoADS()">Volver</div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
      </div>
    </div>
    <div v-if="egreso" class="col-md-12 row">
      <div  class="col-md-12 row">
        <div class="col-md-4"></div>
          <div class="card col-md-4">
            <div class="card-header bg-white">
              <h1 class="text-center">Egreso de efectivo </h1>
            </div>
              <div class="card-body justify-content-center">
                 <h3 class="text-center p-4">Concepto</h3>
                <select name="" id="" class="custom-select" required v-model="egresoEfectivo.concepto">
                  <option value="compras">Compras</option>
                  <option value="funcionamiento">Funcionamiento</option>
                  <option value="nomina">Nomina</option>
                  <option value="avance">Avance</option>
                  <option value="Papeleria">Papeleria</option>
                </select>
                <h3 class="text-center p-4">Valor $</h3>           
                <input type="number" min="0" class="col-md-12" required v-model="egresoEfectivo.valor">            
                <h3 class="text-centerc p-4">Descripcion del egreso</h3>            
                <textarea class="col-md-12" rows="4" required v-model="egresoEfectivo.descripcion"></textarea>
            </div>
            <div class="card-footer bg-white">
              <div class="btn-group mb-3 col-lg-12">
                <div class="btn btn-warning" @click="spiner=true, guardarEgresoEfectivo(egresoEfectivo)">Guardar Egreso</div>
                <div class="btn btn-danger" @click="cerrarEgreso()">Volver</div>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
      </div>
    </div>
    <b-modal v-model="spiner" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered sm>
            <div class="text-center mx-auto btn btn-block btn-outline-primary">    
                <div class="align-items-center text-center mx-auto ">
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                    <b-spinner  type="grow" variant="primary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                </div>
                <div class="align-items-center text-center mx-auto ">                    
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                    <b-spinner  type="grow" variant="primary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>                    
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                </div>
                <h4>Porfavor espere!!</h4>
            </div>
        </b-modal>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      ingreso:false,
      egreso:false,
      ingresoDineroCreditos:false,
      ingresoEfectivo:{
        valor:0,
        interes:0,
        descripcion: new String(),
      },
      egresoEfectivo:{
        concepto: new String(),
        valor:0,
        descripcion: new String(),
      },
      spiner:false,
      options:['Carpeta','Fotocopias','Comision','Documentacion','otros']
    }
  },
  methods : {
    ...mapActions('storeContabilidad',['cargarValoresCapital','cargarValoresInteres','cargarValoresEgresos']),
    abrirEgreso(){
      this.ingreso = false
      this.ingresoDineroCreditos = false
      this.egreso = true
      this.egresoEfectivo = {
        concepto:'',
        valor:0,
        descripcion:'',
      }
      this.ingresoEfectivo={
        valor:0,
        interes:0,
        descripcion: '',
      }
    },
    abrirIngreso(){
      this.ingreso = true
      this.ingresoDineroCreditos = false
      this.egreso = false
      this.egresoEfectivo = {
        concepto:'',
        valor:0,
        descripcion:'',
      }
      this.ingresoEfectivo={
        valor:0,
        interes:0,
        descripcion: '',
      }
    },
    abrirIngresoADS(){
      this.ingreso = false
      this.ingresoDineroCreditos = true
      this.egreso = false
      this.egresoEfectivo = {
        concepto:'',
        valor:0,
        descripcion:'',
      }
      this.ingresoEfectivo={
        valor:0,
        interes:0,
        descripcion: '',
      }
    },
    cerrarEgreso(){
      this.egreso = false
      this.egresoEfectivo = {
        concepto:'',
        valor:0,
        descripcion:'',
      }
    },
    cerrarIngreso(){
      this.ingreso = false
      this.ingresoEfectivo={
        valor:0,
        interes:0,
        descripcion: '',
      }
    },
    cerrarIngresoADS(){
      this.ingresoDineroCreditos = false
      this.ingresoEfectivo={
        valor:0,
        interes:0,
        descripcion: '',
      }
    },
    async guardarEgresoEfectivo(egreso){
      this.spiner = true
      let h = new Date()
      let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
      let data = {
        concepto:egreso.concepto,
        valor:parseInt(egreso.valor),
        descripcion:egreso.descripcion,
        codigoEmpleado:this.$auth.$state.user._id,
        fechaEgreso:hoy,
        egreso:true,
      }
      const egresoOk = await this.$axios.$post('/contabilidad/guardarEgreso',data)
      if(egresoOk.success) {
        this.egreso = false
        this.egresoEfectivo={
          concepto: new String(),
          valor:0,
          descripcion: new String(),
        }
        this.egreso = false
        this.cargarValoresCapital()
        this.cargarValoresInteres()
        this.cargarValoresEgresos()
        this.spiner = false
      }
    },
    async guardarIngresoEfectivo(a,ingreso){
      console.log(ingreso)
      this.spiner = true
      let h = new Date()
      let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
      let data = {
        concepto:a,
        capital:parseInt(ingreso.valor),
        interes:parseInt(ingreso.interes),
        descripcion:ingreso.descripcion,
        codigoEmpleado:this.$auth.$state.user._id,
        fechaIngresoEfectivo:hoy,
      }
      const ingresoOk = await this.$axios.$post('/contabilidad/guardarIngreso',data)
      if(ingresoOk.success) {
        if(a==='otros'){
          this.ingreso = false
        }else{
          this.ingresoDineroCreditos = false
        }
        this.ingresoEfectivo={
          valor:0,
          interes:0,
          descripcion: new String(),
        }
        this.ingreso =false
        this.cargarValoresCapital()
        this.cargarValoresInteres()
        this.cargarValoresEgresos()
        this.spiner = false
      }
    },
  }
}
</script>

<style>

</style>