<template>
  <div class="col-xl-5">
      <div>
        <div class="text-center bg-secondary text-white">
          <div >
            <h3 class="p-2">Registrar Empleado {{rol}}</h3>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="guardarEmpleado()">
                <b-form-group
                    label="Nombre:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.nombreE" type="text"></b-form-input>
                </b-form-group>
                <b-form-group
                    label="1° apellido:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.primerApellidoE" type="text"></b-form-input>
                </b-form-group>
                <b-form-group
                    label="2° apellido:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.segundoApellidoE" type="text"></b-form-input>
                </b-form-group>
                <b-form-group
                    label="cedula:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.cedulaE" type="number"></b-form-input>
                </b-form-group>                
                <b-form-group
                    label="Telefono:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input  v-model="empleado.celularE" type="number"></b-form-input>    
                </b-form-group>
                <b-form-group
                    label="Email:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.emailE" type="email"></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Rol:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-select v-model="empleado.rol" :options="options" type="text"></b-form-select>
                </b-form-group>
                <b-form-group
                    label="Direccion:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.direccionE" type="text"></b-form-input>
                </b-form-group>  
                <b-form-group
                    label="Fecha nac:"
                    label-cols-sm="3"
                    label-class="font-weight-bold pt-2"
                    label-align-sm="right">
                    <b-form-input v-model="empleado.fechaNacE" type="date"></b-form-input>
                </b-form-group>   
              <div class="form-group">
                <button class="btn btn-success btn-block"><h3>Guardar</h3></button>
              </div>
            </form>
            <div class="form-group">
              <a class="btn btn-danger btn-block"><h3>regresar</h3></a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    middleware: 'auth',
    data(){
        return{
            empleado:{},
            rol:'',
            //al validar el rol cargaremos desde el metodo created o mounted la carga del valor superadmin
            options:['SUPERADMIN','ADMIN','EMPLEADO']
        }
    },
    mounted(){     
    },
    methods:{
        ...mapMutations('storeViewComponentsEmpleados',['estadoActualizarTablaEmpleados']),
        async guardarEmpleado() { 
            if( this.empleado.nombreE == "" || this.empleado.nombreE == undefined 
            || this.empleado.primerApellidoE =="" || this.empleado.primerApellidoE ==undefined 
            || this.empleado.segundoApellidoE =="" || this.empleado.segundoApellidoE ==undefined 
            || this.empleado.cedulaE == "" || this.empleado.cedulaE == undefined
            || this.empleado.emailE =="" || this.empleado.emailE == undefined
            || this.empleado.celularE =="" || this.empleado.celularE ==undefined
            || this.empleado.rol =="" || this.empleado.rol == undefined
            || this.empleado.fechaNacE =="" || this.empleado.fechaNacE == undefined
            || this.empleado.direccionE =="" || this.empleado.direccionE ==undefined){
                alert('todos los campos son obligatorios')
                return
            }else{ 
                let h = new Date()
                let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
                let emple = this.empleado
                emple.fechaAgregado =  hoy
                emple.fechaNacE = this.empleado.fechaNacE
                let res  = await this.$axios.$post("empleados/registro",emple)
                    if(res.status===205){
                        alert('El token a vencido o no existe')
                        this.$auth.logout()
                        this.$router.push("/inicioSesion")
                    }
                    if(res.status===200){
                        this.empleado = {}
                        alert(res.msg)
                        this.estadoActualizarTablaEmpleados(true)
                    }                    
                    if (res.status==202) {
                        let mens = ''
                        for(var property in res.error.keyValue) {
                            mens = res.error.keyValue[property];
                        }
                        alert(res.title +' Este dato ya se encuentra registrado '+ mens)
                    }
                    if(res.status==201){
                        alert(res.msg+' '+res.codigo)
                        this.empleado = {}
                        this.estadoActualizarTablaEmpleados(true)
                    }
                
             }
        },
        masTelefonos(){
            this.telefonos ++
        },      
        menosTelefonos(index){
            this.celularE.splice(index,1)
            this.telefonos -- 
        }   
    }
}
</script>

<style>

</style>