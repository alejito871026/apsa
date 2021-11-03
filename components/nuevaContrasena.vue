<template>
    <div>
        <div class="card">
            <div class="card-header bg-primary text-center">
                <h2>señor {{$auth.$state.user.nombreE}} {{$auth.$state.user.primearApellidoE}} {{$auth.$state.user.segundoApellidoE}}
                    aca editaras la contraseña</h2>
            </div>
            <div class="card-body text-center">
                <form @submit.prevent="nuevaContrasena()">
                    <div>
                        <span>Nueva contraseña</span>
                        <div class="col-lg-12 input-group mb-3">
                            <input v-if="!ver"
                                @keyup="validacion()"
                                v-model="contrasena1"
                                type="password"
                                class="form-control"
                            />
                            <input v-if="ver"
                                @keyup="validacion()"
                                v-model="contrasena1"
                                type="text"
                                class="form-control"
                            />
                            <div class="input-group-append">
                                <button class="btn-primary btn" @click="ver=true" v-if="!ver"><b-icon-eye-fill></b-icon-eye-fill></button>
                            </div>
                            <div class="input-group-append">
                                <button class="btn-info btn" @click="ver=false" v-if="ver"><b-icon-eye-slash-fill></b-icon-eye-slash-fill></button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="!ok" class="btn-danger btn"><b-icon-x-square></b-icon-x-square></button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="ok" class="btn-primary btn"><b-icon-check-all></b-icon-check-all></button>
                            </div>
                        </div>
                        <div class="alert alert-warning alert-dismissible" v-if="!ok">
                            <strong>Debe contener mas de 10 caracteres</strong> entre mayusculas, minusculas,  caracteres especiales y numeros.
                        </div>
                        <div >
                            <span>Repetir contraseña</span>
                            <div class="col-lg-12 input-group mb-3">
                                <input v-if="!ver2"
                                    @keyup="validacion2()"
                                    v-model="contrasena2"
                                    type="password"
                                    class="form-control"
                                />
                                <input v-if="ver2"
                                    @keyup="validacion2()"
                                    v-model="contrasena2"
                                    type="text"
                                    class="form-control"
                                />
                                <div class="input-group-append">
                                    <button class="btn-primary btn" @click="ver2=true" v-if="!ver2"><b-icon-eye-fill></b-icon-eye-fill></button>
                                </div>
                                <div class="input-group-append">
                                    <button class="btn-info btn" @click="ver2=false" v-if="ver2"><b-icon-eye-slash-fill></b-icon-eye-slash-fill></button>
                                </div>
                                <div class="input-group-append">
                                    <button v-if="!ok2" class="btn-danger btn"><b-icon-x-square></b-icon-x-square></button>
                                </div>
                                <div class="input-group-append">
                                    <button v-if="ok2" class="btn-primary btn"><b-icon-check-all></b-icon-check-all></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block" v-if="botonGuardar">Guardar contraseña</button>
                </form>
                <div class="btn btn-danger btn-block" @click="regresarInicioSesion()"><h4>regresar al inicio sesion</h4></div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapState,  mapMutations} from "vuex";
export default {
    middleware: 'auth',
    name:'nuevaContrasena',
    data(){
        return {
            contrasena1:'',
            contrasena2:'',
            ok:false,
            ver:false,
            ver2:false,
            ok2:false,
            botonGuardar:false,
            uri:'',
            user:'',
            nombreUser:'',
            contras : process.env.CONTRAS
        }
    }, 
    methods:{
        ...mapMutations('Autenticacion',['estadoNewContrasena']),
        validacion(){
            if(this.contrasena1 == '' || this.contrasena1 === undefined){
               this.botonGuardar = false
            }
            if (this.contrasena1.match(/[a-z]/) && this.contrasena1.match(/[0-9]/) && this.contrasena1.match(/[A-Z]/) 
            && this.contrasena1.length > 10 && this.contrasena1.match(/[!#$/¡?¿%&*]/)){
                this.ok = true
            }else{
                this.ok =false
            }
            if (this.contrasena1 === this.contrasena2){
                this.botonGuardar = true
                this.ok2 = true
            }else{
                this.botonGuardar = false
                this.ok2 = false
            }
        },
        validacion2(){
            if(this.contrasena2 === ''||this.contrasena2 === undefined){
               this.botonGuardar = false
            }
            if (this.contrasena2 === this.contrasena1){
                this.ok2 = true
            }else{
                this.ok2 =false
                this.botonGuardar = false
            }
            if(this.ok && this.ok2){
                this.botonGuardar = true
            }
        },
        nuevaContrasena(){
            let datos = {
                _id:this.$auth.$state.user._id,
                contrasenaNueva:this.contrasena2
            }
            //deberiamos validar tambien si es una contrseña que ya se halla usado anteriormente o al menos no en las 3 ultimas veces
            this.$axios.post('/empleados/cambioContrasena',datos)
            .then(res=>{            
                this.estadoNewContrasena(false)
                this.$auth.logout()
            })
            .catch(err=>{
                this.$auth.logout()
                console.log(err)
            })
        },
        regresarInicioSesion(){
            this.$auth.logout()
            this.estadoNewContrasena(false)
        },
    }
}
</script>

<style>

</style>