<template>
    <div class="tablaClientes">
        <div v-if="viendoEdiciones">
            <br>
            <div  class="card col-md-8 mx-auto">
                <div class="card-header bg-primary text-white text-center">
                    Ediciones
                </div>
                <div class="card-body">
                    <ediciones-clientes :client="id"/>
                </div>
                <div class="card-footer bg-primary text-white text-center">
                    <button class="btn btn-success btn-block" @click="viendoEdiciones = false">Cerrar ediciones</button>
                </div>            
            </div>
        </div>     
        <div v-else>
            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Cedula</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody v-for="cliente in clientes" :key="cliente._id">
                    <tr>
                        <td @click="verCliente(cliente)">{{cliente.nombreCliente}}</td>
                        <td @click="verCliente(cliente)">{{cliente.primerApellidoCliente}} {{cliente.segundoApellidoCliente}}</td>
                        <td @click="verCliente(cliente)">{{cliente.cedulaIdCliente}}</td>
                        <td @click="agregar()">
                            <router-link :to="{path:'/Clientes', query: {$:cliente.cedulaIdCliente,$$:3}}" 
                                class="nav-link btn btn-warning btn-sm text-white">Editar cliente
                            </router-link> 
                        </td>    
                        <td >
                            <div class="btn btn-success" @click="verEdiciones(cliente.cedulaIdCliente)">Ver ediciones</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav>
                <br>
                <ul class="pagination justify-content-center d-flex">
                    <li class="page-item"><div class="page-link" v-if="parPage>0" @click="cambiarPagina(parPage=parPage-1)" >Anterior</div></li>
                    <li class="page-item" v-for="pagina in paginas" :key="pagina">
                        <div class="page-link" @click="cambiarPagina(parPage=pagina)">{{pagina}}</div>
                    </li>
                    <li class="page-item"><div class="page-link" v-if="parPage<paginas.length" @click="cambiarPagina(parPage=parPage+1)">Siguiente</div></li>
                </ul>
            </nav>
        </div>
        <b-modal v-model="verModalCliente" centered hide-footer hide-header no-close-on-backdrop no-close-on-esc>
            <div class="card">
                <div class="card-header text-center bg-primary text-white">
                    <h2>Cliente</h2>
                </div>
                <div class="card-body">
                    <form >
                       {{clienteModal}} 
                    </form>
                </div>
                <div class="card-footer bg-primary">
                    <div class="btn btn-block btn-danger" @click="cerrarModal()"><h3>Cerrar</h3></div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
    middleware: 'auth',
    name:'tablaClientess',
    props:['cc'],
    computed:{
        ...mapState('storeViewComponentsClientes',['tablaClientes'])
    },
    watch: {
        tablaClientes() {
            if(this.tablaClientes==true){
                this.cargarClientes()
            }
        },
        cc(){
            this.buscarClientes(this.cc,this.parPage)
        },
    },
    data(){
        return {
            clientes:{},
            paginas:[],
            parPage:0,
            verModalCliente: false,   
            clienteModal:{},
            editarCliente:false,
            viendoEdiciones:false,
            id:{},
        }
    },
    mounted(){
        this.cargarClientes()
    },
    methods:{
        ...mapMutations('storeViewComponentsClientes',['estadoBotonCrearCliente','estadoCrearCliente','estadoTablaClientes']),
        async paginacion(posicion){
            this.parPage = posicion
            let paginas = await this.$axios.$post("/clientes/totalClientes")
            let totalPaginas = Math.ceil(paginas / 5)
            for(let a = 1;a<=totalPaginas-1;a++){
                this.paginas.push(a)
            }
        },
        async cambiarPagina (pagina) {
            const pag = {
                pagina
            }
            let clientes = await this.$axios.$post("/clientes/activos", pag)
            if(clientes.success===false){  
                if(clientes.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                }
                this.$router.push('/inicioSesion')
            }else{
                this.clientes = clientes.clientes
            }
        },
        async cargarClientes(){
            let pagina = 0
            let clientes = await this.$axios.$post("/clientes/activos",pagina)
            if(clientes.status!=200){  
                if(clientes.status === 205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                    this.$router.push("/inicioSesion")
                }else{
                    alert('Ocurio un error en la validacion del token')
                    this.$auth.logout()
                    this.$router.push("/inicioSesion")
                }
            }else{
                this.paginacion(pagina)
                this.clientes = clientes.clientes
                this.estadoTablaClientes(false)
            }
        },  
        async buscarClientes(cc,pp){
            if(cc.length>6){
                const x = {cedulaId:cc}
                const res = await this.$axios.$post("/clientes/busqueda",x)
                console.log(res)
                if(res.status===205){
                    alert('El token a vencido o no existe')
                    this.$auth.logout()
                    this.$router.push("/inicioSesion")
                }else if(res.cliente.length>0){
                    this.clientes = res.cliente
                }
            }else{
                this.cambiarPagina(pp)
            }          
        },
        async verCliente(cliente){
            this.clienteModal = cliente
            this.verModalCliente = true
            
        },
        agregar(){
            this.estadoCrearCliente(true)
            this.estadoBotonCrearCliente(true)
        },
        cerrarModal(){
            this.verModalCliente = false
            this.clienteModal = {}
            this.editarCliente = false
        },
        verEdiciones(id){
            this.id.cedulaIdCliente = id
            this.viendoEdiciones = true
        },
    }
}    
</script>

<style>

</style>