<template>
  <div>
    <br>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="input-group-prepend">
        <label class="input-group-text">Fecha inicio</label>
      </div>
      <input class="form-control mr-sm-2" id="uno" type="date" v-model="fUno">
      <div class="input-group-prepend">
        <label class="input-group-text">Fecha fin</label>
      </div>
      <input class="form-control mr-sm-2" id="dos" type="date" v-model="fDos">
      <button class="btn btn-success" @click="fechas(fUno,fDos)">Buscar</button>
    </nav>
    <br>    
    <div id="tabla">
      <h2 class="p-4 text-center"><strong>Listado de pagos para las fechas establecidas</strong></h2>
      <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
        <thead class="sticky-top text-white bg-dark">
          <tr>
            <th id="num">#</th>
            <th id="servicio">servicio</th>
            <th>Cliente</th>
            <th id="frecuencia">Frecuencia</th>
            <th>Fecha pago</th>
            <th>Valor cuota</th>
            <th id="estado">Estado</th>
            <th>Telefonos</th>
            <th>Direccion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="credito in creditosPagar" :key="credito._id">
            <td id="num">{{credito.numeroCredito}}</td>
            <td id="servicio">{{credito.servicio}}</td>            
            <td >{{credito.nombreCliente}}</td>
            <td id="frecuencia">{{credito.frecuencia}}</td>
            <td>{{verFecha(credito.Fp)}}</td>
            <td>{{credito.valCuotaMens}}</td>
            <td class="bg-danger" v-if="credito.enMora" id="estado">en mora</td>
            <td v-else id="estado">al dia</td>
            <td >{{credito.cliente.celularUnoCliente}}</td>
            <td >{{credito.cliente.direccionCliente}}</td>
          </tr>
        </tbody>
      </table>
    </div>
      <button class="btn btn-block bg-primary" id="imprimir" @click="impripdf()" v-if="creditosPagar.length>0 "><h4><strong>Imprimir</strong></h4></button>
  </div>
</template>

<script>
export default {
    data(){
      return{
        fUno:'',
        fDos:'',
        creditosPagar:{},
        clientes: {},
      }
    },
    created(){
    },
    
    methods:{
      async fechas(funo,fdos){
        let valores = {
          funo: new Date(funo),
          fdos: new Date(fdos),
        }
        this.creditosPagar = await this.$axios.$post('/creditos/creditosApagar',valores)
        console.log(this.creditosPagar)              
      },
      verFecha(fecha){
          var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
          let fech = new Date (fecha)
          const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
          return y         
      },
      impripdf() {
        print()   
      }
    }    
}
</script>
<style>
  @media print {
    @page {
      size: landscape
    }
    #imprimir {
      display:none;
    }
    #num {
      display:none;
    }
    #estado {
      display:none;
    }
    #barra {
      display:none;
    }
    #titulo {
      display:none;
    }
  }
</style>