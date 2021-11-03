<template>
  <div>
    <Barra></Barra>    
    <div class="p-4 container-col-lg-12 text-center">
      <nueva-contrasena v-if="newContrasena"/>
      <div class="mx-auto" v-else-if="iniSesion">
        <div class="card text-center bg-primary text-white">
          <div class="card-header">
            <h2 class="p-2">Iniciar Sesion</h2>
          </div>
          <div class="card-body" >
            <form method="post" @submit.prevent="inicioSesion()" v-if="!keyMsn">
              <div class="form-group">
                <div class="col-lg-12">
                  <h3>Cedula</h3>
                  <input v-model="cedula" type="number" placeholder="cedula" class="form-control"/>
                </div>
                <div class="col-lg-12">
                  <h3>Contraseña</h3>
                  <input 
                    v-model="contrasena" type="password" placeholder="Contraseña" class="form-control"/>
                    <div v-if="mensajeDeContrasena">Debes escribir el codigo que a llegado a tu celular</div>
                </div>                
              </div>
              <div class="form-group col-lg-12">
                <button class="btn btn-success btn-block"><h3>Iniciar Sesion</h3></button>
                <div @click="iniSesion=false" class="btn btn-warning btn-block">
                  <h3>Olvido Contraseña?</h3>
                </div>
              </div>
            </form>
            <form @submit.prevent="validarPass()" v-if="keyMsn">
              <div class="col-lg-12" >
                <h2>Codigo de verificacion</h2>
                <input 
                  v-model="pass" type="text" placeholder="Escribe el pass que a llegado a tu celular" class="form-control"/>
              </div>
              <br>
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" v-bind:style="n">{{b}} seg</div>
              </div>
              <br>
              <h2>Oportunidades posibles {{2-contaPass}}</h2>
              <br>
              <button class="btn btn-warning col-lg-12 " >
                <h2>Validar pass</h2>
              </button>
              <br>
              <div class="btn btn-success btn-block" @click="regresarInicioSesion()"><h2>Regresar al inicio sesion</h2></div>
            </form>            
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card bg-primary ">
          <div class="card-header text-white">
            <h2>Recuperar contraseña</h2>
          </div>
          <div class="card-body text-white">
            <form @submit.prevent="recuperarContrasena()">
              <div>
                <h4>Codigo</h4>
                <input 
                  v-model="recuperar.codigo"
                  type="text"
                  placeholder="Codigo de usuario"
                  class="form-control"
                  required/>
              </div>
              <h4>Opciones de recuperacion</h4>
              <div class="row tex-center mx-auto">
                <div class="col-md-6 form-control" >
                  <div class="custom-control custom-switch bg-white text-dark">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" @click="recuperar.mail=false" v-model="recuperar.cel">
                    <label class="custom-control-label" for="customSwitch1" >Recuperar con celular</label>
                  </div>
                </div>
                <div class="col-md-6 form-control">                  
                  <div class="custom-control custom-switch bg-white text-dark">
                    <input type="checkbox" disabled class="custom-control-input bg-info" id="customSwitch2" @click="recuperar.cel=false, alerta()" v-model="recuperar.mail" >
                    <label class="custom-control-label" for="customSwitch2" >Recuperar con mail</label>
                  </div>
                </div>
              </div>
              <div v-if="recuperar.cel">
                <h4>Celular</h4>
                <input 
                  v-model="recuperar.celE"
                  type="number"
                  placeholder="Celular personal empleado"
                  class="form-control"/>
              </div>
              <div v-if="recuperar.mail">
                <h4>Mail</h4>
                <input 
                  v-model="recuperar.mailE"
                  type="mail"
                  placeholder="Mail personal empleado"
                  class="form-control"/>
              </div>
              <br>
              <button class="btn btn-success col-lg-12 " >
                <h2>Recuperar contrasena</h2>
              </button>
            </form>
            <br>
            <div class="btn btn-warning btn-block text-white" @click="iniSesion=true"><h2>Regresar al inicio sesion</h2></div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
    import { mapActions, mapState,  mapMutations} from "vuex";
    export default {
      middleware: 'auth',
      auth: 'guest',
    computed:{
      ...mapState('Autenticacion',['newContrasena']),
    },
    created() { 
      this.contras = process.env.CONTRAS
    },
    mounted(){
      
    },
    data() {
        return {
          cedula: "",
          contrasena: "",
          contras :"",
          iniSesion: true,
          keyMsn:false,
          pass:undefined,
          recuperar:{
            mail:false,
            cel:false,
            mailE:null,
            celE:null,
            codigo:null,
          },        
          contaPass:0,
          b:60,
          n:{},
          intervalo:{},
          mensajeDeContrasena:false,
        };
    },
    methods: {
      ...mapMutations('Autenticacion',['estadoNewContrasena']),
      estadoBarraPass(){
        this.b=60
        let w = 100
        this.keyMsn = true  
        this.intervalo = setInterval(() => {     
          this.n = {
            height: '20px',
            width: w+"%",
            valuemin:"0",
            valuemax:"100",
          }
          this.b-=1
          w-=1.67
          if (this.b===0) {
              this.keyMsn = false
              this.pass = undefined 
              alert ('se agoto el tiempo')
              this.$auth.logout()
              clearInterval(this.intervalo)
            }
          }, 1000);
      },
      validarPass(){ 
        if (this.pass===undefined || this.pass===''){
          alert('debees escribir el pass')
          return
        }
        let msn = this.$auth.$state.user.coded 
        msn = this.CryptoJS.AES.decrypt(msn, this.contras).toString(this.CryptoJS.enc.Utf8)
        if(msn === this.pass){     
          clearInterval(this.intervalo)
          this.pass = undefined 
          this.$router.push("/creditos");
        }else{
          this.contaPass+=1
          if (this.contaPass===1) {
            alert('escribiste un pass incorrecto, te queda una oportunidad')
          }
          if(this.contaPass===2){ 
            this.pass = undefined           
            clearInterval(this.intervalo)
            this.keyMsn = false
            alert('agotaste las oportunidades')           
            localStorage.removeItem ('msn')
            this.contaPass=0
          }          
        }
      },
      async inicioSesion() {
        const user = {
          userIdConnect: this.cedula,
          userPassConnect: this.contrasena
        };
        if(user.userIdConnect==="" || user.userPassConnect===""){
          alert('todos los campos son obligatorios')
          return
        }else{
          user.userIdConnect = this.CryptoJS.AES.encrypt(user.userIdConnect, this.contras).toString();
          user.userPassConnect = this.CryptoJS.AES.encrypt(user.userPassConnect, this.contras).toString();
          let r = await this.$auth.loginWith('local', {data:user})
          let respuesta = r
          if(respuesta.data.status === 200){ 
            this.estadoBarraPass()                    
            } else { 
              this.keyMsn = false      
          }
          if(respuesta.data.status === 201){
              this.estadoNewContrasena(true);
              this.mensajeDeContrasena=false
          }
          if(respuesta.data.success===false){
            alert(respuesta.data.error);
          }   
        }
      },
      regresarInicioSesion() {
        clearInterval(this.intervalo)
        this.pass = undefined 
        this.keyMsn=false
        this.$auth.logout()        
      },
      async recuperarContrasena() {
        if(this.recuperar.codigo===null || this.recuperar.codigo==''){
          alert('el codigo es obligatorio')
          return
        }else{
          if(this.recuperar.cel===false && this.recuperar.mail===false){
            alert('debes elegir como recuperar tu contraseña')
            return
          }else{
            if(this.recuperar.cel){
              this.recuperar.mailE=null
              if(this.recuperar.celE===null ){
                alert('el celular es obligatorio')
                return
              }else{
                this.recuperarConCel(this.recuperar)
                this.iniSesion=true
                this.recuperar.codigo = null
                this.recuperar.cel = false
                this.recuperar.celE = null
              }
            }else{
              if(this.recuperar.mail){
                this.recuperar.celE=null
                if(this.recuperar.mailE===null ){
                  console.log('el email es obligatorio')
                  return
                }else{
                  alert('esta funcion aun no se encuentra en funcionamiento')
                  this.iniSesion=true
                  this.newContrasena=false
                  //this.recuperarConMail(this.recuperar)
                  this.recuperar.codigo = null
                  this.recuperar.mail = false
                  this.recuperar.mailE = null
                  return                  
                }
              }            
            }
          }
        }       
      },
      alerta(){
        if (!this.recuperar.mail) {           
          alert('esta funcion aun no se encuentra en funcionamiento')
          this.recuperar.mail=false
          this.recuperar.cel=false
          this.iniSesion=true
        }        
      },
      recuperarConCel(datos){
        let empleado = {
          codigo:datos.codigo,
          celular:datos.celE
        }
        this.$axios.$post('/login/recuperarContrasenaCel', empleado)
        .then(res=>{
          console.log('res', res)
          if(res.success==false){
            alert(res.title +'  '+res.error)
          }else{
            this.mensajeDeContrasena=true
          }          
        })
        .catch(err=>{
          console.log('err', err)
          console.log(err)
        })
      },
      recuperarConMail(datos){
        let empleado = {
          codigo:datos.codigo,
          mail:datos.mailE
        }        
        this.axios.$post('/login/recuperarContrasenaMail',{headers: {'Authorization': localStorage.getItem('token')},empleado})
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
      },
    }  
  };    
</script>