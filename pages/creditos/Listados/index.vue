<template>
    <div>
        <barra-logeado id="barra"/>
        <div class="bg-primary text-white text-center p-4">
            <h1 id="titulo"><strong>LISTADOS</strong></h1>
        </div>
        <barra-creditos/>
        <listado/>
    </div>
</template>

<script>
const f = require ("../../../funciones/funciones.js")
export default {
    middleware: 'auth',
    async asyncData({$axios,app}){
        let logueado = await f.validarUsuario($axios)
        if(logueado.access===false){
            app.$auth.logout()
            app.router.push('/inicioSesion')
        }        
    },
    data(){
        return{
        }
    },
    mounted() {
        this.socket = this.$nuxtSocket({
            // nuxt-socket-io opts: 
            name: 'Listados', // Use socket "home"
            channel: 'Listados', // connect to '/index'

            // socket.io-client opts:
            reconnection: false
        })
    },
    methods: {
        getMessage() {
            this.socket.emit('getMessage', { id: 'abc123' }, (resp) => {
            this.messageRxd = resp
            })
            console.log(this.socket)
        } 
    }
}
</script>

<style>

</style>