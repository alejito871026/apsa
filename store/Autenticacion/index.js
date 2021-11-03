export const state = () => ({
    modalCalculadora:false,
    newContrasena:false
  })
  export const getters= {
    } 
    export const mutations={
        estadoCalculadora(state,valor){
            state.modalCalculadora = valor
        },
        estadoNewContrasena(state,valor){
            state.newContrasena = valor
        }
    }
    export const actions= {
        LOGIN : (({commit},payload)=>{
            return new Promise ((resolve,  reject) => {
                axios.post(uri+'/api/login/iniSesion', payload)
                .then(res =>{
                    console.log('estamos aca')
                    res.resolve = true
                    if(res.status === 200){
                        const user = {
                            token: res.data.token,
                            usuario:res.data.usuario.nombre,
                            codigo:res.data.usuario.codigo,
                            msn:res.data.codec
                        }  
                        console.log(user)
                        let msnEncriptado = f.encriptarMsn(user.msn)   
                        localStorage.setItem('msn', msnEncriptado)                   
                        localStorage.setItem('user', user.usuario)
                        localStorage.setItem('codigo', user.codigo)
                        localStorage.setItem('token', user.token)
                        resolve(true)
                    }
                    if(res.status === 201){
                        localStorage.setItem('primeravez', res.data.token)
                        resolve('primeraVez')
                    }
                }, err =>{
                    console.log(err)
                   reject(err);
                })
            }); 
        }),   
    }
