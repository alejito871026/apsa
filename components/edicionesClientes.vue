<template>
    <div>
        <div v-if="ediciones.length==0">
            no existen ediciones
        </div>
        <div v-for="edicion in ediciones" :key="edicion._id" v-else>
            <div class="card-body" >
                {{edicion.modificacion}}
            </div>            
        </div>
    </div>
</template>

<script>
export default {
    props:['client'],
    mounted(){
        this.cargarEdiciones()
    },
    data(){
        return {
            ediciones:[],
            existenEdiciones:false
        }
    },
    methods:{
        async cargarEdiciones(){
            const ediciones = await this.$axios.$post('/clientes/ediciones',this.client)
            this.ediciones = ediciones

        },
    }

}
</script>

<style>

</style>