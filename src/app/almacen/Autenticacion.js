import axios from 'axios'
class usuario {
    constructor(){
      this.nombre = '';
      this.apellidos = '';
      this.codigo = '';
      this.direccion = '';
      this.celular = '';
      this.rol= '';
    }
  }
export default {
    state: {
        
    },
    getters: {

    },
    mutations:{
       
    },
    actions: {
        LOGIN : (({commit},payload)=>{
            return new Promise ((resolve,  reject) => {
                axios.post('/api/login/iniSesion', payload)
                .then(res =>{
                    if(res.status === 200){
                    localStorage.setItem('token', res.data.token)
                    resolve(true)
                    }
                }, err =>{
                   reject(err);
                })
            });
        }),
        
    
    }
}