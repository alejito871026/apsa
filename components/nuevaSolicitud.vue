<template>
    <div >
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h2 class="text-center text-white" >Credito a Agregar # {{tot}}</h2>
            </div>
            <div class="card-body" v-for="clie in cliente" :key="clie._id">
                <form @submit.prevent="calcularCredito(clie.cedulaId)">
                    <div class="p-2">
                        <div class="card">
                            <div class="card-header bg-info text-white"><h2 class="text-center">Informacion Cliente</h2></div>
                            <div class="card-body col-sm-10 mx-auto">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td><h6> Nombre: </h6></td>
                                            <td><h6> {{clie.nombreCliente+' '+clie.primerApellidoCliente +' '+ clie.segundoApellidoCliente}}</h6></td>                                            
                                        </tr>
                                        <tr>
                                            <td><h6> Cedula: </h6></td>
                                            <td><h6> {{clie.cedulaIdCliente}}</h6></td>                                            
                                        </tr>
                                        <tr>
                                            <td><h6> Celular principal: </h6></td>
                                            <td><h6> {{clie.celularUnoCliente}}</h6></td>                                            
                                        </tr>
                                        <tr>
                                            <td><h6> Otro numero de contacto: </h6></td>
                                            <td><h6> {{clie.celularDosCliente}}</h6></td>                                            
                                        </tr>
                                        <tr>
                                            <td><h6> Direccion residencia: </h6></td>
                                            <td><h6> {{clie.direccionCliente}}</h6></td>                                            
                                        </tr>
                                        <tr>
                                            <td><h6> Barrio: </h6></td>
                                            <td><h6> {{clie.barrioCliente}}</h6></td>                                            
                                        </tr>
                                        <tr>
                                            <td><h6> Email: </h6></td>
                                            <td><h6> {{clie.emailCliente}}</h6></td>                                            
                                        </tr>
                                    </tbody>
                                </table>
                                <router-link  :to="{path:'/Clientes', query: {$:clie.cedulaIdCliente,$$:2}}" 
                                    class="nav-link btn btn-success">Si algun dato a cambiado <strong>presione aqui</strong> para actualizar los datos
                                </router-link>                            
                            </div>
                            <div class="card-footer bg-info">
                            </div>
                        </div>
                    </div>  
                    <div class="p-2">
                        <div class="card">
                            <div class="card-header bg-info text-center">
                                <h2 class="text-white"><strong>Descripcion del servicio</strong></h2>
                                <div class="btn-group col-md-12 mx-auto">
                                    <div class="col-md-6" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                             id="customSwitc" @click="creditoArticulo.articulo = false" v-model="creditoArticulo.credito" >
                                            <label class="custom-control-label" for="customSwitc" >Credito</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                             id="customSwitch" @click="creditoArticulo.credito = false, verTipos()" v-model="creditoArticulo.articulo" >
                                            <label class="custom-control-label" for="customSwitch" >Articulo</label>
                                        </div>
                                    </div>
                                </div> 

                            </div>
                            <div class="card-body">
                                <div class="col-md-8 mx-auto">
                                    <h2 class="text-center">Solicitud Credito</h2>
                                    <br />
                                    <div v-if="creditoArticulo.articulo">
                                        <div class="input-group mb-3" >
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Tipo Articulo</label>
                                            </div>
                                            <select v-model="credit.servicio" class="form-control"  @change="quitarBoton(), validTipo(credit.servicio)">
                                                <option v-for="(tipo,index) in tipos" :key="index">{{tipo.tipoProducto}}</option>
                                            </select>
                                        </div>
                                        <div class="input-group mb-3" v-if="productoAvender">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Articulo</label>
                                            </div>
                                            <select v-model="credit.producto" class="form-control"  @change="quitarBoton(), referirProducto(credit.producto)">
                                                <option v-for="(productos,index) in productosTipo" :key="index" v-bind:value="productos._id">{{productos.modelo}}  {{productos.referencia}}</option>
                                            </select>
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text">Cantidad solicitada</span>
                                            <input
                                                v-model="credit.cantidad"
                                                type="number"
                                                min="99999"
                                                required
                                                class="form-control"
                                                @keyup="quitarBoton()"
                                            />
                                            <div class="form-control" v-if="credit.cantidad">{{new Intl.NumberFormat('es-CO').format(credit.cantidad)}}</div>
                                        </div>
                                    </div>   
                                    <div v-if="creditoArticulo.credito">
                                        <div class="input-group mb-3" >
                                            <div class="input-group-prepend">
                                                <label class="input-group-text" for="inputGroupSelect01">Tipo de Servicio</label>
                                            </div>
                                            <select
                                                v-model="credit.servicio"
                                                required
                                                class="custom-select"
                                                @change="quitarBoton(), validService()"
                                                >
                                                <option>Soat</option>
                                                <option>Tecnomecanica</option>
                                                <option>Soat-Tecnomecanica</option>
                                                <option>Licencia</option>
                                                <option value="pignoracion">Prestamo sobre prenda</option>
                                                <option>Libre Inversion</option>
                                                <option>Hipoteca</option>
                                                <option>Vacaciones</option>
                                                <option value="compraVehiculo">Compra de vehiculo</option>
                                            </select>
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text">Cantidad solicitada</span>
                                            <input
                                                v-model="credit.cantidad"
                                                type="number"
                                                min="99999"
                                                required
                                                class="form-control"
                                                @keyup="quitarBoton()"
                                            />
                                            <div class="form-control" v-if="credit.cantidad">{{new Intl.NumberFormat('es-CO').format(credit.cantidad)}}</div>
                                        </div>
                                    </div>     
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">Interes %</label>
                                        </div>
                                        <input                                            
                                            type="number"
                                            required
                                            @keyup="quitarBoton()"
                                            class="form-control"
                                            v-model="credit.interes"
                                            min="1"
                                            max="15"
                                            step="0.01"
                                        />
                                    </div>
                                    <div class="input-group mb-3" v-if="creditoArticulo.credito">
                                        <span class="input-group-text">Cuota inicial</span>
                                        <input
                                            v-model="credit.cuotaInicial"
                                            type="number"
                                            required
                                            min="0"
                                            class="form-control"
                                            @keyup="quitarBoton()"
                                             placeholder="(no requerida)"
                                        />
                                        <div class="form-control btn-outline-danger" v-if="demas>0">{{new Intl.NumberFormat('es-CO').format(aumentoPorDias)}}</div>
                                        <div class="form-control"  v-if="credit.cuotaInicial">{{new Intl.NumberFormat('es-CO').format(parseInt(credit.cuotaInicial)+parseInt(aumentoPorDias))}}</div>
                                    </div>
                                    <div class="input-group mb-3" v-if="creditoArticulo.articulo">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">Cuota Inicial</label>
                                        </div>
                                        <input
                                            type="number"
                                            required
                                            @keyup="quitarBoton(),restarCantidad()"
                                            class="form-control"
                                            v-model="credit.cuotaInicial"
                                            placeholder="(no requerida)"
                                        />
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">Tiempo en meses</label>
                                        </div>
                                        <input
                                            type="number"
                                            required
                                            @keyup="quitarBoton()"
                                            class="form-control"
                                            v-model="credit.tiempo"
                                            min="1"
                                            max="72"
                                            @change="cargarInfo(credit.frecuencia)"
                                        />
                                    </div>
                                    <div class="input-group mb-3" v-if="credit.tiempo" >
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">Valor total</label>
                                        </div>
                                        <div class="form-control">{{new Intl.NumberFormat('es-CO').format(parseInt(sumar))}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">frecuencia de pago</label>
                                        </div>
                                        <b-form-select v-model="credit.frecuencia" :options="options" @change="cargarInfo(credit.frecuencia),quitarBoton()"></b-form-select>
                                    </div>
                                    <div class="input-group mb-3"  v-if="verHoy">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">frecha de pago</label>
                                        </div>
                                        <input type="date" class="form-control" v-model="date" @change="comparar(),quitarBoton()">
                                    </div>
                                    <div v-if="credit.frecuencia == 'Mensual' || credit.frecuencia =='Pago Unico'" class="text-center">
                                        <br>
                                        <div class="p-2 jumbotron alert alert-info">
                                            Establesca la fecha de pago en el siguiente rango, el cual le brinda  
                                            30 dias calendario, <br> luego de 2 dias de estudio y aprovacion y los 6 dias de gracia.
                                            <br />
                                            Desde {{hoy}}
                                            hasta {{pfecha}}
                                        </div>                                        
                                        <br>
                                        <div class="p-2 alert alert-danger" v-if="demas>0">
                                            <h5>DEBE PAGAR EL PORCENTAJE EQUIVALENTE AL INTERES POR LOS DIAS DE MAS !!!</h5>
                                            <button disabled class="btn btn-warning">{{demas}}</button>
                                            <h5>Este es el valor del interes que debera cancelar</h5>
                                            <div class="form-control">
                                                {{new Intl.NumberFormat('es-CO').format(aumentoPorDias)}}
                                            </div>
                                            <h5>Este valor se sumara a la inicial del credito</h5>
                                        </div>
                                        <div class="jumbotron text-center alert alert-danger p-2"  v-if="fueraDeRango">
                                            <h2><strong>Fecha fuera de rango</strong></h2>
                                        </div>                                        
                                    </div>
                                    <div v-if="credit.frecuencia == 'Quincenal'">
                                        <div class="text-center">
                                            <br>
                                            <div class="jumbotron alert alert-info p-2">
                                                Establesca la fecha de pago en el siguiente rango, el cual le brinda
                                                15 dias calendario, <br> luego de 2 dias de estudio y aprovacion y los 5 dias de gracia.
                                                <br />
                                                Desde {{hoy}}
                                                hasta {{pfecha}}
                                                <br>
                                            </div>
                                            <div class="p-4 jumbotron alert alert-danger" v-if="demas>0" >
                                                <h3>DEBE PAGAR EL PORCENTAJE EQUIVALENTE AL INTERES POR LOS DIAS DE MAS !!!</h3>
                                                <button disabled class="btn btn-warning">{{demas}}</button>
                                                <h3>Este es el valor del interes que debera cancelar</h3>
                                                <div class="form-control">
                                                    {{new Intl.NumberFormat('es-CO').format(aumentoPorDias)}}
                                                </div>
                                                <h3>Este valor se sumara a la inicial del credito</h3>
                                            </div>
                                            <div class="jumbotron text-center alert alert-danger p-2" v-if="fueraDeRango">
                                                <h2><strong>Fecha fuera de rango</strong></h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="credit.frecuencia == 'Semanal'" class="text-center jumbotron alert alert-info">el cobro se realizara a la semana exacta de entregado el credito <p v-if="verHoyy">hasta el mes  de {{hoy}} </p></div>                                     
                                    <div class="jumbotron alert alert-primary text-center" v-if="credit.servicio=='compraVehiculo'||credit.servicio=='pignoracion'">
                                        El cliente asumira el costo de la pignoracion y despignoracion del <div v-if="credit.servicio=='compraVehiculo'">vehiculo</div> 
                                        <div v-if="credit.servicio=='pignoracion'">articulo</div> 
                                    </div>                          
                                </div>
                            </div>                            
                            <div class="card-footer bg-info">
                            </div>
                        </div>
                    </div>
                    <div  class="p-2">
                        <div class="card">
                            <div class="card-header bg-info text-center">
                                <h2 class="text-white"><strong>Informacion Laboral</strong></h2>
                                <div class="btn-group col-md-12 mx-auto">
                                    <div class="col-md-3" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                            @click="estadoEmpleo.indepp=false, estadoEmpleo.desempleado=false, estadoEmpleo.pensionado=false" id="customSwitch1" v-model="estadoEmpleo.emplee" >
                                            <label class="custom-control-label" for="customSwitch1" >Si es empleado</label>
                                        </div>
                                    </div>
                                    <div class="col-md-3" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                            @click="estadoEmpleo.emplee=false, estadoEmpleo.desempleado=false, estadoEmpleo.pensionado=false" id="customSwitch2" v-model="estadoEmpleo.indepp">
                                            <label class="custom-control-label" for="customSwitch2" >Si es independiente</label>
                                        </div>
                                    </div>
                                    <div class="col-md-3" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                                @click="estadoEmpleo.indepp=false, estadoEmpleo.emplee=false, estadoEmpleo.desempleado=false" id="pensionado" v-model="estadoEmpleo.pensionado" >
                                            <label class="custom-control-label" for="pensionado" >Pensionado</label>
                                        </div>
                                    </div>
                                    <div class="col-md-3" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                                @click="estadoEmpleo.indepp=false, estadoEmpleo.emplee=false, estadoEmpleo.pensionado=false" id="customSwitch3" v-model="estadoEmpleo.desempleado" >
                                            <label class="custom-control-label" for="customSwitch3" >Ninguna de las anteriores</label>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div class="card-body col-sm-10 mx-auto">
                                <div class="row p-4 bg-white" v-if="estadoEmpleo.emplee || estadoEmpleo.indepp">
                                    <div class="col-md-12" v-if="estadoEmpleo.emplee">
                                        <h2 class="text-center">Descripcion laboral </h2>
                                    </div>
                                    <div class="col-md-12" v-if="estadoEmpleo.indepp">
                                        <h2 class="text-center">Descripcion actividad o negocio </h2>
                                    </div>
                                    <br/>
                                    <div class="col-md-12">
                                        <div class="input-group mb-3" >
                                            <div class="input-group-prepend" v-if="estadoEmpleo.emplee">
                                                <label class="input-group-text">Nombre de la empresa</label>
                                            </div>
                                            <div class="input-group-prepend" v-if="estadoEmpleo.indepp">
                                                <label class="input-group-text">Actividad o negocio</label>
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.nombreEmpresa"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">                                        
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Ciudad</label>
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.ciudadEmpresa"
                                            />
                                        </div>
                                        <div class="input-group mb-3" v-if="estadoEmpleo.emplee">
                                            <div class="input-group-prepend" >
                                                <label class="input-group-text">Cargo</label>
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.cargoEmpleado"
                                            />
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Salario</label>
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.salarioEmpleado"
                                            />
                                        </div>
                                        <div class="input-group mb-3" v-if="estadoEmpleo.indepp">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Se encuentra registrado en C&C</label>
                                            </div>
                                            <div class="mx-auto p-1 custom-control custom-switch">
                                                <input type="checkbox" class="custom-control-input" id="customSwitch7" v-model="infoLab.cyc" true-value="si" false-value="no" >
                                                <label class="custom-control-label" for="customSwitch7" ></label>{{infoLab.cyc}}
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Direccion</label>
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.direccionEmpresa"
                                            />
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Telefono</label>
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.telefonoEmpresa"
                                            />
                                        </div>
                                        <div class="input-group mb-3" v-if="estadoEmpleo.emplee">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Correo laboral</label>
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.correoLaboral"
                                            />
                                        </div>
                                        <div class="input-group mb-3" v-if="estadoEmpleo.indepp">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Otros Ingresos</label>
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.otrosIngresosEmpleado"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-12" v-if="estadoEmpleo.emplee">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Otros Ingresos</label>
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="infoLab.otrosIngresosEmpleado"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="input-group mb-3" v-if="estadoEmpleo.indepp">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Descripcion <br> actividad o negocio</label>
                                            </div>
                                            <textarea rows="3" class="form-control" v-model="infoLab.descripcionActividad" @keyup="quitarBoton()"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="estadoEmpleo.emplee">
                                    <div class="jumbotron alert alert-info text-center">
                                        El cliente debe presentar carta laboral con no menos de 15 dias de impresion ó
                                        los ultimos dos desprendibles de pago.
                                    </div>
                                </div>
                                <div v-if="estadoEmpleo.indepp">
                                    <div class="jumbotron alert alert-info text-center">
                                        El cliente debe presentar documentos que sustenten la ejecucion del trabajo independiente.
                                        Camara de comercio o rut.
                                    </div>
                                </div>
                                <div v-if="estadoEmpleo.desempleado">
                                    <div class="jumbotron alert alert-danger text-center">
                                        Si no esta empleado o es independiente obligatoriamente debera 
                                        tener un fiador que cumpla con este requerimiento, o una prenda que cubra el credito.
                                    </div>
                                </div>
                                <div v-if="estadoEmpleo.pensionado">
                                    <div class="jumbotron alert alert-danger text-center">
                                        El cliente debera prensentar al menos los 2 ultimos desprendibles de pago para el proceso de validacion,
                                         por el contrario debera tener un fiador que cumpla con este requerimiento, o 
                                         una prenda que cubra el credito.
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-info">
                            </div>
                        </div>
                    </div>
                    <div class="p-2">
                        <div class="card">
                            <div class="card-header bg-info text-center">
                                <h2 class="text-white"><strong>Fiador o Prenda</strong></h2>
                                <div class="btn-group col-md-12 mx-auto">
                                    <div class="col-md-4" >
                                        <div class="custom-control custom-switch  text-white" v-if="credit.servicio!='pignoracion'">
                                            <input type="checkbox" class="custom-control-input"  
                                            @click="prenda=false, fiadorPrenda=false" id="customSwitch4" v-model="fiador" >
                                            <label class="custom-control-label" for="customSwitch4" >Fiador</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4" >
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                            @click="fiador=false, fiadorPrenda=false" id="customSwitch5" v-model="prenda">
                                            <label class="custom-control-label" for="customSwitch5" >Prenda</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4" v-if="!estadoEmpleo.desempleado">
                                        <div class="custom-control custom-switch  text-white">
                                            <input type="checkbox" class="custom-control-input"  
                                            @click="fiador=false, prenda=false" id="customSwitch6" v-model="fiadorPrenda" >
                                            <label class="custom-control-label" for="customSwitch6" >Ninguna de las anteriores</label>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div class="card-body col-sm-10 mx-auto">
                                <div v-if="prenda" class="col-lg-12 bg-white border p-4">
                                    <div class="card p-4">
                                        <div class="card-head text-center">
                                        <h2 class="p-4">Informacion Prenda</h2>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-6">
                                            <span>tipo vehiculo</span>
                                            <select v-model="Fiador.tipoVehiculo" required class="custom-select">
                                                <option value="Automovil">Automovil</option>
                                                <option value="Motocicleta">Motocicleta</option>
                                                <option value="Motocarro">Motocarro</option>
                                                <option value="VehiculoElectrico">Vehiculo Electrico</option>
                                            </select>
                                            </div>
                                            <div class="col-lg-6">
                                                <span>Marca</span>
                                                <input v-model="Fiador.marca" required type="text" placeholder="marca" class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-lg-4">
                                                <span>Linea</span>
                                                <input v-model="Fiador.linea" required type="text" placeholder="linea" class="form-control"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <span>Modelo</span>
                                                <input v-model="Fiador.modelo" required type="number" min="2005" class="form-control"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <span>Carroceria tipo</span>
                                                <input v-model="Fiador.tipo" required type="text" placeholder="tipo de carroceria" class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-lg-4">
                                                <span>Color</span>
                                                <input v-model="Fiador.color" required type="text" placeholder="color" class="form-control"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <span>Manifiesto</span>
                                                <input v-model="Fiador.manifiesto" required type="text" placeholder="modelo" class="form-control"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <span>Licencia de transito</span>
                                                <input v-model="Fiador.licTransito" required type="text" placeholder="Licencia de transito" class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-lg-4">
                                                <span>Placa</span>
                                                <input v-model="Fiador.placa" required type="text" placeholder="Placa" class="form-control"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <span># de Motor</span>
                                                <input v-model="Fiador.motor" required type="text" placeholder="# de modelo" class="form-control"/>
                                            </div>
                                            <div class="col-lg-4">
                                                <span># de Chasis</span>
                                                <input v-model="Fiador.chasis" required type="text" placeholder="# de chasis" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-6">
                                                <span>Servicio</span>
                                                <input v-model="Fiador.servicio" required type="text" min="13" placeholder="Servicio"  class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                            <span>Cilindraje</span>
                                            <input
                                                v-model="Fiador.cilindraje"
                                                required
                                                type="text"
                                                placeholder="precio"
                                                class="form-control"
                                            />
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-4">
                                            <span>Seguro activo</span>
                                            <select v-model="Fiador.seguro" required class="custom-select">
                                                <option value="vencido">Vencido</option>
                                                <option value="activo">Activo</option>
                                            </select>
                                            </div>
                                            <div class="col-md-4">
                                                <span>Fecha vencimiento Seguro</span>
                                                <input v-model="Fiador.venceSeguro" required type="date" class="form-control" />
                                            </div>
                                            <div class="col-md-4">
                                                <span># de seguro</span>
                                                <input v-model="Fiador.numSeguro" required type="text" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-6">
                                                <span>Tecnomecanica activa</span>
                                                <select v-model="Fiador.tecnicomecanica" required class="custom-select">
                                                    <option value="vencido">Vencido</option>
                                                    <option value="activo">Activo</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <span>Fecha vencimiento tecnicomecania</span>
                                                <input v-model="Fiador.venceTecno" required type="date" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-6">
                                                <span>Nombre del propietario</span>
                                                <input
                                                    v-model="Fiador.nombrePropietario"
                                                    required
                                                    type="text"
                                                    class="form-control"
                                                />
                                            </div>
                                            <div class="col-md-6">
                                            <span># CC propietario</span>
                                            <input
                                                v-model="Fiador.ccPropietario"
                                                required
                                                type="number"
                                                class="form-control"
                                            />
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>                                    
                                <div v-if="fiador" class="col-lg-12 bg-white border p-4">
                                    <div class="card p-4">
                                    <div class="card-head text-center">
                                        <h2 class="p-4">Fiador</h2>
                                    </div>
                                    <div class="form-group">
                                        <span>Nombre Fiador</span>
                                        <input
                                        v-model="Fiador.nombreFiador"
                                        required
                                        type="text"
                                        min="3"
                                        placeholder="Nombre"
                                        class="form-control"
                                        />
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-lg-6">
                                        <span>1 Apellido fiador</span>
                                        <input
                                            v-model="Fiador.primerApellidoFiador"
                                            required
                                            type="text"
                                            min="3"
                                            placeholder="primer apellido"
                                            class="form-control"
                                        />
                                        </div>
                                        <div class="col-lg-6">
                                        <span>2 apellido fiador</span>
                                        <input
                                            v-model="Fiador.segundoApellidoFiador"
                                            required
                                            type="text"
                                            min="3"
                                            placeholder="segundo apellido"
                                            class="form-control"
                                        />
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <span>Numero de Cedula fiador</span>
                                        <div class="input-group mb-3">
                                        <input
                                        v-model="Fiador.cedulaFiador"
                                        required
                                        type="number"
                                        min="9999"
                                        placeholder="CC"
                                        class="form-control"
                                        />
                                        <div class="input-group-append btn btn-warning" @click="validarFiador(Fiador.cedulaFiador)"> validar Fiador</div>
                                        </div>                    
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-lg-6">
                                        <span>Celular</span>
                                        <input
                                            v-model="Fiador.celularUnoFiador"
                                            required
                                            type="number"
                                            min="0"
                                            placeholder="Celular personal"
                                            class="form-control"
                                        />
                                        </div>
                                        <div class="col-lg-6">
                                        <span>Otro Numero de contacto</span>
                                        <input
                                            v-model="Fiador.celularDosFiador"
                                            required
                                            type="number"
                                            min="0"
                                            placeholder="Otro numero de contacto"
                                            class="form-control"
                                        />
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-4">
                                        <span>Direccion</span>
                                        <input
                                            v-model="Fiador.direccionFiador"
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
                                            v-model="Fiador.barrioFiador"
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
                                            v-model="Fiador.ciudadFiador"
                                            required
                                            type="text"
                                            min="13"
                                            placeholder="Direccion"
                                            class="form-control"
                                        />
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-6">
                                        <span>Tipo de vivienda</span>
                                        <select v-model="Fiador.tViviendaFiador" required class="custom-select">
                                            <option value="propia">Propia</option>
                                            <option value="familiar">Familiar</option>
                                            <option value="alquiler">Alquiler</option>
                                        </select>
                                        </div>
                                        <div class="col-md-6">
                                            <span>Personas a cargo</span>
                                            <input
                                                v-model="Fiador.PcargoFiador"
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
                                            v-model="Fiador.emailFiador"
                                            type="email"
                                            min="13"
                                            placeholder="Email"
                                            class="form-control"
                                        />
                                        </div>
                                        <div class="col-md-6">
                                        <span>Edad</span>
                                        <input
                                            v-model="Fiador.edadFiador"
                                            required
                                            type="number"
                                            min="16"
                                            class="form-control"
                                        />
                                        </div>
                                    </div>
                                    <div class="btn-group">
                                        <div class="col-md-6" >
                                            <div class="custom-control custom-switch">
                                                <input type="checkbox" class="custom-control-input"  
                                                @click="infoLabF= true, fpension=false, Fiador.infolaboralFiador={}"  id="fiadors" v-model="infoLabF" >
                                                <label class="custom-control-label" for="fiadors" >Agregar informacion laboral fiador</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6" >
                                            <div class="custom-control custom-switch">
                                                <input type="checkbox" class="custom-control-input" v-model="fpension"
                                                @click="infoLabF= false, Fiador.infolaboralFiador='Pensionado'" id="fpensionado">
                                                <label class="custom-control-label" for="fpensionado" >Si es pensionado</label>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="row" id="infoLabFiador" v-if="infoLabF" >
                                        <div class="col-md-12">
                                            <h2 class="text-center">Informacion laboral Fiador</h2>
                                        </div>
                                        <br />
                                        <div class="col-md-12">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text">Nombre de la empresa</label>
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    @keyup="quitarBoton()"
                                                    class="form-control"
                                                    v-model="Fiador.infolaboralFiador.nombreEmpresa"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6">                                            
                                            <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Ciudad</label>
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                @keyup="quitarBoton()"
                                                class="form-control"
                                                v-model="Fiador.infolaboralFiador.ciudadEmpresa"
                                            />
                                            </div>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text">Cargo</label>
                                                </div>
                                                <input type="text" required @keyup="quitarBoton()" class="form-control" v-model="Fiador.infolaboralFiador.cargoEmpleado"/>
                                            </div>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text">Salario</label>
                                                </div>
                                                <input type="number" required @keyup="quitarBoton()" class="form-control" v-model="Fiador.infolaboralFiador.salarioEmpleado"/>                                        
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <label class="input-group-text">Direccion</label>
                                            </div>
                                            <input type="text" required @keyup="quitarBoton()" class="form-control" v-model="Fiador.infolaboralFiador.direccionEmpresa"/>
                                            </div>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text">Telefono</label>
                                                </div>
                                                <input type="text" required @keyup="quitarBoton()" class="form-control" v-model="Fiador.infolaboralFiador.telefonoEmpresal"/>
                                            </div>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text">Correo laboral</label>
                                                </div>
                                                <input type="mail" required @keyup="quitarBoton()" class="form-control" v-model="Fiador.infolaboralFiador.correoLaboral"/>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text">Otros Ingresos</label>
                                                </div>
                                                <input type="number" required @keyup="quitarBoton()" class="form-control" v-model="Fiador.infolaboralFiador.otrosIngresosEmpleado"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="jumbotron alert alert-info text-center" v-if="fpension">
                                        Obligatoriamente el fiador debera presentar los dos ultimos desprendibles de pago de la pension
                                    </div>
                                    <div class="jumbotron alert alert-info text-center" v-else>
                                        Obligatoriamente el fiador debera presentar los dos ultimos desprendibles de pago de la empresa donde labora o 
                                        una carta laboral vigente 
                                    </div>
                                </div>
                                <div v-if="fiadorPrenda">
                                    <div class="jumbotron alert alert-danger text-center">
                                        Podras dejar el credito sin fiador o prenda cuando el cliente cumpla con el paso anterior<br>
                                        <strong>Si el credito es para compra de vehiculo por pignoracion, no se guardara prenda, y podrá dejar 
                                             este espacio sin fiador, ya que la prenda sera requerida en la aprobacion del credito</strong><br>
                                        <br><strong>Todo esto, si el empleado nó lo considera necesario.</strong>
                                    </div>
                                </div> 
                            </div>
                            <div class="card-footer bg-info">
                            </div>                            
                        </div>    
                    </div>
                    <div class="p-2">
                        <div class="card">
                            <div class="card-header bg-info text-center">
                                <h2 class="text-white"><strong>Referencias</strong></h2>
                            </div>
                            <div class="card-body col-sm-12 mx-auto">
                                <div>
                                    <h2 class="text-center">Referencias Familiares</h2>
                                    <br />
                                    <div class="row text-center p-4">
                                        <table class="table table-hover table-sm border col-md-12">
                                            <thead class="sticky-top text-white bg-dark">
                                                <tr>    
                                                    <th class="col-sm-6">nombre</th>
                                                    <th>direccion</th>
                                                    <th>telefono</th>
                                                    <th>parentesco</th>
                                                    <th v-if="rfF.length>0">Quitar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="refamiliar,index in rfF" :key="index">
                                                    <td>{{refamiliar.nombreRF}}</td>
                                                    <td>{{refamiliar.direccionRF}}</td>
                                                    <td>{{refamiliar.telefonoRF}}</td>
                                                    <td>{{refamiliar.parentescoRF}}</td>
                                                    <td>
                                                        <div class="btn btn-outline-danger btn-sm"  @click="rfF.splice(index,1)">
                                                            <b-icon-backspace-fill></b-icon-backspace-fill>
                                                        </div>
                                                    </td>
                                                </tr>                                                                                           
                                            </tbody>
                                        </table>
                                        <div class="input-group mb-3" v-if="rfF.length<3">
                                            <input type="text" v-model="rfamiliar.nombreRF" class="form-control col-sm-6"/>
                                            <input type="text" v-model="rfamiliar.direccionRF" class="form-control  col-sm-2"/>
                                            <input type="number" min="0" v-model="rfamiliar.telefonoRF" class="form-control  col-sm-2" />
                                            <input type="text" v-model="rfamiliar.parentescoRF" class="form-control  col-sm-2"/>
                                        </div>                                    
                                        <div class="btn-group btn-block">
                                            <div class="btn btn-outline-success mx-auto" @click="validarReferencia(rfamiliar)" v-if="rfF.length<3">
                                                <b-icon-plus></b-icon-plus> Cargar ref
                                            </div>
                                         </div> 
                                    </div>
                                </div>
                                <div >
                                    <h2 class="text-center">Referencias Personales</h2>
                                    <br />
                                    <div class="row text-center p-4">
                                        <table class="table table-hover table-sm border col-md-12">
                                            <thead class="sticky-top text-white bg-dark">
                                                <tr>
                                                    <th class="col-sm-6">nombre</th>
                                                    <th>direccion</th>
                                                    <th>telefono</th>
                                                    <th v-if="rfP.length>0">Quitar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="refpersonal,index in rfP" :key="index">
                                                    <td>{{refpersonal.nombreRF}}</td>
                                                    <td>{{refpersonal.direccionRF}}</td>
                                                    <td>{{refpersonal.telefonoRF}}</td>
                                                    <td>
                                                        <div class="btn btn-outline-danger btn-sm"  @click="rfP.splice(index,1)">
                                                            <b-icon-backspace-fill></b-icon-backspace-fill>
                                                        </div>
                                                    </td>
                                                </tr>                                                                              
                                            </tbody>
                                        </table>
                                        <div class="input-group mb-3" v-if="rfP.length<3">
                                            <input type="text" v-model="rfpersonal.nombreRF" class="form-control  col-sm-6"/>
                                            <input type="text" v-model="rfpersonal.direccionRF" class="form-control  col-sm-3"/>
                                            <input type="number" min="0" v-model="rfpersonal.telefonoRF" class="form-control  col-sm-3"/>
                                        </div> 
                                        <div class="btn-group btn-block">
                                            <div class="btn btn-outline-success mx-auto" @click="validarReferenciaP(rfpersonal)" v-if="rfP.length<3">
                                                <b-icon-plus></b-icon-plus> Cargar ref
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div class="alert alert-info text-center col-md-12" v-if="rfF.length<2 || rfP.length<2">
                                    debes escribir al menos <span v-if="rfF.length<2">2 referencias familiares</span> <span v-if="rfF.length<2&&rfP.length<2">y</span> <span v-if="rfP.length<2">2 referencias personales</span>
                                </div>
                            </div>
                            <div class="card-footer bg-info">
                            </div>                            
                        </div>
                    </div>                    
                    <div class="p-2" v-if="mostrarCalculo">
                        <div class="card">
                            <div class="card-header bg-info text-center">
                                <h2 class="text-white"><strong>Descripcion Credito</strong></h2>
                            </div>
                            <div class="card-body row col-sm-12 mx-auto">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div id class="form-control">Interes Mensual: {{new Intl.NumberFormat('es-CO').format(valores.interesMensual)}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div id class="form-control">Total Credito: {{new Intl.NumberFormat('es-CO').format(valores.valorTotalCredito)}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div id class="form-control">Cantidad Cuotas: {{new Intl.NumberFormat('es-CO').format(valores.cantidadCuotas)}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div id class="form-control">Valor Cuota: {{new Intl.NumberFormat('es-CO').format(valores.valorCuota)}}</div>
                                    </div>
                                    <div class="container mx-auto border row" v-for="pagares,index in valores.pagares" :key="index">
                                        <div class="col-md-1">{{index+1}}</div>
                                        <div class="col-md-4">fecha pago: {{verFecha(pagares.fecha)}}</div>
                                        <div class="col-md-4">capital: {{new Intl.NumberFormat('es-CO').format(pagares.capital)}}</div>
                                        <div class="col-md-3">interes: {{new Intl.NumberFormat('es-CO').format(pagares.interes)}}</div>                                          
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-info">
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="col-md-12">
                            <div v-if="boton" class="btn btn-primary btn-block" @click="guardarCredito()">
                                Guardar Credito                                
                            </div>
                            <button class="btn btn-success btn-block"><h2><strong>Calcular credito</strong></h2></button>
                        </div>
                    </div>
                </form> 
            </div>            
        </div>
    </div>
</template>

<script>
import f from '../funciones/funciones.js'
import {mapState,mapMutations} from "vuex"
class prendaa {
  constructor(
    tipoVehiculo,
    marca,
    modelo,
    tipo,
    color,
    manifiesto,
    licTransito,
    placa,
    motor,
    chasis,
    servicio,
    cilindraje,
    seguro,
    venceSeguro,
    venceTecno,
    numseguro,
    tecnicomecanica,
    nombrePropietario,
    ccPropietario
  ){
    this.fiador_o_prenda = "prenda";
    this.tipoVehiculo = tipoVehiculo;
    this.marca = marca;
    this.modelo = modelo;
    this.tipo = tipo;
    this.color = color;
    this.manifiesto = manifiesto;
    this.licTransito = licTransito;
    this.placa = placa;
    this.motor = motor;
    this.chasis = chasis;
    this.servicio = servicio;
    this.cilindraje = cilindraje;
    this.seguro = seguro;
    this.venceSeguro = venceSeguro;
    this.numSeguro = numseguro;
    this.tecnicomecanica = tecnicomecanica;
    this.venceTecno = venceTecno;
    this.nombrePropietario = nombrePropietario;
    this.ccPropietario = ccPropietario;
  }
}
class fiadorr {
  constructor(
    nombreFiador,
    primerApellidoFiador,
    segundoApellidoFiador,
    cedulaFiador,
    celularUnoFiador,
    celularDosFiador,
    direccionFiador,
    barrioFiador,
    ciudadFiador,
    tViviendaFiador,
    PcargoFiador,
    emailFiador,
    edadFiador,
  ) {
    this.fiador_o_prenda = "fiador";
    this.nombreFiador = nombreFiador;
    this.primerApellidoFiador = primerApellidoFiador;
    this.segundoApellidoFiador = segundoApellidoFiador;
    this.cedulaFiador = cedulaFiador;
    this.celularUnoFiador = celularUnoFiador;
    this.celularDosFiador = celularDosFiador;
    this.direccionFiador = direccionFiador;
    this.barrioFiador = barrioFiador;
    this.ciudadFiador = ciudadFiador;
    this.tViviendaFiador = tViviendaFiador;
    this.PcargoFiador = PcargoFiador;
    this.emailFiador = emailFiador;
    this.edadFiador = edadFiador;
    this.infolaboralFiador = ''
  }
}
export default {
    middleware: 'auth',
    props:['cli'],
    async mounted(){
        this.cliente = this.cli
        this.tot = await this.contarCreditos()
    },
    data(){
        return{
            cliente: {},
            tot : null,
            fiador:false,
            prenda:false,
            fiadorPrenda: false,
            estadoEmpleo:{
                emplee: false,
                indepp: false,
                pensionado:false,
                desempleado:true,
            },
            a:0,
            productosTipo:[],
            tipos:[],
            creditoArticulo:{
                credito:true,
                articulo:false,
            },
            credit: {
                cantidad:0,
                interes:0,
                tiempo:0,
                cuotaInicial:0,
            },
            validado:false,
            options:[
                'Mensual','Quincenal','Semanal','Pago Unico'
            ],
            hoy: 0,
            pfecha: 0,
            verHoy:false,
            verHoyy:false,
            date:'',
            pfechaComparacion:0,
            fueraDeRango:false,
            boton: false,  
            rfF:[],     
            rfP:[],      
            rfamiliar:{},
            rfpersonal: {},
            infoLabF : false,
            infoLabFiador: {},
            fpension:false,
            infoLab: {},
            mostrarCalculo:true, 
            valores:{
                interesMensual:0,
                valorTotalCredito:0,
                cantidadCuotas:0,
                valorCuota:0,
                pagares:[]
            },           
            Fiador: {},
            tot: 0,     
            Vcred:'',
            valCuotaMensual:'',
            demas:0,
            aumentoPorDias:0,
            activo:false,
            productoAvender:false,
            valorVenta :0, 
            credito:{}
        };     
    },
    computed:{        
        sumar : function(){
            return f.sumar(this.credit.cantidad,this.credit.interes,this.credit.cuotaInicial,this.credit.tiempo,this.aumentoPorDias)
        }       
    },
    methods: {
        ...mapMutations('storeViewComponentsCreditos',['estadoBuscadorClienteCreditoNuevo','estadoBotonAgregarCredito','estadoCargarCreditos']),
        async validarFiador(cedulaFiador){
            const cc={
                cedulaFiador:cedulaFiador
            }
            const fiador = await this.$axios.$post('/creditos/fiadorUnico',cc)
            console.log(fiador)
            if(fiador.length<1){
                alert('no existe fiador con esa cedula se procedera a buscar por clientes')
                this.Fiador = new fiadorr()
                this.verClienteFiador(cc)
            }else{
                this.Fiador = fiador[0]
            }
        },
        async verClienteFiador(cedula){
            console.log(cedula.cedulaFiador)
            const ccc = cedula.cedulaFiador
            let cc = {
                cedulaId:ccc
            }
            const fiador = await this.$axios.$post('/clientes/busqueda',cc)
            if(fiador.success){
                if(fiador.cliente.length<1){
                    alert('No exste cliente con esa cedula para servirlo de fiador')
                    this.Fiador = new fiadorr()
                }else{
                    this.Fiador.nombreFiador = fiador.cliente[0].nombreCliente
                    this.Fiador.primerApellidoFiador = fiador.cliente[0].primerApellidoCliente
                    this.Fiador.segundoApellidoFiador = fiador.cliente[0].segundoApellidoCliente
                    this.Fiador.cedulaFiador = fiador.cliente[0].cedulaId
                    this.Fiador.celularUnoFiador = fiador.cliente[0].celularUno
                    this.Fiador.celularDosFiador = fiador.cliente[0].celularDos
                    this.Fiador.barrioFiador = fiador.cliente[0].barrioCliente
                    this.Fiador.tViviendaFiador = fiador.cliente[0].tViviendaCliente
                    this.Fiador.ocupacionFiador = fiador.cliente[0].OcupacionCliente
                    this.Fiador.direccionFiador = fiador.cliente[0].direccionCliente
                    this.Fiador.ciudadFiador = fiador.cliente[0].ciudadCliente
                    this.Fiador.emailFiador = fiador.cliente[0].emailCliente
                    this.Fiador.edadFiador = fiador.cliente[0].edadCliente
                    this.Fiador.PcargoFiador = fiador.cliente[0].PcargoCliente
                }                
            }
            console.log(fiador.cliente)
        },
        validarReferencia(rfamiliar){
            if(rfamiliar.nombreRF == '' || rfamiliar.nombreRF==undefined
                ||rfamiliar.direccionRF=='' || rfamiliar.direccionRF ==undefined
                ||rfamiliar.telefonoRF=='' || rfamiliar.telefonoRF ==undefined
                ||rfamiliar.parentescoRF=='' || rfamiliar.parentescoRF ==undefined)
            {
                alert('no deben haber campos vacios')
                return
            }else{
                this.rfF.push(rfamiliar)
                this.rfamiliar={}
            }            
        },
        validarReferenciaP(rfpersonal){
            if(rfpersonal.nombreRF == '' || rfpersonal.nombreRF==undefined
                ||rfpersonal.direccionRF=='' || rfpersonal.direccionRF ==undefined
                ||rfpersonal.telefonoRF=='' || rfpersonal.telefonoRF ==undefined)
            {
                alert('no deben haber campos vacios')
                return
            }else{
                this.rfP.push(rfpersonal)
                this.rfpersonal={}
            }            
        },
        tipoCredito(){
            this.credit.servicio = ''
            this.credit.interes = 0
            this.credit.cantidad = 0
            this.productoAvender=false
        },
        async contarCreditos(){
            const res = await this.$axios.$post('/creditos/contarCreditos')
            return res.cantidad + 1
        },
        quitarBoton() {
            this.boton = false;
        },
        validService() {
            if (this.credit.servicio == "pignoracion") {                
                (this.fiador = false), (this.prenda = true);
                this.Fiador = new prendaa();
            } else {
                (this.fiador = true), (this.prenda = false);
                this.Fiador = new fiadorr();
            }
        },
        comparar(){
            let u = new Date(this.pfechaComparacion)
            let unoo = u.setHours(23,59,59)
            let uno = new Date(unoo)
            let d = new Date(this.date)
            let doss = d.setDate(d.getDate()+1)
            doss = d.setHours(23,59,59)
            let dos =new Date(doss)
            var fechaInicio = new Date(this.pfechaComparacion).getTime();
            var fechaFin = new Date(dos).getTime();
            const f = new Date(fechaFin)
            const diasMes = new Date(f.getFullYear(), f.getMonth()+1, 0).getDate();
            var diff = fechaFin - fechaInicio;
            diff = (diff/(1000*60*60*24)); 
            this.demas = parseInt(diff);   
            this.aumentoPorDias = 0       
            if (this.demas>0) {
                this.fueraDeRango = false
                const cantidad = this.credit.cantidad
                const interes = this.credit.interes
                const valInteres = interes * cantidad / 100
                const valIntDia = valInteres/diasMes
                const total = parseInt(valIntDia * this.demas)
                this.aumentoPorDias = total 
                if(uno>dos){
                    this.aumentoPorDias = 0
                }                 
            }else{                
                let ff = new Date(this.hoy)
                if(f<ff){
                    this.fueraDeRango =true
                }else{
                    
                    this.fueraDeRango =false
                }
            }             
        },
        cargarInfo(frecuencia){
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            let pf = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))             
            if(frecuencia==='Mensual' || frecuencia==='Pago Unico'){
                pf = pf.setDate(pf.getDate()+8)
                let rpf = new Date(pf)
                let r = hoy.setDate(hoy.getDate()+8)
                this.hoy = this.verFecha(r)
                let rr = rpf.setMonth(rpf.getMonth()+1)
                this.pfechaComparacion = new Date(rr)
                this.pfecha = this.verFecha(rr)
                this.verHoy = true
                this.verHoyy = false
            }
            if(frecuencia==='Quincenal'){
                let r = hoy.setDate(hoy.getDate()+7)
                this.hoy = this.verFecha(r)
                let pf = new Date(r)
                pf = pf.setDate(pf.getDate()+15)
                this.pfechaComparacion = new Date(pf)
                this.pfecha = this.verFecha(pf)
                this.verHoy = true
                this.verHoyy = false
            }
            if(frecuencia==='Semanal'){
                this.verHoy = false
                let n = parseInt(this.credit.tiempo)
                let r = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
                let rr = r.setMonth(r.getMonth()+n)
                this.hoy = this.verFecha(rr,1)
                this.verHoyy = true
            }
        },
        verFecha(fecha,n){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            if(n==1){
                const  y = meses[fech.getMonth()]+' del año '+ fech.getFullYear() 
                return y 
            }else{
                const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
                return y 
            }         
        },
        restarCantidad(){
            this.credit.cantidad = this.valorVenta
            this.credit.cantidad = this.credit.cantidad - this.credit.cuotaInicial
        }, 
        async verTipos(){
            this.tipos  = await this.$axios.$get('/productos/verTipos')  
        },
        referirProducto(id){
            console.log(id)
            const result = this.productosTipo.filter(producto => producto._id == id)
            console.log(result)
            this.valorVenta = result[0].valorVenta
            this.credit.cantidad = result[0].valorVenta
        },
        async validTipo(x){
            let tipo={
                tip:x
            }
            this.productosTipo =  await this.$axios.$post('/productos/productosTipo',tipo) 
            if(this.productosTipo.length>0){
                this.productoAvender = true
            }else{
                this.productoAvender = false
                console.log('no hay productos en esta categoria')
            }               
        },
        calcularCredito(){
            this.credito = {}
            this.credito.referidos = []
            this.credito.cliente = this.cliente[0]._id
            //primer paso revisar que esten dilignciados todos los campos de la solicitud de credito
            if(this.creditoArticulo.credito){
                if(this.credit.servicio==''||this.credit.servicio==undefined ||
                   this.credit.cantidad==0||this.credit.cantidad==undefined ||
                   this.credit.interes==0 ||this.credit.interes==undefined ||
                   this.credit.cuotaInicial<0||this.credit.cuotaInicial==undefined ||
                   this.credit.tiempo==0 ||this.credit.tiempo==undefined ||
                   this.credit.frecuencia==''||this.credit.frecuencia==undefined
                ){
                    this.boton = false
                    alert('Existen campos sin diligenciar')
                    this.validado = false
                    return
                }else{
                    if(this.credit.frecuencia=='Mensual' || this.credit.frecuencia=='Quincenal'){
                        if(this.date.length==0){
                            alert('Diligencia la fecha de pago para continuar')
                            return
                        }
                    }
                }  
            }
            if(this.creditoArticulo.articulo){
                //validamos que haya escogido un tipo de producto valido
                if(this.agTipo){
                    alert('No es un tipo de producto valido')
                    this.validado = false
                    return
                }else{
                    if(this.credit.servicio==''||this.credit.servicio==undefined ||
                        this.credit.producto==''||this.credit.producto==undefined ||
                        this.credit.cantidad==0||this.credit.cantidad==undefined ||
                        this.credit.interes==0 ||this.credit.interes==undefined ||
                        this.credit.cuotaInicial<0||this.credit.cuotaInicial==undefined ||
                        this.credit.tiempo==0 ||this.credit.tiempo==undefined ||
                        this.credit.frecuencia==''||this.credit.frecuencia==undefined
                    ){
                        this.validado = false
                        this.boton = false
                        alert('Existen campos sin diligenciar')
                        return
                    }else{
                        if(this.credit.frecuencia=='Mensual' || this.credit.frecuencia=='Quincenal'){
                            if(this.date.length==0){
                                alert('Diligencia la fecha de pago para continuar')
                                return
                            }
                        }
                    }                    
                }                
            }
            //validamos que la fecha establecida sea una fecha valida
            if (this.fueraDeRango) {
                this.boton = false
                alert('Error en la fecha') 
                this.validado = false
                return                
            }
            this.credit.fechaPago = this.date
            this.credito.credito = this.credit  
            this.credito.credito.creadoPor = this.$auth.$state.user._id
            this.credito.credito.cantidad = parseInt(this.credito.credito.cantidad)
            this.credito.credito.interes = parseFloat(this.credito.credito.interes)
            this.credito.credito.tiempo = parseInt(this.credito.credito.tiempo)
            this.credito.credito.inicial = parseInt(this.credito.credito.cuotaInicial) 
            this.credito.credito.aumentoPorDias = parseInt(this.aumentoPorDias)            
            if(this.estadoEmpleo.emplee){
                this.credito.infoLab = this.infoLab
            }
            if(this.estadoEmpleo.indepp){
                this.credito.infoLab = this.infoLab
            }
            if(this.estadoEmpleo.desempleado){
                this.credito.infoLab = 'Desempleado'
            }
            if(this.estadoEmpleo.pensionado){
                this.credito.infoLab = 'Pensionado'
            }
            if(this.estadoEmpleo.desempleado==true && this.fiadorPrenda==true){
                this.boton = false
                alert('El cliente debe estar empelado o tener un fiador o prenda que respalde la deuda')
                return
            }
            if(this.fiador){
                if(this.infoLabF==false && this.fpension == false){
                    return alert ('El fiador debe estar pensionado o ser empleado')
                }else{
                    this.credito.fiador = this.Fiador
                }                
            }
            if(this.prenda){
                this.credito.prenda = this.Fiador
            }
            if(this.rfP.length<2){
                this.validado = false
                this.boton = false
                alert('faltan referencias personales')
                return
            }else{
                for (let a = 0; a < this.rfP.length; a++) {
                    this.credito.referidos.push(this.rfP[a]);                    
                }
            }
            if(this.rfF.length<2){
                this.validado = false
                this.boton = false
                alert('faltan referencias Familiares')
                return
            }else{
                for (let a = 0; a < this.rfF.length; a++) {
                    this.credito.referidos.push(this.rfF[a]);                    
                }
                this.validado = true
                this.boton = false
            }  
            //si validamos que todos los campos estan llenos y que toda la informacion esta completa
            //procedemos a hacer los calculos para mostrar los valores del credito 
            if(this.validado){
                this.valores.interesMensual= f.calcularInteresMensual(this.credito.credito.cantidad,this.credito.credito.interes)
                this.valores.valorTotalCredito=f.totalCredito(this.credito.credito.tiempo,this.credito.credito.cantidad,this.valores.interesMensual)
                let respuesta = f.pagares(this.credito.credito.frecuencia,this.credito.credito.tiempo,this.credito.credito.cantidad,
                this.credito.credito.interes,this.valores.interesMensual,this.credito.credito.fechaPago)
                this.valores.cantidadCuotas=respuesta.cantidadCuotas
                this.valores.valorCuota=respuesta.valorCuota
                this.valores.pagares = respuesta.pagares
                this.credito.valores = this.valores
                this.credito.nombreCliente = this.cliente[0].nombreCliente+' '+this.cliente[0].primerApellidoCliente+' '+this.cliente[0].segundoApellidoCliente
                this.credito.cedulaCliente = this.cliente[0].cedulaIdCliente
                this.boton = true
            }
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
                
            })
            .catch(err => console.log(err));
        },
        async guardarCredito(){
            const credito = this.credito
            console.log(credito)
            const guardarCredito = await this.$axios.$post('/creditos/guardarCredito',credito)
            if(guardarCredito.success){
                if(credito.credito.producto){
                    this.entregarProducto(credito.credito.producto,credito.credito.cantidad,credito.cliente,false)
                }
                this.estadoEmpleo={
                    emplee: false,
                    indepp: false,
                    pensionado:false,
                    desempleado:true,
                }
                this.credit= {
                    cantidad:0,
                    interes:0,
                    tiempo:0,
                    cuotaInicial:0,
                }
                this.valores={
                    interesMensual:0,
                    valorTotalCredito:0,
                    cantidadCuotas:0,
                    valorCuota:0,
                    pagares:[]
                }
                this.cliente = {}
                this.estadoBuscadorClienteCreditoNuevo(false)
                this.estadoBotonAgregarCredito(false)
                this.estadoCargarCreditos(true)
                this.$router.push('/creditos/Solicitudes')
            }
        }
    },
}
</script>

<style>

</style>