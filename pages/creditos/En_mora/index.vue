<template>
    <div>
        <barra-logeado/>
        <div class="bg-primary text-white text-center p-4">
            <h1><strong>CREDITOS EN MORA</strong></h1>
        </div>
        <barra-creditos/>
        <enMora/>
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
}
</script>

<style>

</style>