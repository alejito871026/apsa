<template>
    <div class="card bg-primary text-white">
        <div class="p-2 text-center">
            calcular los pagares y el nuevo credito con el servicio, asignamos los mismos referidos, fiador, prenda, y demas objetos pertenecientes al credito
            realizar los ingresos por el pago del credito anterior, actualizamos la informacion en los pagares, actualizamos la informacion en la cartera,
            actualizamos el estado del credito y creamos el credito nuevo.
            <h2 class="p-2">Credito # {{totalCreditos}} renovacion</h2>
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
                <div class="card-body row">
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
                            <div class="alert alert-warning" v-if="!compararr">La cantidad solicitada debe superar el valor de la deuda anterior {{valores.capital+valores.interes}}</div>
                            <div class="alert alert-warning" v-else>Perfecto !!!</div>
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
                    <div class="col-md-4 text-dark">
                        <h3 class="p-1">Valores anteriores</h3>
                        <br>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">#</label>
                            </div>
                            <div class="form-control">{{credito.numeroCredito}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Servicio</label>
                            </div>
                            <div class="form-control">{{credito.servicio}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Capital prestado</label>
                            </div>
                            <div class="form-control">{{credito.cantidad}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Interes</label>
                            </div>
                            <div class="form-control">{{credito.interes}} %</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Debe a capital</label>
                            </div>
                            <div class="form-control">{{valores.capital}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text">Debe a interes</label>
                            </div>
                            <div class="form-control">{{valores.interes}}</div>
                        </div>
                        <div class="alert alert-danger">El valor a entregar luego de descontar lo que se adeuda del credito anterior es de ${{descuento}}</div>
                    </div>
                </div>                            
                <div class="card-footer bg-info">
                </div>
            </div>
            <div class="card text-dark">
                <div class="card-body">
                <div class="p-1" v-if="credito.infoLab.infoLaboral !='Desempleado'">
                    <h2 class="p-2">Informacion Laboral</h2>
                    <div class="input-group mb-3" v-if="credito.infoLab.infoLaboral ==='Pensionado'">
                        <span class="input-group-text">Pensionado</span>
                        <div class="form-control">si</div>                        
                    </div>
                    <div class="row" v-else>                    
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Empresa</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.nombreEmpresa}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.ciudadEmpresa}}</div>
                            </div>
                            <div class="input-group mb-3" v-if="credito.infoLab.infoLaboral.cargoEmpleado">
                                <span class="input-group-text">Cargo</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.cargoEmpleado}}</div>                        
                            </div>
                            <div class="input-group mb-3" v-if="credito.infoLab.infoLaboral.cyc">
                                <span class="input-group-text">Camara y comercio</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.cyc}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Direccion</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.direccionEmpresa}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Salario</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.salarioEmpleado}}</div>
                            </div>  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.ciudadEmpresa}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Telefono</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.telefonoEmpresa}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Otros ingresos</span>
                                <div class="form-control">{{credito.infoLab.infoLaboral.otrosIngresosEmpleado}}</div>                        
                            </div>
                        </div>
                        <div class="input-group mb-3 p-3" v-if="credito.infoLab.infoLaboral.descripcionActividad">
                            <span class="input-group-text">Descripcion actividad</span>
                            <div class="form-control">{{credito.infoLab.infoLaboral.descripcionActividad}}</div>
                        </div>
                    </div>
                </div>  
                <div class="border border-primary p-1" v-else>
                    <h2 class="p-2">Informacion Laboral</h2>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Desempleado</span>
                        <div class="form-control">si</div>                        
                    </div>
                </div>                 
                </div>
                <div class="card-body">
                    <h3>Referencias</h3>
                    <div class="row">
                        <div v-for="referencia, index in referidos" :key="index" class="col-md-6">
                            <h4 class="p-2">referencia {{index+1}}</h4>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Nombre</span>
                                <div class="form-control">{{referencia.nombreRF}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Direccion</span>
                                <div class="form-control">{{referencia.direccionRF}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Telefono</span>
                                <div class="form-control">{{referencia.telefonoRF}}</div>                        
                            </div>
                            <div class="input-group mb-3" v-if="referencia.parentescoRF">
                                <span class="input-group-text">Parentesco</span>
                                <div class="form-control">{{referencia.parentescoRF}}</div>                        
                            </div>
                        </div> 
                    </div> 

                </div>
                <div class="card-body" v-if="credito.fiador">
                    <h3>Fiador</h3>
                    {{credito.fiador}} 
                    <h2 class="p-2">Fiador</h2>
                    <div class="row">                    
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Nombre</span>
                                <div class="form-control">{{credito.fiador.nombreFiador}} {{credito.fiador.primerApellidoFiador}} {{credito.fiador.segundoApellidoFiador}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Telefono</span>
                                <div class="form-control">{{credito.fiador.celularUnoFiador}}</div>
                                <div class="form-control" v-if="credito.fiador.celularDosFiador">{{credito.fiador.celularDosFiador}}</div>
                            </div>                        
                            <div class="input-group mb-3">
                                <span class="input-group-text">Barrio</span>
                                <div class="form-control">{{credito.fiador.barrioFiador}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Tipo de vivienda</span>
                                <div class="form-control">{{credito.fiador.tViviendaFiador}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Cedula</span>
                                <div class="form-control">{{credito.fiador.cedulaFiador}}</div>
                            </div>  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Direccion</span>
                                <div class="form-control">{{credito.fiador.direccionFiador}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{solicitudActiva.fiador.ciudadFiador}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Personas a cargo</span>
                                <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                            </div>
                        </div>
                        <div class="input-group mb-3 p-3" v-if="credito.fiador.emailFiador">
                            <span class="input-group-text">Personas a cargo</span>
                            <div class="form-control">{{credito.fiador.emailFiador}}</div>                        
                        </div>
                        <h2 class="p-2 mx-auto">Informacion laboral fiador</h2>
                        <div class="input-group mb-3 p-3" v-if="credito.fiador.infolaboralFiador ==='Pensionado'">
                            <span class="input-group-text">Pensionado</span>
                            <div class="form-control">si</div>                        
                        </div>
                        <div v-else>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{credito.fiador.PcargoFiador}}</div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body" v-if="credito.prenda">
                    <h3>Prenda</h3>
                    {{credito.prenda}}  
                </div>
            </div>
            <div class="p-2 text-dark" v-if="mostrarCalculo">
                <div class="card">
                    <div class="card-header bg-info text-center">
                        <h2><strong>Descripcion Credito</strong></h2>
                    </div>
                    <div class="card-body row col-sm-12 mx-auto">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div id class="form-control">Interes Mensual: {{new Intl.NumberFormat('es-CO').format(newCredito.interesMensual)}}</div>
                            </div>
                            <div class="form-group">
                                <div id class="form-control">Total Credito: {{new Intl.NumberFormat('es-CO').format(newCredito.valorTotalCredito)}}</div>
                            </div>
                            <div class="form-group">
                                <div id class="form-control">Cantidad Cuotas: {{new Intl.NumberFormat('es-CO').format(newCredito.cantidadCuotas)}}</div>
                            </div>
                            <div class="form-group">
                                <div id class="form-control">Valor Cuota: {{new Intl.NumberFormat('es-CO').format(newCredito.valorCuota)}}</div>
                            </div>
                            <div class="container mx-auto border row" v-for="pagares,index in newCredito.pagares" :key="index">
                                <div class="col-md-1">{{index+1}}</div>
                                <div class="col-md-4">fecha pago: {{verFecha(pagares.fecha)}}</div>
                                <div class="col-md-4">capital: {{new Intl.NumberFormat('es-CO').format(pagares.capital)}}</div>
                                <div class="col-md-3">interes: {{new Intl.NumberFormat('es-CO').format(pagares.interes)}}</div>                                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div class="col-md-12">
                    <div v-if="boton" class="btn btn-outline-warning btn-block" @click="guardarCredito()">
                        <h2><strong>Guardar Credito</strong></h2>                                
                    </div>
                    <button class="btn btn-success btn-block" @click="calcularCredito(credit,credito,valores)"><h2><strong>Calcular credito</strong></h2></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
import f from '../funciones/funciones.js'
export default {
    props:['_id'],
    async mounted(){
        this.verCredito(),
        this.totalCreditos = await this.contarCreditos()
        this.credit.interes = this.credito.interes
    },
    data() {
        return {
            credito: {
                infoLab:{
                    infoLaboral:{}
                },
            },
            referidos:[],
            valores:{},
            clie:{},
            totalCreditos:0,
            credit:{},
            demas:false,
            creditoArticulo:{
                credito:true,
                articulo:false,
            },
            options:[
                'Mensual','Quincenal','Semanal','Pago Unico'
            ],
            hoy: 0,
            pfecha: 0,
            verHoy:false,
            verHoyy:false,
            agTipo:false,
            date:'',
            pfechaComparacion:0,
            fueraDeRango:false,
            rfF:[],     
            rfP:[],
            infoLab: {},
            demas:0,
            aumentoPorDias:0, 
            Fiador:{},
            spiner:false,          
            boton:false,  
            tipos:[],
            productoAvender:false,            
            comparando:false,
            mostrarCalculo:false,
            informacionLaboralCliente:{},
            newCredito:{},
        }
    },
    computed:{        
        sumar : function(){
            return f.sumar(this.credit.cantidad,this.credit.interes,this.credit.cuotaInicial,this.credit.tiempo,this.aumentoPorDias)
        },
        compararr : function(){
            if(this.credit.cantidad!=undefined && this.credit.cantidad !='' ){
                if(this.credit.cantidad<this.valores.capital+this.valores.interes){
                    return false
                }else{
                    return true
                }
            }else{
               return false 
            }
        },  
        descuento : function(){
            return this.credit.cantidad-(this.valores.capital+this.valores.interes)
        }    
    },
    methods:{
        ...mapMutations('storeViewComponentsCreditos',['estadoBuscadorClienteCreditoNuevo','estadoBotonAgregarCredito','estadoCargarCreditos']),
        async verCredito(){
            let _id=this._id
            this.credito = await this.$axios.$post('/creditos/verCreditoUnicoRenovacion',{_id})
            let valores = await this.$axios.$post('/creditos/verValoresCredito',{_id})
            this.valores = valores[0]
            this.referidos = this.credito.referidos.referidos
            this.clie = this.credito.cliente
            console.log(this.credito)
            console.log(valores)
        },
        async contarCreditos(){
            const res = await this.$axios.$post('/creditos/contarCreditos')
            return res.cantidad + 1
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
        async verTipos(){
            let tipos  = await this.$axios.$get('/productos/verTipos')   
            this.tipos=tipos
            this.tipos.push({tipoProducto:'PARA AGREGAR UN NUEVO PRODUCTO PORFAVOR DIRIJASE AL APARTADO DE PRODUCTOS'})            
        },
        async validTipo(x){
            if(x!='PARA AGREGAR UN NUEVO PRODUCTO PORFAVOR DIRIJASE AL APARTADO DE PRODUCTOS'){
                let tipo={
                    tip:x
                }
                this.agTipo = false
                let productosTipo =  await this.$axios.$post('/productos/productosTipo',tipo)                
                    productosTipo 
                    if(productosTipo.length>0){
                        this.productoAvender = true
                    }else{
                        this.productoAvender = false
                    }
            }else{
                this.agTipo = true 
            }    
        },
        quitarBoton() {
            this.boton = false
            this.mostrarCalculo = false
        },
        validService() {
            if (this.credit.servicio == "pignoracion") {  
                this.Fiador = this.credito.prenda
            } else {
                this.Fiador = this.credito.fiador
            }
        },
        async calcularCredito(creditoNew, creditoOld, valores){
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            let interesMensual = f.calcularInteresMensual(creditoNew.cantidad,creditoNew.interes)
            let valorTotalCredito= f.totalCredito(creditoNew.tiempo,creditoNew.cantidad,interesMensual)
            let respuesta = f.pagares(creditoNew.frecuencia,creditoNew.tiempo,creditoNew.cantidad,creditoNew.interes,interesMensual,this.date)
            this.newCredito = {
                valorTotalCredito,
                cantidadCuotas : respuesta.cantidadCuotas,
                valorCuota : respuesta.valorCuota,                
                cliente:this.credito.cliente._id,
                nombreCliente:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                cedulaCliente:this.credito.cliente.cedulaIdCliente,
                cantidad:creditoNew.cantidad,
                interes:creditoNew.interes,
                cuotaInicial: creditoNew.cuotaInicial,
                tiempo: creditoNew.tiempo,
                frecuencia: creditoNew.frecuencia,
                interesMensual,
                servicio : creditoNew.servicio,
                pagares : respuesta.pagares,
                valTotalCred:valorTotalCredito,
                valCuotaMens:respuesta.valorCuota,
                fechaAgregado: hoy,
                estadoInterno:'Aprobado',
                Fp:respuesta.pagares[0].fecha,
                aumentoPorDias:this.aumentoPorDias,
                creadoPor:this.$auth.$state.user._id,
                OldValores:valores
            }
            if(creditoOld.fiador){
                this.newCredito.fiador = creditoOld.fiador._id
            }
            if(creditoOld.prenda){
                this.newCredito.prenda = creditoOld.prenda._id
            }
            if(creditoOld.infoLab){
                this.newCredito.infoLab = creditoOld.infoLab._id
            }
            if(creditoOld.referidos){
                this.newCredito.referidos = creditoOld.referidos._id
            }            
            this.mostrarCalculo = true
            console.log(this.newCredito)
            this.boton = true
        },
        async guardarCredito(){
            const credito = this.newCredito
            console.log(credito)
            const guardarCredito = await this.$axios.$post('/creditos/guardarRenovacion',credito)
            if(guardarCredito.success){
                this.cliente = {}
                this.estadoBuscadorClienteCreditoNuevo(false)
                this.estadoBotonAgregarCredito(false)
                this.estadoCargarCreditos(true)
                this.$router.push('/creditos/Solicitudes')
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
    }
}
</script>

<style>

</style>