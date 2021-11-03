<template>
    <div><br>
        <div class="card col-md-10 mx-auto">
            <div class="card-body text-center">
                <h2 class="p-2">Informacion credito # {{solicitudActiva.numeroCredito}}</h2>
                <div class="row">                    
                    <div class="col-md-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text"># Credito</span>
                            <div class="form-control">{{solicitudActiva.numeroCredito}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Servicio</span>
                            <div class="form-control">{{solicitudActiva.servicio}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cantidad</span>
                            <div class="form-control">{{solicitudActiva.cantidad}}</div>                        
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Interes</span>
                            <div class="form-control">{{solicitudActiva.interes}} %</div>
                        </div>
                    </div>
                    <div class="col-md-6">    
                        <div class="input-group mb-3">
                            <span class="input-group-text">Tiempo</span>
                            <div class="form-control">{{solicitudActiva.tiempo}}</div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">$ Total</span>
                            <div class="form-control">{{solicitudActiva.valTotalCred}}</div>                        
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">$ cuota mensual</span>
                            <div class="form-control">{{solicitudActiva.valCuotaMens}}</div>                        
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Fecha agreagado</span>
                            <div class="form-control">{{verFecha(solicitudActiva.fechaAgregado)}}</div>                        
                        </div>
                    </div>
                </div>
                <div class="border border-primary p-1">
                    <h2 class="p-2">Informacion cliente</h2>
                    <div class="row">                    
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Nombre</span>
                                <div class="form-control">{{solicitudActiva.cliente.nombreCliente}} {{solicitudActiva.cliente.primerApellidoCliente}} {{solicitudActiva.cliente.segundoApellidoCliente}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Telefono</span>
                                <div class="form-control">{{solicitudActiva.cliente.celularUnoCliente}}</div>                        
                            </div>
                            
                            <div class="input-group mb-3">
                                <span class="input-group-text">Barrio</span>
                                <div class="form-control">{{solicitudActiva.cliente.barrioCliente}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ocupacion</span>
                                <div class="form-control">{{solicitudActiva.cliente.ocupacionCliente}}</div>                        
                            </div>                        
                        </div>
                        <div class="col-md-6">  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Cedula</span>
                                <div class="form-control">{{solicitudActiva.cliente.cedulaIdCliente}}</div>
                            </div>  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Direccion</span>
                                <div class="form-control">{{solicitudActiva.cliente.direccionCliente}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{solicitudActiva.cliente.ciudadCliente}}</div>                        
                            </div>                        
                            <div class="input-group mb-3">
                                <span class="input-group-text">Personas a cargo</span>
                                <div class="form-control">{{solicitudActiva.cliente.PcargoCliente}}</div>                        
                            </div>
                        </div>                    
                        <div class="col-md-12 mx-auto">
                            <h3>Validacion informacion Cliente</h3>    
                            <div class="row" v-if="!solicitudActiva.infoLab.validadoInfoCliente">
                                <div class="col-md-4">
                                    <input type="checkbox" class="form-check-input" id="uno" v-model="informacionCliente.visitaOk">
                                    <label class="form-check-label" for="uno">Visita Realizada</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="checkbox" class="form-check-input" id="tres" v-model="informacionCliente.casaOk">
                                    <label class="form-check-label" for="tres">Casa propia</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="checkbox" class="form-check-input" id="cuatro" v-model="informacionCliente.arrendoOk">
                                    <label class="form-check-label" for="cuatro">Arrendo</label>
                                </div>
                                <div class="col-md-4">                                    
                                    <input type="checkbox" class="form-check-input" id="negocio" v-model="informacionCliente.negocioOk">
                                    <label class="form-check-label" for="negocio">Tiene negocio?</label>
                                </div>                                
                                <div class="col-md-12">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Tiempo viviendo en casa</span>
                                        <input class="form-control" v-model="informacionCliente.tiempoEnCasa">                       
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Observacion</span>
                                        <textarea class="form-control" v-model="informacionCliente.Objecion"></textarea>                        
                                    </div>
                                    <div class="btn btn-block btn-outline-success" @click="guardarValidacionInformacionCliente(informacionCliente,solicitudActiva.infoLab._id)">
                                        Guardar validacion informacion laboral cliente
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="btn btn-outline-warning">Ya se valido! desea editarlo?</div>
                            </div> <br>
                        </div>
                    </div>
                        
                </div>
                <div class="border border-primary p-1" v-if="solicitudActiva.infoLab.infoLaboral !='Desempleado'">
                    <h2 class="p-2">Informacion Laboral</h2>
                    <div class="input-group mb-3" v-if="solicitudActiva.infoLab.infoLaboral ==='Pensionado'">
                        <span class="input-group-text">Pensionado</span>
                        <div class="form-control">si</div>                        
                    </div>
                    <div class="row" v-else>                    
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Empresa</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.nombreEmpresa}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.ciudadEmpresa}}</div>
                            </div>
                            <div class="input-group mb-3" v-if="solicitudActiva.infoLab.infoLaboral.cargoEmpleado">
                                <span class="input-group-text">Cargo</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.cargoEmpleado}}</div>                        
                            </div>
                            <div class="input-group mb-3" v-if="solicitudActiva.infoLab.infoLaboral.cyc">
                                <span class="input-group-text">Camara y comercio</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.cyc}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Direccion</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.direccionEmpresa}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Salario</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.salarioEmpleado}}</div>
                            </div>  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.ciudadEmpresa}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Telefono</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.telefonoEmpresa}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Otros ingresos</span>
                                <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.otrosIngresosEmpleado}}</div>                        
                            </div>
                        </div>
                        <div class="input-group mb-3 p-3" v-if="solicitudActiva.infoLab.infoLaboral.descripcionActividad">
                            <span class="input-group-text">Descripcion actividad</span>
                            <div class="form-control">{{solicitudActiva.infoLab.infoLaboral.descripcionActividad}}</div>
                        </div>
                    </div>
                    <div class="">
                        <h3>Validacion informacion laboral Cliente</h3>
                        <div v-if="solicitudActiva.infoLab.validadoInfoLaboral">
                            <div class="btn btn-outline-warning">Ya se a guardado la validacion, desea editarla?</div>
                        </div>                        
                        <div v-else>                            
                            <div class="row" v-if="solicitudActiva.infoLab.infoLaboral.descripcionActividad"><!--este sera el formulario para cuando sea independiente -->
                                <div class="col-md-4">
                                    <input type="checkbox" class="form-check-input" id="unoo" v-model="informacionLaboralCliente.Fcyc">
                                    <label class="form-check-label" for="unoo" >Fotocopia camara y comercio vigente</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="checkbox" class="form-check-input" id="desPago2" v-model="informacionLaboralCliente.despDePago">
                                    <label class="form-check-label" for="desPago2">Desprendibles de pago</label> 
                                </div>
                                <div class="col-md-4">
                                    <input type="checkbox" class="form-check-input" id="fci" v-model="informacionLaboralCliente.Fci">
                                    <label class="form-check-label" for="fci">Fotocopia de contrato independiente</label> 
                                </div>
                            </div>
                            <div class="row " v-else-if="solicitudActiva.infoLab.infoLaboral!='Pensionado'">
                                
                                <div class="col-md-6">
                                    <input type="checkbox" class="form-check-input" id="desPago1" v-model="informacionLaboralCliente.despDePago">
                                    <label class="form-check-label" for="desPago1">3 Desprendibles de pago</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="checkbox" class="form-check-input" id="desPago1" v-model="informacionLaboralCliente.cartaLaboral">
                                    <label class="form-check-label" for="desPago1">Carta laboral</label>
                                </div>                         
                            </div>
                            <br>
                            <div class="form-group " v-if="solicitudActiva.infoLab.infoLaboral=='Pensionado'">
                                <input type="checkbox" class="form-check-input" id="desPago" v-model="informacionLaboralCliente.despDePago">
                                <label class="form-check-label" for="desPago" >3 Desprendibles de pago vigentes</label> &ensp;&ensp;&ensp;
                            </div>
                            <div class="input-group mb-3" v-if="solicitudActiva.infoLab.infoLaboral!='Pensionado'">
                                <span class="input-group-text">Tiempo dedicado a esta labor</span>
                                <input class="form-control" v-model="informacionLaboralCliente.tiempoTrabajado">                       
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Observacion</span>
                                <textarea class="form-control" v-model="informacionLaboralCliente.Objecion"></textarea>                        
                            </div>
                            <div class="btn btn-block btn-outline-success" 
                                @click="guardarValidacionInformacionLaboralCliente(informacionLaboralCliente,solicitudActiva.infoLab._id,solicitudActiva.infoLab.infoLaboral)">
                                Guardar validacion informacion cliente
                            </div>
                        </div>
                        <br>
                    </div>
                </div>  
                <div class="border border-primary p-1" v-else>
                    <h2 class="p-2">Informacion Laboral</h2>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Desempleado</span>
                        <div class="form-control">si</div>                        
                    </div>
                </div>              
                <div v-if="solicitudActiva.fiador" class="border border-primary p-1">
                    <h2 class="p-2">Fiador</h2>
                    <div class="row">                    
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Nombre</span>
                                <div class="form-control">{{solicitudActiva.fiador.nombreFiador}} {{solicitudActiva.fiador.primerApellidoFiador}} {{solicitudActiva.fiador.segundoApellidoFiador}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Telefono</span>
                                <div class="form-control">{{solicitudActiva.fiador.celularUnoFiador}}</div>
                                <div class="form-control" v-if="solicitudActiva.fiador.celularDosFiador">{{solicitudActiva.fiador.celularDosFiador}}</div>
                            </div>                        
                            <div class="input-group mb-3">
                                <span class="input-group-text">Barrio</span>
                                <div class="form-control">{{solicitudActiva.fiador.barrioFiador}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Tipo de vivienda</span>
                                <div class="form-control">{{solicitudActiva.fiador.tViviendaFiador}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Cedula</span>
                                <div class="form-control">{{solicitudActiva.fiador.cedulaFiador}}</div>
                            </div>  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Direccion</span>
                                <div class="form-control">{{solicitudActiva.fiador.direccionFiador}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Ciudad</span>
                                <div class="form-control">{{solicitudActiva.fiador.ciudadFiador}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Personas a cargo</span>
                                <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                            </div>
                        </div>
                        <div class="input-group mb-3 p-3" v-if="solicitudActiva.fiador.emailFiador">
                            <span class="input-group-text">Email</span>
                            <div class="form-control">{{solicitudActiva.fiador.emailFiador}}</div>                        
                        </div>
                        <h2 class="p-2 mx-auto">Informacion laboral fiador</h2>
                        <div class="input-group mb-3 p-3" v-if="solicitudActiva.fiador.infolaboralFiador ==='Pensionado'">
                            <span class="input-group-text">Pensionado</span>
                            <div class="form-control">si</div>                        
                        </div>
                        <div v-else>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Personas a cargo</span>
                                        <div class="form-control">{{solicitudActiva.fiador.PcargoFiador}}</div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mx-auto">
                        <h3>Validacion informacion fiador</h3>
                        <div v-if="solicitudActiva.fiador.validadoInfoFiador">
                            <div class="btn btn-outline-warning">Ya se a guardado la validacion, desea editarla?</div>
                        </div>
                        <div v-else>
                            <div class="form-group " v-if="solicitudActiva.fiador.infolaboralFiador !='Pensionado'">
                                <input type="checkbox" class="form-check-input" id="carLaboral" v-model="informacionFiador.cartaLaboral">
                                <label class="form-check-label" for="carLaboral" >Carta laboral</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="dirOk" v-model="informacionFiador.direccionOk">
                                <label class="form-check-label" for="dirOk">Direccion confirmada</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="telOk" v-model="informacionFiador.telefonoOk">
                                <label class="form-check-label" for="telOk">Telefono validado</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="fiadordesdepago" v-model="informacionFiador.despDePago">
                                <label class="form-check-label" for="fiadordesdepago" >3 Desprendibles de pago vigentes</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="aceptacion" v-model="informacionFiador.aceptacion">
                                <label class="form-check-label" for="aceptacion">Aceptacion de la responsabilidad</label> &ensp;
                            </div>
                            <div class="form-group" v-else>                            
                                <input type="checkbox" class="form-check-input" id="desPago1" v-model="informacionFiador.direccionOk">
                                <label class="form-check-label" for="desPago1">Direccion confirmada</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="desPago1" v-model="informacionFiador.telefonoOk">
                                <label class="form-check-label" for="desPago1">Telefono validado</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="aceptacion" v-model="informacionFiador.aceptacion">
                                <label class="form-check-label" for="aceptacion">Aceptacion de la responsabilidad</label> &ensp;&ensp;&ensp;
                                <input type="checkbox" class="form-check-input" id="desPago" v-model="informacionFiador.despDePago">
                                <label class="form-check-label" for="desPago" >3 Desprendibles de pago vigentes</label> &ensp;&ensp;&ensp;
                            </div>
                            <div class="input-group mb-3" v-if="solicitudActiva.fiador.infolaboralFiador !='Pensionado'">
                                <span class="input-group-text">Tiempo dedicado a esta labor</span>
                                <input class="form-control" v-model="informacionFiador.tiempoTrabajado">                       
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Observacion</span>
                                <textarea class="form-control" v-model="informacionFiador.Objecion"></textarea>                        
                            </div>
                            <div class="btn btn-block btn-outline-success" @click="guardarValidacionInfoFiador(informacionFiador,solicitudActiva.fiador._id)">Guardar validacion informacion cliente</div>
                        </div>  
                        <br>  
                    </div>
                </div>
                <div class="border border-primary p-1" v-if="solicitudActiva.prenda">
                    <h2 class="p-2">Prenda</h2>
                    <div class="row">                    
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Tipo vehiculo</span>
                                <div class="form-control">{{solicitudActiva.prenda.tipoVehiculo}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Marca</span>
                                <div class="form-control">{{solicitudActiva.prenda.marca}}</div>
                            </div>                        
                            <div class="input-group mb-3">
                                <span class="input-group-text">Modelo</span>
                                <div class="form-control">{{solicitudActiva.prenda.modelo}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Tipo</span>
                                <div class="form-control">{{solicitudActiva.prenda.tipo}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Cilindraje</span>
                                <div class="form-control">{{solicitudActiva.prenda.cilindraje}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Placa</span>
                                <div class="form-control">{{solicitudActiva.prenda.placa}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Servicio</span>
                                <div class="form-control">{{solicitudActiva.prenda.servicio}}</div>                        
                            </div>                            
                            <div class="input-group mb-3">
                                <span class="input-group-text">Nombre propietario</span>
                                <div class="form-control">{{solicitudActiva.prenda.nombrePropietario}}</div>                        
                            </div>
                        </div>
                        <div class="col-md-6">  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Color</span>
                                <div class="form-control">{{solicitudActiva.prenda.color}}</div>
                            </div>  
                            <div class="input-group mb-3">
                                <span class="input-group-text">Licencia transito</span>
                                <div class="form-control">{{solicitudActiva.prenda.licTransito}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Manifiesto</span>
                                <div class="form-control">{{solicitudActiva.prenda.manifiesto}}</div>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Motor</span>
                                <div class="form-control">{{solicitudActiva.prenda.motor}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Chasis</span>
                                <div class="form-control">{{solicitudActiva.prenda.chasis}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Seguro</span>
                                <div class="form-control">{{solicitudActiva.prenda.seguro}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Tecnomecanica</span>
                                <div class="form-control">{{solicitudActiva.prenda.tecnicomecanica}}</div>                        
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Cedula propietario</span>
                                <div class="form-control">{{solicitudActiva.prenda.ccPropietario}}</div>                        
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mx-auto">
                        <h3>Validacion informacion prenda</h3>
                        <div v-if="solicitudActiva.prenda.validadoInfoPrenda">
                            <div class="btn btn-outline-warning">Ya se a guardado la validacion, desea editarla?</div>
                        </div>
                        <div v-else>
                            <div class="form-group ">                    
                                <input type="checkbox" class="form-check-input" id="desPago1" v-model="informacionPrenda.pignoracionOk">
                                <label class="form-check-label" for="desPago1">Documento de pignoracion</label> &ensp;&ensp;&ensp;
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Observacion</span>
                                <textarea class="form-control" v-model="informacionPrenda.Objecion"></textarea>                        
                            </div>
                            <div class="btn btn-block btn-outline-success" @click="guardarValidacionInfoPrenda(informacionPrenda,solicitudActiva.prenda._id)">Guardar validacion informacion cliente</div>
                        </div>  
                        <br>  
                    </div>
                </div>
                    
                </div>
                <div class="p-2">
                    <h2 class="p-3 text-center">Referencias</h2>
                    <div class="row">
                        <div v-for="referencia, index in solicitudActiva.referidos.referidos" :key="index" class="col-md-6 text-center">
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
                            <div v-if="referencia.validado">
                                <div class="btn btn-outline-warning" @click="referencia.validado=false">Ya se valido, desea editarlo?</div>
                            </div>
                            <div v-else>
                                <div class="form-group">
                                    <input type="checkbox" class="form-check-input" @change="actRef=true" v-model="referencia.llamadoOk">
                                    <label class="form-check-label"  >Llamado</label> &ensp;&ensp;&ensp;
                                    <input type="checkbox" class="form-check-input" @change="actRef=true" v-model="referencia.loConoceOk">
                                    <label class="form-check-label" >Confirmado</label> &ensp;&ensp;&ensp;
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Observacion</span>
                                    <textarea class="form-control" @keyup="actRef=true" v-model="referencia.objecion"></textarea>                        
                                </div> 
                            </div> 
                            <br>                      
                        </div>
                        <div class="btn btn-block btn-outline-warning col-md-11 mx-auto" v-if="actRef" @click="actualizarInfoReferidos(solicitudActiva.referidos)">Guardar informacion referencias</div>
                    </div> 
                    <br>
                    <div class="btn btn-block btn-outline-primary btn-xl col-md-11 mx-auto p-2" v-if="mostrarBoton" @click="aprobarEnPrimera()"><h2>Aprobar en primera instancia</h2></div>  
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    props:['solicitud'],
    mounted(){
        this.buscarSolicitud(this.solicitud)
    },
    computed: {
        mostrarBoton() {
            if(this.solicitudActiva.infoLab.infoLaboral==='Desempleado') {
              this.solicitudActiva.infoLab.validadoInfoLaboral = true  
            }        
            if(this.solicitudActiva.fiador){
                if(this.solicitudActiva.referidos.validados && this.solicitudActiva.infoLab.validadoInfoLaboral && this.solicitudActiva.infoLab.validadoInfoCliente && this.solicitudActiva.fiador.validadoInfoFiador){
                    return true
                }
            }else if(this.solicitudActiva.prenda){
                if(this.solicitudActiva.referidos.validados && this.solicitudActiva.infoLab.validadoInfoLaboral && this.solicitudActiva.infoLab.validadoInfoCliente && this.solicitudActiva.prenda.validadoInfoPrenda){
                    return true
                }
            }else{
                if(this.solicitudActiva.referidos.validados && this.solicitudActiva.infoLab.validadoInfoLaboral && this.solicitudActiva.infoLab.validadoInfoCliente){
                    return true
                }
            }                      
        },
    },
    data() {
        return {
            solicitudActiva: {
                cliente:{},
                infoLab:{
                    infoLaboral:{}
                },
                fiador:{},
                prenda:{},
                referidos:[]
            },
            informacionCliente:{},
            informacionLaboralCliente:{},
            informacionFiador:{},
            informacionPrenda:{},
            actRef:false
        }
    },
    methods: {
        ...mapMutations('storeViewComponentsCreditos',['estadoVerCreditoUnico','estadoCargarCreditos']),
        async buscarSolicitud(sol) {
            this.solicitudActiva = await this.$axios.$post('/creditos/solicitudUnica',sol) 
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
        async actualizarInfoReferidos(referidos){
            for (let i = 0; i < referidos.referidos.length; i++){
                console.log(referidos.referidos[i])
                if(referidos.referidos[i].llamadoOk){
                    referidos.referidos[i].validado = true
                }
            }
            referidos.validados = true
            const referidosOk = await this.$axios.$post('/creditos/actualizarReferencias',referidos)
            console.log(referidosOk)
            if(referidosOk.success===true){
                this.buscarSolicitud(this.solicitud)
                this.actRef=false
            }  else {
                alert('Ocurio un error en la actualizacion de las referencias')
            }         
        },
        async guardarValidacionInformacionCliente(informacionCliente,id){
            console.log(informacionCliente)
            if(informacionCliente.visitaOk === undefined || informacionCliente.visitaOk === false){
                alert('si no se a realizado la visita no puedes guardarlo')
                return
            }
            if(informacionCliente.casaOk == informacionCliente.arrendoOk){
                alert('define arriendo o casa propia')
                return
            }
            if(informacionCliente.casaOk==undefined && informacionCliente.arrendoOk==false){
                alert('define arriendo o casa propia')
                return
            }
            if(informacionCliente.casaOk==false && informacionCliente.arrendoOk==undefined){
                alert('define arriendo o casa propia')
                return
            }
            if(informacionCliente.tiempoEnCasa === '' || informacionCliente.tiempoEnCasa=== undefined){
                alert('Define el tiempo en casa')
                return
            }
            if(informacionCliente.tiempoEnCasa.length<=1){
                alert('Años, meses, dias, Porfavor complemente la respuesta en el tiempo vivido en casa')
            }
            informacionCliente.visitadoPor = this.$auth.$state.user._id
            let data = {
                informacionCliente,
                id,
                validadoInfoCliente:true
            }
            const infoClienteOk = await this.$axios.$post('/creditos/guardarInfoCliente', data)
            if(infoClienteOk.success){
                this.buscarSolicitud(this.solicitud)
            }
        },
        async guardarValidacionInformacionLaboralCliente(informacionLabCliente,id,infolab){
            console.log(informacionLabCliente)
            if(infolab === 'Pensionado'){
                if(informacionLabCliente.despDePago==false || informacionLabCliente.despDePago==undefined){
                    alert('Se debe presentar lo 3 ultimos desprendibles de pago de la pension ')
                    return
                }
            }else{
                if(infolab.descripcionActividad){
                    if(informacionLabCliente.despDePago==false && informacionLabCliente.Fci==false){
                        alert('Se debe presentar desprendibles de pago o fotocopia contrato independiente')
                        return
                    }
                    if(informacionLabCliente.despDePago==undefined && informacionLabCliente.Fci==undefined){
                        alert('Se debe presentar desprendibles de pago o fotocopia contrato independiente')
                        return
                    }
                }else{
                    if(informacionLabCliente.despDePago==false && informacionLabCliente.cartaLaboral==false){
                        alert('Se debe presentar desprendibles de pago o carta laboral')
                        return
                    }
                    if(informacionLabCliente.despDePago==undefined && informacionLabCliente.cartaLaboral==undefined){
                        alert('Se debe presentar desprendibles de pago o carta laboral')
                        return
                    }
                }            
                if(informacionLabCliente.tiempoTrabajado === '' || informacionLabCliente.tiempoTrabajado=== undefined){
                    alert('Define el tiempo dedicado a esta labor')
                    return
                }
                if(informacionLabCliente.tiempoTrabajado.length<=1){
                    alert('Años, meses, dias, Porfavor complemente la respuesta en el tiempo dedicado a esta labor')
                    return
                }
            } 
            informacionLabCliente.validadoPor = this.$auth.$state.user._id
            let data = {
                informacionLaboralCliente:informacionLabCliente,
                id,
                validadoInfoLaboral:true
            }
            const infoClienteOk = await this.$axios.$post('/creditos/guardarInfoLabCliente', data)
            if(infoClienteOk.success){
                this.buscarSolicitud(this.solicitud)
            }
        },
        async guardarValidacionInfoFiador(infoFiador,id){
            infoFiador.validadoPor = this.$auth.$state.user._id
            let data = {
                infoFiador,
                id,
                validadoInfoFiador:true
            }
            const infoClienteOk = await this.$axios.$post('/creditos/guardarInfoFiador', data)
            if(infoClienteOk.success){
                this.buscarSolicitud(this.solicitud)
            }
        },
        async guardarValidacionInfoPrenda(infoPrenda,id){
            infoPrenda.validadoPor = this.$auth.$state.user._id
            let data = {
                infoPrenda,
                id,
                validadoInfoPrenda:true
            }
            const infoPrendaOk = await this.$axios.$post('/creditos/guardarInfoPrenda', data)
            if(infoPrendaOk.success){
                this.buscarSolicitud(this.solicitud)
            }
        },
        async aprobarEnPrimera(){
            console.log(this.solicitudActiva._id)
            let data = {
                id:this.solicitudActiva._id,
                estadoInterno:'primeraEstancia'
            }
            const infoClienteOk = await this.$axios.$post('/creditos/cambiarEstadoInterno', data)
            if(infoClienteOk.success){
                this.estadoCargarCreditos(true)
                this.estadoVerCreditoUnico(false)
            }
        }
    },
}
</script>

<style>

</style>