<template>
<b-modal v-model="modalCalculadora" hide-header no-close-on-backdrop no-close-on-esc hide-footer centered >
    <div class="card">
        <div class="card-header bg-info">
          <h2 class="text-center text-white">
            <strong>Calculadora rapida</strong>
          </h2>
        </div>
        <div class="card-body">
          <b-input-group>
            <b-input-group-prepend>
              <h2 class="btn btn-outline-primary">Cantidad solicitada:</h2>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              class="border-primary"
              v-model="cantidadS"
              v-money="money"
              @keyup.delete="cambiandoItems()"
            ></b-form-input>
          </b-input-group>
          <b-input-group>
            <b-input-group-prepend>
              <h2 class="btn btn-outline-primary">Interes:</h2>
            </b-input-group-prepend>
            <b-form-input
              type="number"
              min="3"
              max="15"
              step="0.01"
              class="border-primary"
              @keyup.delete="cambiandoItems()"
              v-model="interesS"
            ></b-form-input>
          </b-input-group>
          <b-input-group>
            <b-input-group-prepend>
              <h2 class="btn btn-outline-primary">Tiempo en meses:</h2>
            </b-input-group-prepend>
            <b-form-input
              type="number"
              min="0"
              class="border-primary"
              @keyup.delete="cambiandoItems()"
              v-model="tiempoS"
            ></b-form-input>
          </b-input-group>
          <b-input-group>
            <b-input-group-prepend>
              <h2 class="btn btn-outline-primary">Frecuencia de Pago:</h2>
            </b-input-group-prepend>
            <select
              class="form-control border-primary"
              v-model="frecuenciaS"
              @change="cambiandoItems()"
            >
              <option value="vacio"></option>
              <option value="mensual">Mensual</option>
              <option value="quincenal">Quincenal</option>
              <option value="semanal">Semanal</option>
              <option value="diario">Diario</option>
              <option value="pagoUnico">Unico pago</option>
            </select>
          </b-input-group>
          <div class="mostrarCalculo" v-if="mostrarCalculo">
            <h2 class="text-center">Valores calculados</h2>
            <b-input-group>
              <b-input-group-prepend>
                <h2 class="btn btn-outline-primary">Interes mensual:</h2>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                class="border-primary"
                disabled
                v-money="money"
                v-model="respuesta.interesMensual"                
              ></b-form-input>
            </b-input-group>
            <b-input-group>
              <b-input-group-prepend>
                <h2 class="btn btn-outline-primary">Total credito:</h2>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                class="border-primary"
                disabled
                v-money="money"
                v-model="respuesta.totalCredito"                
              ></b-form-input>
            </b-input-group>
            <b-input-group>
              <b-input-group-prepend>
                <h2 class="btn btn-outline-primary">Cantidad cuotas:</h2>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                class="border-primary"
                disabled
                v-model="respuesta.cantidadCuotas"
              ></b-form-input>
            </b-input-group>
            <b-input-group>
              <b-input-group-prepend>
                <h2 class="btn btn-outline-primary">Valor cuota:</h2>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                class="border-primary"
                disabled
                v-money="money"
                v-model="respuesta.valorCuota"                
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="card-footer bg-info border">
        <button
          class="btn btn-info btn-block"
          @click="calcular(cantidadS,interesS,tiempoS,frecuenciaS)"
        >
          <h2>
            <strong>calcular</strong>
          </h2>
        </button>
      </div>
      <div class="card-footer bg-warning border">
        <button class="btn btn-warning btn-block" @click="cerrarModal()">
          <h2>
            <strong>cerrar</strong>
          </h2>
        </button>
      </div>
     
</b-modal>     
</template>
<script>
class moneey {
  constructor() {
    this.thousands = ".";
    this.precision = 0;
    this.masked = false;
  }
}
import {mapState, mapMutations} from "vuex"
import ff from "../funciones/functionsValid.js";
export default {
    name:'calcuCreditos',
    data(){
        return {
            money: new moneey(),
            cantidadS: "",
            interesS: 0,
            tiempoS: 0,
            frecuenciaS: "",
            mostrarCalculo: false,
            respuesta: {}
        }
    },
    computed:{
        ...mapState('Autenticacion',['modalCalculadora'])
    }, 
    methods: { 
        ...mapMutations('Autenticacion',['estadoCalculadora']),
        cerrarModal(){
            this.estadoCalculadora(false)
        },
        calcular(cantidad, interes, tiempo, frecuencia) {
        this.respuesta = {};
        cantidad = this.quitarPuntos(cantidad);
        var intereses = ff.calcularInteresMensual(cantidad, interes);
        var totalC = ff.totalCredito(tiempo, cantidad, intereses);
        var diaInicio = new Date().getDate();
        var mes = new Date().getMonth();
        var ano = new Date().getFullYear();
        var pagaresCuotas = ff.pagares(
            diaInicio,
            tiempo,
            frecuencia,
            totalC,
            mes,
            0,
            interes,
            cantidad,
            mes
        );
            this.mostrarCalculo = true;
            this.respuesta.interesMensual = intereses;
            this.respuesta.totalCredito = totalC;
            this.respuesta.cantidadCuotas = pagaresCuotas.totalPagos;
            this.respuesta.valorCuota = pagaresCuotas.valCuotas;
        },
        quitarPuntos(x) {
        let valer = "";
        let val = x;
        for (let n = 0; n <= val.length - 1; n++) {
            if (val[n] == ".") {
                n++;
            }
            valer = valer + val[n];
        }
        return valer;
        },
        cambiandoItems() {
            this.mostrarCalculo = false;
            this.respuesta = {};
        }
    },
}
</script>

<style>

</style>