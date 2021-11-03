<template>
    <div class="p-4">
        <div class="p-3 col-md-3 mx-auto" v-if="!agregar">
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary" @click="agregarProveedor()"><strong>Agregar proveedor</strong></button>
                <button type="button" class="btn btn-outline-primary" @click="verProv()"><strong> Ver proveedores</strong></button>
                <button type="button" class="btn btn-outline-primary" @click="agregarProducto()"><strong>Agregar producto</strong></button>
                <button type="button" class="btn btn-outline-primary disabled" id='@click="relacionarCompra()"'><strong>Relacionar compra</strong></button>
            </div>
        </div>
        <div class="row text-center"  v-if="verProvee">
            <h2 class="mx-auto p-4"><strong>proveedores</strong></h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Razon social</th>
                        <th>Direccion</th>
                        <th>Nit</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(proveedor,index) in proveedores" :key="index">
                        <td v-if="proveedor.rzSocialProveedor!='NUEVO PROVEEDOR'">{{proveedor.rzSocialProveedor}}</td>
                        <td v-if="proveedor.rzSocialProveedor!='NUEVO PROVEEDOR'">{{proveedor.direccionProveedor}}</td>
                        <td v-if="proveedor.rzSocialProveedor!='NUEVO PROVEEDOR'">{{proveedor.nitProveedor}}</td>
                        <td v-if="proveedor.rzSocialProveedor!='NUEVO PROVEEDOR'"><button class="btn btn-outline-warning" >editar</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn btn-danger btn-block" @click="cerrarVerProveedores()"> Cerrar Proveedores</div>
        </div>
        <div v-if="agregar">
            <div class="card col-md-8 mx-auto">
                <div class="card-header bg-primary text-white text-center"><h2><strong>Agregar producto al Stock</strong></h2></div>
                <div class="card-boby p-4">
                    <form @submit.prevent="guardarProducto()">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Tipo producto</label>
                                <select v-model="producto.tipoProducto" class="form-control" @change="validarNuevoTipo(producto.tipoProducto)" required>
                                    <option v-for="(tipo,index) in tipos" :key="index">{{tipo.tipoProducto}}</option>
                                </select>    
                            </div>
                                <div class="form-group col-md-6">
                                <label for="inputPassword4">Modelo</label>
                                <input type="text" class="form-control" v-model="producto.modelo" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Codigo-referencia</label>
                            <input type="text" class="form-control" v-model="producto.referencia" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Fecha de compra</label>
                                <input type="date" class="form-control" v-model="producto.fechaCompra" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label >Estado producto</label>
                                <select v-model="producto.estado" class="form-control" required>
                                    <option v-for="(estado,index) in estados" :key="index">{{estado}}</option>
                                </select>    
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputCity">Valor de compra</label>
                                <input type="number" class="form-control mb-2" v-model="producto.valorCompra" required>
                                <div class="form-control" v-if="producto.valorCompra>0">{{new Intl.NumberFormat('es-CO').format(producto.valorCompra)}}</div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputState">Valor de venta</label>
                                <input type="number" class="form-control mb-2" v-model="producto.valorVenta" required>
                                <div class="form-control" v-if="producto.valorVenta>0">{{new Intl.NumberFormat('es-CO').format(producto.valorVenta)}}</div>
                            </div>
                        </div>
                        <div class="form-group">
                                <label for="inputEmail4">Proveedor</label>
                                <select v-model="producto.proveedor" class="form-control"  required @change="validarProveedor(producto.proveedor)">
                                    <option v-for="(proveedor,index) in proveedores" :key="index">{{proveedor.rzSocialProveedor}}</option>
                                </select>    
                            </div>
                        <button class="btn btn-info btn-block">Guardar</button>
                    </form>
                </div>
                <div class="card-footer bg-danger">
                    <button class="btn btn-danger btn-block" @click="cerrarAgregarProducto()">cerrar</button>
                </div>
            </div>            
        </div> 
        <br><br>
        <div class="row text-center"  v-if="!agregar">
            <h2 class="mx-auto p-4"><strong>stockProductos</strong></h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Tipo Producto</th>
                        <th>Modelo</th>
                        <th>Cod- referencia</th>
                        <th>Fecha Compra</th>
                        <th>Estado</th>
                        <th>Valor compra</th>
                        <th>Valor venta</th>
                        <th>Vender en efectivo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(producto,index) in productos" :key="index">
                        <td>{{producto.tipoProducto}}</td>
                        <td>{{producto.modelo}}</td>
                        <td>{{producto.referencia}}</td>
                        <td>{{verFecha(producto.fechaCompra)}}</td>
                        <td>{{producto.estado}}</td>
                        <td>{{new Intl.NumberFormat('es-CO').format(producto.valorCompra)}}</td>
                        <td>{{new Intl.NumberFormat('es-CO').format(producto.valorVenta)}}</td>
                        <td><button class="btn btn-outline-warning" @click="venderEfectivo(producto)">Vender</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-modal v-model="rlCompra" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <div class="card-header bg-primary text-white text-center"><h2><strong>Relacionar compra de productos</strong></h2></div>
            <div class="card-boby p-4">
                <form @submit.prevent="guardarRelacionCompra()" class="text-center">    
                    <div class="form-group">
                        <label>Fecha de la compra</label>
                        <input class="form-control" type="date" v-model="fc.descripcion" required>
                    </div>                     
                    <div class="form-group">
                        <label>Numero de Factura compra</label>
                        <input type="text" class="form-control" v-model="fc.codigo" required>   
                    </div>
                        <div class="form-group">
                        <label>Descripcion de la compra</label>
                        <textarea class="form-control" v-model="fc.descripcion" required></textarea>
                    </div>   
                    <div class="form-group">
                        <label>Valor de la compra</label>
                        <input type="number" class="form-control" v-model="fc.valorCompra" required>
                    </div>
                    <button class="btn btn-info btn-block" >Guardar</button>
                </form>
            </div>
            <div class="btn btn-danger btn-block" @click="cerrarRelacionarCompra()"> Cerrar</div>           
        </b-modal>
        <b-modal v-model="venderEnEfectivo" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <div class="card-header bg-primary text-white text-center"><h2><strong>venta en efectivo</strong></h2></div>
            <div class="card-boby p-4">
                <form @submit.prevent="guardarVentaEfectivo()" class="text-center">    
                    <div class="form-group">
                        <label>Fecha de venta</label>
                        <div class="form-control">{{productoVenta.tipoProducto}}</div>
                    </div>                     
                    <div class="form-group">
                        <label>Numero de Factura compra</label>
                        <div  class="form-control">{{productoVenta.modelo}}</div>   
                    </div>
                        <div class="form-group">
                        <label>Descripcion de la compra</label>
                        <div class="form-control">{{productoVenta.referencia}}</div>
                    </div>                        
                    <div class="form-group">
                        <label>Proveedor</label>
                        <div class="form-control"> {{productoVenta.proveedor}}</div>
                    </div>
                    <div class="form-group">
                        <label>Valor compra</label>
                        <div  class="form-control">{{productoVenta.valorCompra}}</div>
                    </div>
                    <div class="form-group">
                        <label>Valor venta establecido</label>
                        <div  class="form-control">{{productoVenta.valorVenta}}</div>
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <div  class="form-control"> {{productoVenta.estado}} </div>
                    </div>
                    <div class="form-group">
                        <label>Valor en esta venta</label>
                        <input type="number" class="form-control" v-model="productoVenta.valorEnEstaVenta">
                    </div>
                    <div class="form-group">
                        <label>buscarCliente</label>
                        <input type="number" class="form-control" v-model="cedulaBuscar" @keyup="buscar(cedulaBuscar)">
                    </div>
                    <div v-if="verCliente">
                        <div class="form-group">
                            <label>Nombre cliente</label>
                            <div class="form-control" >{{clientee.nombreCliente}} {{clientee.primerApellidoCliente}} {{clientee.segundoApellidoCliente}}</div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="btn btn-success btn-block" @click="agregarNuevoCliente()">Agregar Cliente</div>
                    </div>
                    <br>
                    <div>
                        <button class="btn btn-info btn-block" >Guardar</button>
                    </div>
                </form>
            </div>
            <div class="btn btn-danger btn-block" @click="cerrarVenderEfectivo()"> Cerrar</div>
        </b-modal>
        <b-modal v-model="agProveedor" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
             <div class="card-header bg-primary text-white text-center"><h2><strong>Agregar proveedor</strong></h2></div>
            <div class="card-boby p-4">
                <form @submit.prevent="guardarProveedor()" class="text-center">    
                    <div class="form-group">
                        <label>Razon social proveedor</label>
                        <input class="form-control" type="text" v-model="proveedor.rzSocialProveedor" required>
                    </div>                     
                    <div class="form-group">
                        <label>Direccion </label>
                        <input type="text" class="form-control" v-model="proveedor.direccionProveedor" required>   
                    </div>
                        <div class="form-group">
                        <label>Nit</label>
                        <input type="text" class="form-control" v-model="proveedor.nitProveedor" required>
                    </div>  
                    <button class="btn btn-info btn-block" >Guardar</button>
                </form>
            </div>
            <div class="btn btn-danger btn-block" @click="cerrarAgProveedor()"> Cerrar</div>
        </b-modal>  
        <b-modal v-model="agTipo" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <form @submit.prevent="guardarNuevoTipo()" class="text-center">    
                <div class="form-group">
                    <label>nuevo tipo</label>
                    <input class="form-control" type="text" v-model="tipo" required>
                </div>
                <button class="btn btn-info btn-block" >Guardar</button>
            </form> 
            <div class="btn btn-danger btn-block" @click="cerrarAgTipo()"> Cerrar</div>
        </b-modal> 
        <b-modal v-model="agCliente" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered size="xl">
            <div class="mx-auto">
                <div class="card bg-primary text-white">
                    <div class="card-head p-2">
                    <div class="p-2 bg-primary text-center">
                        <h2  class="p-3"><strong>Agregar nuevo Cliente</strong></h2>
                    </div>
                    </div>
                    <div class="card-body">
                    <form @submit.prevent="guardarCliente">
                        <div class="form-group">
                        <span>Nombre Cliente</span>
                        <input
                            v-model="cliente.nombreCliente" required type="text" min="3" placeholder="Nombre" class="form-control"/>
                        </div>
                        <div class="row form-group">
                        <div class="col-lg-6">
                            <span>1 Apellido</span>
                            <input
                            v-model="cliente.primerApellidoCliente" required type="text" min="3" placeholder="primer apellido" class="form-control" />
                        </div>  
                        <div class="col-lg-6">
                            <span>2 apellido</span>
                            <input
                            v-model="cliente.segundoApellidoCliente" required type="text" min="3" placeholder="segundo apellido" class="form-control"/>
                        </div>
                        </div>  
                        <div >
                        <div class="form-group" >
                        <span>Numero de Cedula cliente</span>
                        <input
                            v-model="cliente.cedulaIdCliente"
                            required
                            type="text"
                            min="7"
                            placeholder="CC"
                            class="form-control"
                        />
                        </div>
                        </div>
                        <div class="row form-group">
                        <div class="col-lg-6">
                            <span>Celular</span>
                            <input
                            v-model="cliente.celularUnoCliente"
                            required
                            type="text"
                            min="10"
                            placeholder="Celular personal"
                            class="form-control "
                        />
                        </div>  
                        <div class="col-lg-6">
                            <span>Otro Numero de contacto</span>
                            <input
                            v-model="cliente.celularDosCliente"
                            required
                            type="text"
                            min="10" placeholder="Otro numero de contacto" class="form-control"
                        />
                        </div>
                        </div> 
                        <div class="row form-group">
                        <div class=" col-md-4">
                        <span>Direccion</span>
                        <input
                            v-model="cliente.direccionCliente"
                            required
                            type="text"
                            min="13"
                            placeholder="Direccion"
                            class="form-control"
                        />
                        </div>
                        <div class="col-md-4">
                        <span>Barrio</span>
                        <input
                            v-model="cliente.barrioCliente"
                            required
                            type="text"
                            min="13"
                            placeholder="Direccion"
                            class="form-control"
                        />
                        </div>
                        <div class="col-md-4">
                        <span>Ciudad</span>
                        <input
                            v-model="cliente.ciudadCliente"
                            required
                            type="text"
                            min="13"
                            placeholder="Direccion"
                            class="form-control"
                        />
                        </div>                
                        </div>               
                        
                        <div class="row form-group">
                        <div class=" col-md-4">
                        <span>Tipo de vivienda</span>
                        <select v-model="cliente.tViviendaCliente" required  class="custom-select">
                            <option value="propia">Propia</option>
                            <option value="familiar">Familiar</option>
                            <option value="alquiler">Alquiler</option>
                        </select>
                        </div>
                        <div class="col-md-4">
                        <span>Ocupacion</span>
                        <input
                            v-model="cliente.ocupacionCliente"
                            required
                            type="text"
                            placeholder="Ocupacion"
                            class="form-control"
                        />
                        </div>
                        <div class="col-md-4">
                        <span>Personas a cargo</span>
                        <input
                            v-model="cliente.PcargoCliente"
                            required
                            type="number"
                            min="0"
                            class="form-control"
                        />
                        </div>                
                        </div>
                        <div class="row form-group">
                        <div class="col-md-6">
                        <span>Email</span>
                        <input
                            v-model="cliente.emailCliente"
                            type="email"
                            min="13"
                            placeholder="Email"
                            class="form-control"
                        />
                        </div>
                        <div class=" col-md-6">
                        <span>Fecha nacimiento</span>
                        <input
                            v-model="cliente.fechaNacCliente"
                            required
                            type="date"
                            class="form-control"
                        />
                        </div>              
                        </div>
                        <div class="form-group" >
                        <button class="btn btn-success btn-block"><h2><strong>Registrar Cliente</strong></h2></button>
                        </div>
                    
                    </form>
                    <div class="btn btn-warning btn-block" @click="agCliente=false,cliente={}">Cerrar</div>
                    
                    </div>
                </div>
            </div>
        </b-modal>
        <!--{{$auth.$state.user}}-->
    </div>
</template>

<script>
export default {
    name:'stockProductos',
    data(){
        return{
            tipos:[],
            estados:['Nuevo','Usado'],
            agregar:false,
            producto:{},
            productos:[],
            rlCompra:false,
            venderEnEfectivo : false,
            fc:{},
            uri:'',
            productoVenta:{},
            agProveedor:false,
            proveedor:{},
            agTipo:false,
            tipo:'',
            cedulaBuscar:'',
            clientee:{},
            cliente: {},
            verCliente:false,
            agCliente:false,
            productoVenta :{},
            verProvee:false,
            proveedores:[],
        }
    },
    created(){
    },
    mounted(){
        this.verProductos() 
        this.verProveedores() 
        this.verTipos()      
    },
    methods:{
        verProv(){
            this.verProvee = true
        },
        agregarNuevoCliente(){
            this.agCliente = true
        },   
        async guardarCliente(){
            console.log(this.cliente)
            if( this.cliente.nombreCliente == "" || this.cliente.nombreCliente == undefined 
            || this.cliente.primerApellidoCliente =="" || this.cliente.primerApellidoCliente ==undefined 
            || this.cliente.segundoApellidoCliente =="" || this.cliente.segundoApellidoCliente ==undefined 
            || this.cliente.cedulaIdCliente == "" || this.cliente.cedulaIdCliente == undefined
            || this.cliente.celularUnoCliente =="" || this.cliente.celularUnoCliente ==undefined
            || this.cliente.direccionCliente =="" || this.cliente.direccionCliente ==undefined
            || this.cliente.barrioCliente =="" || this.cliente.barrioCliente == undefined
            || this.cliente.ciudadCliente =="" || this.cliente.ciudadCliente == undefined
            || this.cliente.tViviendaCliente =="" || this.cliente.tViviendaCliente == undefined 
            || this.cliente.ocupacionCliente =="" || this.cliente.ocupacionCliente == undefined
            || this.cliente.PcargoCliente =="" || this.cliente.PcargoCliente == undefined
            || this.cliente.emailCliente =="" || this.cliente.emailCliente == undefined
            || this.cliente.fechaNacCliente =="" || this.cliente.fechaNacCliente == undefined
            ){
                alert('todos los campos son obligatorios')
                return
            }else{ 
                let h = new Date()
                let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
                let cliente = this.cliente
                cliente.fechaAgregadoCliente = hoy
                let res  = await this.$axios.$post("clientes/registro",cliente)
                if(res.status===205){
                    alert('El token a vencido o no existe')
                    this.agCliente = false
                    this.$auth.logout()
                    this.$router.push("/inicioSesion")
                }
                if(res.status===200){
                    this.cliente = {}
                    this.agCliente = false
                }                    
                if (res.status==202) {
                    let mens = ''
                    for(var property in res.error.keyValue) {
                        mens = res.error.keyValue[property];
                    }
                    this.agCliente = false
                    alert(res.title +' Este dato ya se encuentra registrado '+ mens)
                }                
            }       
        }, 
        async verTipos(){
            this.tipos =  await this.$axios.$get('/productos/verTipos')
            this.tipos.push({tipoProducto:'NUEVO TIPO'})
        },
        validarNuevoTipo(producto){
            if(producto=='NUEVO TIPO'){
                this.agTipo = true
            }else{
                this.agTipo = false
            }
        },
        async buscar(cedula){
            let cc = {cedulaId :cedula}
            let clientee = await this.$axios.$post('/clientes/busquedaa',cc)
            console.log(clientee.length)
            if(clientee.length>0){
                this.clientee = clientee[0]
                this.verCliente = true                
            }else{
                this.clientee = {}
                this.verCliente=false
            }
                
        },
        guardarNuevoTipo(){
            console.log(this.tipo)
            let tip = {
                tipoProducto:this.tipo
            }
            this.$axios.$post('/productos/guardarNuevoTipo',tip)
            .then(res=>{console.log(res)
                this.agTipo = false
                this.verTipos()
            })
            .catch(err=>{console.log(err)})
        },
        cerrarAgTipo(){
             this.agTipo = false
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
        async verProductos(){
            this.productos = await this.$axios.$get('/productos/productos')
        },
        agregarProducto(){
            this.agregar=true
        },
        cerrarAgregarProducto(){
            this.agregar=false
        },
        guardarProducto(){
            let prod = this.producto
            if(prod.tipoProducto  == "NUEVO TIPO"){alert('elige un tipo de producto'); return}
            this.$axios.$post('/productos/guardarProducto',prod)
            .then(res=>{console.log(res)
                this.cerrarAgregarProducto()
                this.verProductos()
                this.producto = {}
            })
            .catch(err=>{console.log(err)})
        },
        venderEfectivo(producto){
            this.venderEnEfectivo = true
            this.productoVenta=producto
        },
        guardarVentaEfectivo(){
            let id = this.productoVenta._id
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            let valores = {
                concepto : 'ventaEfectivo',
                capital:  parseInt(this.productoVenta.valorEnEstaVenta),
                interes:0,
                nombre:this.clientee.nombreCliente+' '+this.clientee.primerApellidoCliente+' '+this.clientee.segundoApellidoCliente,
                descripcion: 'ingreso venta en efectivo del producto '+this.productoVenta.modelo + ' con referencia ' +this.productoVenta.referencia,
                codigoEmpleado : this.$auth.$state.user._id,
                fechaIngresoEfectivo : hoy,
            }             
            this.$axios.$post('/contabilidad/guardarIngreso',valores)
            .then(res=>{console.log(res);this.venderEnEfectivo= false;this.productoVenta={};this.entregarProducto(id,valores.capital,this.clientee._id,true);this.clientee={}})
            .catch(err=>{console.log(err)})
        },
        entregarProducto(id,valorVentaFinal,cliente,efectivo){
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            let idd={
                id,
                valorVentaFinal,
                efectivo,
                cliente,
                fechaVenta:hoy
            }
            this.$axios.$post('/productos/entregarProducto',idd)
            .then(res => {
                console.log('se a actualizado elproducto')
               this.verProductos()
                
            })
            .catch(err => console.log(err));
        },
        cerrarVenderEfectivo(){
            this.venderEnEfectivo = false
        },
        cerrarRelacionarCompra(){
            this.rlCompra = false
        },
        relacionarCompra(){
            this.rlCompra = true
        },
        guardarRelacionarCompra(){
            let factCompra = this.fc
            this.$axios.$post('/productos/facturaCompraProductos',factCompra)
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
        },
        agregarProveedor(){
            this.agProveedor = true
        },
        guardarProveedor(){
            let proveedor = {
                provee:this.proveedor
            }
            this.$axios.$post('/productos/guardarProveedor',proveedor)
            .then(res=>{console.log(res)
                this.verProveedores()
                this.agProveedor = false
            })
            .catch(err=>{console.log(err)})
            console.log(this.proveedor)
        },
        cerrarAgProveedor(){
            this.agProveedor = false
        },
        async verProveedores(){
            this.proveedores =  await this.$axios.$get('/productos/verProveedores')
            console.log(this.proveedores)
            this.proveedores.push({rzSocialProveedor:'NUEVO PROVEEDOR'})
        },
        validarProveedor(proveedor){
            console.log(proveedor)
            if(proveedor=='NUEVO PROVEEDOR'){
                this.agProveedor = true
            }else{
                this.agProveedor = false
            }
        },
        cerrarVerProveedores(){
            this.verProvee = false
        },
    }
}
</script>

<style>

</style>