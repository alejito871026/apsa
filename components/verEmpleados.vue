<template>
    <div class="verEmpleados col-xl-7">
        <div v-if="!empleado">
            <h2 class="text-center p-4"> No existen Empleados registrados<br><strong>Registra el primero</strong></h2>
        </div>
        <div v-if="empleado" style="height: auto; max-height: 850px; overflow-y: scroll;">         
            <table class="table table-hover border table-sm  bg-white text-dark">
            <thead class="text-white bg-dark">
                <tr>
                <th># Cedula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Cel 1</th>
                <th>Fecha agregado</th>
                <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="persona in empleados" :key="persona._id">
                <td>{{persona.cedulaE}}</td>
                <td>{{persona.nombreE}}</td>
                <td>{{persona.primerApellidoE}} {{persona.segundoApellidoE}}</td>
                <td>{{persona.celularE}}</td>
                <td>{{persona.fechaAgregado}}</td>
                <button class="btn btn-primary btn-sm" @click="verEmpleadoUnico(persona.cedulaE)">ver empleado</button>
                </tr>
            </tbody>
            </table>     
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
    data(){
        return{
            empleado:false,
            empleados:[]
        }
    },
    computed:{
        ...mapState('storeViewComponentsEmpleados',['actualizarTablaEmpleados'])
    },
    watch: {
        actualizarTablaEmpleados() {
            if(this.actualizarTablaEmpleados==true){
                this.cargarEmpleados()
            }
        },
    },
    mounted(){
        this.cargarEmpleados()
    },
    methods: {
        ...mapMutations('storeViewComponentsEmpleados',['estadoActualizarTablaEmpleados']),
        async cargarEmpleados(){
            const res = await this.$axios.post('/empleados/cargarEmpleados')
            console.log(res)
            if(res.data.length<=0){
                empleados=false
            }else {
                if(res.status===200){
                    this.empleado  = true
                    this.empleados = res.data
                    this.estadoActualizarTablaEmpleados(false)
                } 
            }
        },
        //faltan las funciones para que el administrador edite o cambie de estado a los empleados
    }
}
</script>

<style>

</style>