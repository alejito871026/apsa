<template>
    <div>
        <barra-logeado/>
        <div class="bg-primary text-white text-center p-4">
            <h1><strong>CREDITOS ACTIVOS</strong></h1>
        </div>
        <barra-creditos/>
         <div v-if="verCredit">
            <div class="card text-center">
                <div class="card-header">
                    <h2>Credito  # {{credito.numeroCredito}}</h2>
                </div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> Nombre del cliente </label>
                        </div>
                        <div id class="form-control">{{credito.cliente.nombreCliente}} {{credito.cliente.primerApellidoCliente}} {{credito.cliente.segundoApellidoCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text"> # Telefono celular </label>
                        </div>
                        <div id class="form-control">{{credito.cliente.celularUnoCliente}}</div>
                        <div class="input-group-prepend">
                            <label class="input-group-text">Otro # de contacto</label>
                        </div>
                        <div id class="form-control">{{credito.cliente.celularDosCliente}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Servicio</label>
                        </div>
                        <div id class="form-control">{{credito.servicio}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Monto Aprobado</label>
                        </div>
                        <div id class="form-control">{{new Intl.NumberFormat('es-CO').format(credito.cantidad)}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Fecha solicitud</label>
                        </div>
                        <div id class="form-control">{{verFecha(credito.fechaAgregado)}}</div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Fecha pago cuota</label>
                        </div>
                        <div id class="form-control">{{verFecha(credito.Fp)}}</div>
                    </div>
                     <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Interes establecido</label>
                        </div>
                        <div id class="form-control">{{credito.interes}}</div>
                    </div>
                </div>
                <div class="card-footer">
                    <div style="height: auto;">
                        <div class="alert alert-danger">Movimientos de cuotas al final restantes: {{2 - this.credito.pagares.agregadas}}</div>
                       
                        <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                            <thead class="sticky-top text-white bg-dark">
                            <tr>

                                <th># </th>
                                <th>Fecha para pago</th>
                                <th>Valor cuota</th>
                                <th>Abono</th>
                                <th>Capital</th>
                                <th>Interes</th>
                                <th>Dias</th>
                                <th>Interes a la mora</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pags,index) in credito.pagares.pagares" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{verFecha(pags.fecha)}}</td>
                                    <td><div class="form-control">{{new Intl.NumberFormat('es-CO').format(pags.capital+pags.interes+pags.interesAlaMora-pags.abono)}}</div></td>
                                    <td><div class="btn btn-outline-warning">{{pags.abono}}</div></td>
                                    <td><div class="form-control">{{new Intl.NumberFormat('es-CO').format(pags.capital)}}</div></td>
                                    <td><div class="form-control">{{new Intl.NumberFormat('es-CO').format(pags.interes)}}</div></td>
                                    <td v-if="pags.dias">
                                        <div class="form-control btn-outline-primary" v-if="pags.dias>0">{{pags.dias}}</div>
                                        <div class="form-control btn-outline-danger" v-else>{{pags.dias}}</div>    
                                    </td>
                                    <td v-else>
                                        <div class="form-control btn-outline-danger" v-if="pags.diasMora>=0">{{pags.diasMora}}</div>
                                        <div v-else class="form-control btn-outline-success">{{pags.diasFavor}}</div>
                                    </td>
                                    <td><div v-if="pags.observacion">{{pags.observacion}}</div> <div class="form-control" v-if="pags.interesAlaMora">{{new Intl.NumberFormat('es-CO').format(pags.interesAlaMora)}}</div>
                                    </td>
                                    <td v-if="pags.estado">
                                        <div  class="btn btn-success">Cancelado</div>
                                        <div  class="btn btn-success"  v-if="!pags.observacion" @click=" imprimirRecibo(pags,index,'a')">imprimir</div>                                      
                                    </td>                                 
                                    <td v-else>
                                        <div   class="btn btn-info" v-if="pags.ultimoBtn  && credito.frecuencia != 'Pago Unico' && enMora === false && noMostrar === false" @click="modalFinal(pags.capital,pags.interes * .30,index, pags.interes)">
                                            Pagar: {{new Intl.NumberFormat('es-CO').format(pags.capital+pags.interes*.30)}}
                                        </div> 
                                        <div   class="btn btn-danger" v-if="pags.ultimoBtn  && credito.frecuencia != 'Pago Unico' && enMora ===true">
                                            Pagar: {{new Intl.NumberFormat('es-CO').format(pags.capital+pags.interes*.30)}} Estas en mora
                                        </div>                                      
                                        <div  class="btn btn-warning" @click="pagarOk(index,credito.pagares.pagares,
                                            credito._id, credito.nombreCliente, pags.interesAlaMora)">Pagar cuota
                                        </div>
                                        <div class="btn btn-warning" @click="abonoTrue(index)" >
                                            Abonar
                                        </div>
                                        <div v-if="abonar[index].a">
                                            <input class="input-form" type="number" v-model="valAbono">
                                            <div  @click="guardarAbono(valAbono, index, credito.pagares._id,credito._id,
                                                credito.numeroCredito,pags)" class="btn btn-primary">guardar
                                            </div>
                                            <div  class="btn btn-danger" @click="abonoFalse(index)">Cancelar abono</div>                                            
                                        </div>  
                                        <div   class="btn btn-info" v-if="abonar[index].a==false" @click="imprimirRecibo(pags,index,'b')">Recibo Prepago</div>
                                        <div   class="btn btn-success" v-if="pags.pasarAlFinal" @click="modalMoverAlFinal(index,pags.interes)">Mover al final</div>
                                        <div   class="btn btn-success" disabled v-if="pags.pasarAlFinalMsg">{{pags.pasarAlFinalMsg}}</div>
                                    </td>                                                                      
                                </tr>                               
                            </tbody>
                        </table>
                        <div class="card p-3">
                            <div class="input-group mb-3" v-if="cr.capital>0">
                                <div class="input-group-prepend">
                                    <label class="input-group-text">Debe a capital</label>
                                </div>
                                <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(cr.capital)}}</div>
                                <div class="input-group-prepend">
                                    <label class="input-group-text">debe a interes</label>
                                </div>
                                <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(cr.interes)}}</div>
                                <div class="input-group-prepend">
                                    <label class="input-group-text">Total</label>
                                </div>
                                <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(cr.capital+cr.interes)}}</div>
                            </div>
                            <div v-else class="input-group mb-3" >
                                <div class="input-group-prepend">
                                    <label class="input-group-text">Debe a capital</label>
                                </div>
                                <div class="form-control" >0</div>
                                <div class="input-group-prepend">
                                    <label class="input-group-text">debe a interes</label>
                                </div>
                                <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(cr.capital+cr.interes)}}</div>
                                <div class="input-group-prepend">
                                    <label class="input-group-text">Total</label>
                                </div>
                                <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(cr.capital+cr.interes)}}</div>
                            </div>
                        </div>
                        <div v-if="enFalso>2">                            
                            <div class="card p-3">
                                <div class="card-title">
                                    <h3>Se debe estar al dia para aplicar a cualquiera de estas funciones.</h3>
                                </div>
                                <h3>Abonar a capital</h3>
                                <div class="alert alert-danger">
                                    <div v-if="credito.frecuencia == 'Mensual' || credito.frecuencia == 'Semanal' ">
                                         Si el dinero no cubre el valor del capital de 2 meses, podra cancelar la ultima cuota del 
                                        credito con solo un 30 % del interes
                                    </div>
                                    <div v-if="credito.frecuencia == 'Quincenal'">
                                         Si el dinero no cubre el valor del capital de 3 cuotas, podra cancelar la ultima cuota del 
                                        credito con solo un 30 % del interes
                                    </div>
                                    <div v-if="credito.frecuencia == 'Pago Unico'">
                                         El capital a abonar debe ser mayor al 30% del capital total adeudado.
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Abono minimo a capital</label>
                                    </div>
                                    <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(crAbono.capital)}}</div>
                                </div>
                                <div class="alert alert-info" v-if="crAbono.leyenda.length>0">{{crAbono.leyenda}}</div>
                                <div class="btn btn-block btn-outline-primary" v-if="crAbono.btn_Abono && enMora ==false" @click="abonoAcapital(crAbono.capital)"><h4>Abonar</h4></div>
                            </div>
                            <div class="card p-3">
                                <h3>Pagar totalidad del credito</h3>
                                <div class="alert alert-info" v-if="crPagoTotal.alert">
                                    {{crPagoTotal.alert}}                              
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Debe a capital</label>
                                    </div>
                                    <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(crPagoTotal.capital)}}</div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">debe a interes</label>
                                    </div>
                                    <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(crPagoTotal.interes)}}</div>
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Total</label>
                                    </div>
                                    <div class="form-control" >{{new Intl.NumberFormat('es-CO').format(crPagoTotal.capital+crPagoTotal.interes)}}</div>                                    
                                </div>
                                <div class="btn btn-block btn-outline-primary" v-if="crPagoTotal.btn_crPagoTotal" @click="modalPagarTotalidad(crPagoTotal.capital,crPagoTotal.interes)"><h4>Pagar totalidad</h4></div>
                            </div>
                        </div>
                        <div v-else>
                            debes menos de dos cuotas
                        </div>
                    </div>
                     <div class="card">
                        <div class="card-body">
                            <div class="btn btn-block p-1 btn-outline-info" @click="historia(credito._id)" v-if="botonH"><h4>Historial de pagos</h4></div>
                            <div class="btn btn-block p-1 btn-outline-success" @click="regresando()"><h2>Cerrar</h2></div>  
                        </div>
                        <div class="card-body" v-if="historial.length>0">
                            <table class="table table-hover border table-sm bg-white text-dark table-responsive-sm">
                                <thead>
                                    <tr>
                                        <th>Fecha ingreso</th>
                                        <th>capital</th>
                                        <th>Interes</th>
                                        <th>Descripcion</th>
                                        <th>Concepto</th>
                                        <th>opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="pagos in historial" :key="pagos._id">
                                        <td>{{verFecha(pagos.fechaIngresoEfectivo)}}</td>
                                        <td>
                                            <div v-if="pagos.concepto === 'cuota credito'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Abono a capital'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Interes Mora'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Abono'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'inicial'">{{pagos.capital}}</div>
                                            <div v-if="pagos.concepto === 'Pago total'">{{pagos.capital}}</div>                                            
                                            <div v-if="pagos.concepto === 'cuota credito al final'">{{pagos.capital}}</div>                                            
                                            <div v-if="pagos.concepto === 'cuota credito disminucion capital'">{{pagos.capital}}</div>
                                        </td>
                                        <td>
                                            <div v-if="pagos.concepto === 'cuota credito'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Abono a capital'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Interes Mora'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Abono'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'inicial'">{{pagos.interes}}</div>
                                            <div v-if="pagos.concepto === 'Pago total'">{{pagos.interes}}</div>                                            
                                            <div v-if="pagos.concepto === 'cuota credito al final'">{{pagos.interes}}</div>                                            
                                            <div v-if="pagos.concepto === 'cuota credito disminucion capital'">{{pagos.interes}}</div>
                                            
                                        </td>
                                        <td>{{pagos.descripcion}}</td>
                                        <td>{{pagos.concepto}}</td>
                                        <td><div class="btn btn-outline-info" v-if="pagos.concepto != 'cuota credito'" @click="imprimirRecibo(pagos)">Imprimir</div></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="btn btn-block p-1 btn-outline-info" @click="historial=[],botonH=true"><h4>Cerrar historial de pagos</h4></div>
                        </div>
                    </div> 
                </div>                               
            </div>           
        </div>  
        <div  v-else> 
            <div class="p-2  d-md-flex justify-content-md-end" @click="actualizarMora()"><div class="btn btn-warning">Actualizar Mora</div></div>
            <div class="p-2">
                <div class="input-group mb-3">
                    <input class="form-control mr-sm-2" type="text" @keyup="buscando(x)"  v-model="x"  placeholder="Buscar">
                </div>
            </div>
            <table class="table table-hover table-sm text-center mx-auto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Telefonos</th>
                        <th>Direccion</th>
                        <th>Servicio</th>
                        <th>$ cuota</th>
                        <th>Fecha p</th>
                        <th>En mora</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="credito in entregadosActivos" :key="credito._id" @click="verCredito(credito)">
                        <td>{{credito.numeroCredito}}</td>
                        <td>{{credito.nombreCliente}}</td>
                        <td>{{credito.cliente.celularUnoCliente}} <a v-if="credito.cliente.celularDosCliente">--- {{credito.cliente.celularDosCliente}}</a></td>
                        <td>{{credito.cliente.direccionCliente}}</td>
                        <td>{{credito.servicio}}</td>
                        <td>{{credito.valCuotaMens}}</td>
                        <td>{{verFecha(credito.Fp)}}</td>
                        <td v-if="credito.enMora" class="bg-danger">X</td>
                        <td v-else class="bg-success"><b-icon-check></b-icon-check></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-modal v-model="modalPago" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered>
            <div class="text-center">
                <h3>Estas a punto de pagar la cuota {{info.index+1}}</h3>
                <h3>Valor a pagar : $ {{info.valorApagar.capital+info.valorApagar.interes+info.interesMora}}</h3>
                <div v-if="info.interesMora"></div>
                <div class="btn btn-block btn-outline-primary" @click="pagarCuota(info)"><h4>Pagar</h4></div>
            </div>
            <br>
            <div class="btn btn-block btn-outline-info" @click="modalPago=false"><h4>Cerrar</h4></div>
        </b-modal>
        <b-modal v-model="spiner" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered sm>
            <div class="text-center mx-auto btn btn-block btn-outline-primary">    
                <div class="align-items-center text-center mx-auto ">
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                    <b-spinner  type="grow" variant="primary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                </div>
                <div class="align-items-center text-center mx-auto ">                    
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                    <b-spinner  type="grow" variant="primary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="dark"></b-spinner>                    
                    <b-spinner type="grow" variant="dark"></b-spinner>
                    <b-spinner small type="grow" variant="primary"></b-spinner>
                    <b-spinner  type="grow" variant="secondary"></b-spinner>
                    <b-spinner small type="grow" variant="secondary"></b-spinner>
                </div>
                <h4>Porfavor espere!!</h4>
            </div>
        </b-modal>
        <b-modal v-model="modalAbonoCapital" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered>
            <div class="text-center">
                <div class="card-header bg-primary text-white">
                    <h3>Establecer valores para abono a capital</h3>
                </div>                
                <h3>Valor minimo a abonar  : $ {{capitalMinimoAbonar}}</h3>
                <h3>Valor maximo a abonar  : $ {{crPagoTotal.capital}}</h3>
                <input type="number" :min="capitalMinimoAbonar" :max="crPagoTotal.capital" class="form-control mb-2" autofocus placeholder="Ingrese el valor a abonar" v-model="valorAbono">
                <div></div>
                <div class="btn btn-block btn-outline-primary" @click="guardarAbonoCapital(valorAbono, capitalMinimoAbonar,crPagoTotal.capital, n=1,credito._id)"><h4>Con reduccion de tiempo</h4></div>
                <div class="btn btn-block btn-outline-primary" @click="guardarAbonoCapital(valorAbono, capitalMinimoAbonar,crPagoTotal.capital, n=2,credito._id)"><h4>Con reduccion en valor de cuota</h4></div>
            </div>
            <br>
            <div class="btn btn-block btn-outline-info" @click="modalAbonoCapital=false"><h4>Cerrar</h4></div>
        </b-modal>
        <b-modal v-model="modalFinall" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered>
             <div class="text-center">
                <h3>Estas a punto de pagar la cuota {{info.valorApagar.index+1}}</h3>
                <h3>Valor a pagar : $ {{info.valorApagar.capital+info.valorApagar.interes}}</h3>
                <div class="btn btn-block btn-outline-primary" @click="pagoUltimaCuotaDisminucionCapital(info.valorApagar.capital, info.valorApagar.interes, info.valorApagar.index, info.valorApagar.oldInteres)"><h4>Pagar</h4></div>
            </div>
            <br>
            <div class="btn btn-block btn-outline-info" @click="cerrarModalFinal()"><h4>Cerrar</h4></div>
        </b-modal>
        <b-modal v-model="modalMoverAlFinall" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered>
             <div class="text-center">
                <h3>Estas a punto de pagar la cuota {{info.valorApagar.index+1}}</h3>
                y crear una nueva cuota al final
                <h3>Valor a pagar : $ {{info.valorApagar.interes}}</h3>
                <div class="btn btn-block btn-outline-primary" @click="moverAlFinal(info.valorApagar.index, info.valorApagar.interes)"><h4>Pagar</h4></div>
            </div>
            <br>
            <div class="btn btn-block btn-outline-info" @click="cerrarModalMoverAlFinal()"><h4>Cerrar</h4></div>
        </b-modal>
        <b-modal v-model="modalPagarTotalidadd" no-close-on-esc no-close-on-backdrop hide-footer hide-header centered>
             <div class="text-center">
                <h3>Estas a punto de pagar la totalidad del credito {{credito.numeroCredito}}
                    por medio de la modalidad de pago total del credito
                </h3>
                <h3>Valor a pagar : $ {{new Intl.NumberFormat('es-CO').format(+info.valorApagar.capital+info.valorApagar.interes)}}</h3>
                <div class="btn btn-block btn-outline-primary" @click="pagarTotalidad(info.valorApagar.capital, info.valorApagar.interes)"><h4>Pagar</h4></div>
            </div>
            <br>
            <div class="btn btn-block btn-outline-info" @click="cerrarModalPagarTotalidad()"><h4>Cerrar</h4></div>
        </b-modal>
        <b-modal v-model="reciboImpresion" hide-footer hide-header-close hide-header centered size="md">
            <div  id="impresion" class="card">
                <div class="text-center p-2">
                    <img src="/logo.jpeg" style="height:100px; max-width:320px; width:300px;" >  
                </div>
                <div>
                    <div class="head" style="font-size: 13px; font-family:'sans-serif', 'verdana';text-align: center;align-content: center;"><br>
                        .......................Nit: 1112786485-9.....................<br>
                        .........................Cra 6 # 16 - 57.........................<br> 
                        .............................Cartago................................<br>
                        ......................Tels: 311 679 3772.....................<br>
                        _________________________________________
                    </div>
                    <div style="font-size: 13px; font-family: 'sans-serif', 'verdana'; padding-left: 30px; padding-top: 10px;">
                        <div class="row">
                            <div class="col-md-10">
                                &ensp;&ensp;&ensp;&ensp;{{verFecha(new Date())}} Hora: {{impresion.hora}} <br>
                                ..# Credito: &ensp;&ensp;&ensp;&ensp;&nbsp;{{impresion.numero}}<br>
                                ..Servicio: &ensp;&ensp;&ensp;&ensp;&nbsp;&nbsp; {{impresion.servicio}} <br>
                                ..Cliente : &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{impresion.nombre}}<br>
                                ..Tels: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{impresion.telefono}}<br>
                                ..Cajero: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{impresion.cajero}}
                            </div>
                        </div>                                            
                        ________________________________________     
                    </div>              
                </div>            
                <div style="font-size: 13px; font-family: 'sans-serif', 'verdana';padding-left: 30px; padding-top: 10px;">
                    <div class="row">
                        <div class="col-md-10">
                            ...Tipo transaccion: &ensp;&ensp;&ensp;{{impresion.tipoRecibo}}<br>
                            <a v-if="impresion.cuotaDe">
                                ...Cuota # &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{impresion.cuotaDe}} <br>
                            </a>
                            <a v-if="impresion.descripcion">
                                ...Descripcion: {{impresion.descripcion}} <br>
                            </a>
                            ...Capital #: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{impresion.capital}}<br>
                            ...Interes #: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{impresion.interes}}<br>
                            ...Valor pagado $: &ensp;&ensp;&ensp;&ensp;&nbsp;{{impresion.valApagar}}<br> 
                            ...Fecha pagado $: &ensp;&ensp;&ensp;&nbsp;{{verFecha(impresion.fechaPago)}}<br> 
                        </div>                                      
                    </div>
                    ________________________________________
                </div>
                <div  class="row" style="font-size: 13px; font-family: 'sans-serif', 'verdana'; padding-top: 10px; padding-left: 30px;">
                    <div class="col-sm-10">
                        ...Valor cancelado &ensp;&ensp;&ensp;&ensp;&nbsp; $ {{impresion.valApagar}}
                    </div>
                    <br>
                </div>
            </div>                            
            <div class="modal-footer border-white">
                <div class="row mx-auto">
                    <div class="col-lg-6 btn btn-warning" @click="reciboImpresion=false">Regresar</div>
                    <div class="col-lg-6 btn btn-danger" @click="impRecibo(impresion)">Imprimir</div>
                </div>
            </div>
        </b-modal>
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
    mounted(){
        //this.nombreYcedula()
        this.cargarCreditos()
    },
    data() {
        return {
            verCredit: false,
            credito:{
                pagares:[]
            },
            enMora:false,
            creditosPersona:[],
            x:'',
            entregadosActivos:[],
            entregadosActivosDos:[],
            spiner:false,
            modalPago:false,
            info:{
                valorApagar:{
                    capital:0,
                    interes:0,
                    index:0,
                }
            },
            interesMoratorio : 23.86,
            enFalso:0,
            cr:{
                capital:0,
                interes:0,
            },
            abonar:[],
            valAbono:0,
            crAbono:{
                capital:0,
                interes:0,
                btn_Abono:false,
            },            
            crPagoTotal:{
                capital:0,
                interes:0,
            },
            historial:[],
            modalAbonoCapital:false,
            capitalMinimoAbonar : 0,
            valorAbono: '',
            refinanciar : false,
            modalFinall : false,
            modalMoverAlFinall : false,
            modalPagarTotalidadd : false,
            reciboImpresion : false,
            impresion:{},
            noMostrar : false,
            botonH:false,
        }
    },
    methods: {
        horaPago(){
            let hour  = new Date()
            let horaExacta = ''
            return horaExacta = (hour.getHours()+':'+hour.getMinutes()+':'+hour.getSeconds())
        },
        impRecibo(){
            let prtContent = document.getElementById("impresion")
            let ventana = window.open('', '_blank', 'left=0,top=0,width=600,height=900,toolbar=0,scrollbars=0,status=0,border=1px');
            ventana.document.write('<html><head><title>' + document.title + '</title>');
            ventana.document.write('</head><body >');
            ventana.document.write(prtContent.innerHTML);
            ventana.document.write('</body></html>');
            ventana.document.close();
            ventana.focus();
            ventana.print();
        },
        async imprimirRecibo(pago,index,a){
            console.log(pago)
            this.reciboImpresion = true
            if(index>=0){
                if(a=='a'){
                    this.impresion = {
                        hora : this.horaPago(),
                        numero : this.credito.numeroCredito,
                        servicio : this.credito.servicio,
                        nombre : this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                        telefono : this.credito.cliente.celularUnoCliente,
                        cajero: this.$auth.$state.user.nombreE+' '+this.$auth.$state.user.primerApellidoE+' '+this.$auth.$state.user.segundoApellidoE,
                        tipoRecibo : 'Pago cuota',
                        capital : pago.capital,
                        interes : pago.interes,
                        valApagar : pago.capital + pago.interes,
                        fechaPago : pago.fechaPago,
                        cuotaDe : (index+1)+' de '+this.credito.pagares.pagares.length
                    }
                    if(pago.concepto==='Abono'){
                        this.impresion.descripcion = pago.descripcion
                    }
                }
                if(a=='b'){
                    this.impresion = {
                        hora : this.horaPago(),
                        numero : this.credito.numeroCredito,
                        servicio : this.credito.servicio,
                        nombre : this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                        telefono : this.credito.cliente.celularUnoCliente,
                        cajero: this.$auth.$state.user.nombreE+' '+this.$auth.$state.user.primerApellidoE+' '+this.$auth.$state.user.segundoApellidoE,
                        tipoRecibo : '-Pago cuota-',
                        capital : pago.capital,
                        interes : pago.interes,
                        valApagar : pago.capital + pago.interes,
                        fechaPago : new Date(),
                        cuotaDe : (index+1)+' de '+this.credito.pagares.pagares.length
                    }
                    if(pago.concepto==='Abono'){
                        this.impresion.descripcion = pago.descripcion
                    }
                }
            }else{
                this.impresion = {
                    hora : this.horaPago(),
                    numero : pago.numeroCredito,
                    servicio : this.credito.servicio,
                    nombre : this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                    telefono : this.credito.cliente.celularUnoCliente,
                    cajero: this.$auth.$state.user.nombreE+' '+this.$auth.$state.user.primerApellidoE+' '+this.$auth.$state.user.segundoApellidoE,
                    tipoRecibo : pago.concepto,
                    capital : pago.capital,
                    interes : pago.interes,
                    valApagar : pago.capital + pago.interes,
                    fechaPago : pago.fechaIngresoEfectivo,
                }
                if(pago.concepto==='Abono'){
                    this.impresion.descripcion = pago.descripcion
                }
            }            
        },
        async modalPagarTotalidad(capital,interes){
            this.modalPagarTotalidadd = true
            this.info.valorApagar = {
                capital,
                interes,
                index:0
            }
        },
        async pagarTotalidad(capital,interes){
            this.spiner = true
            this.modalPagarTotalidadd=false
            let h = new Date()
            let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            for (let a = 0; a < this.credito.pagares.pagares.length; a++) {
                if(!this.credito.pagares.pagares[a].estado){
                    this.credito.pagares.pagares[a].estado = true
                    this.credito.pagares.pagares[a].observacion = 'Se cancelo mediante el metodo de pago completo del credito '
                    this.credito.pagares.pagares[a].fechaPago = hoy
                    this.credito.pagares.pagares[a].dias = 0
                }                  
            }    
            let data = {
                pagares : this.credito.pagares.pagares,
                idCredito : this.credito._id,
                idPagares:this.credito.pagares._id,
                nombre:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                numeroCredito:this.credito.numeroCredito,
                interes,
                capital,
                descripcion:'Cancelacion de credito mediante el pago completo del capital adeudado '+capital+' '+interes+' = '+capital+interes,
                fechaIngresoEfectivo : hoy,
                codigoEmpleado : this.$auth.$state.user._id,

            }
            console.log(data)
            try {
                const okPagoTotal =  await this.$axios.$post('/contabilidad/pagoTotalCredito',data)
                if(okPagoTotal.success){
                    this.spiner = false
                    this.verCredito({_id:this.credito._id})
                    this.cargarCreditos()
                }else{
                    this.spiner = false
                    console.log(okPagoTotal)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async cerrarModalPagarTotalidad(){
            this.modalPagarTotalidadd=false
            this.info.valorApagar = {
                capital:0,
                interes:0,
                index:0
            }
        },
        async cerrarModalFinal(){
            this.modalFinall=false
            this.info.valorApagar = {
                capital:0,
                interes:0,
                index:0
            }
        },
        async modalFinal(capital,interes,index,oldInteres){
            this.modalFinall = true
            this.info.valorApagar = {
                capital,
                interes,
                index,
                oldInteres
            }
        },
        async pagoUltimaCuotaDisminucionCapital(capital,interes,index,oldInteres){
            let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            this.spiner = true
            this.modalFinall=false
            this.credito.pagares.pagares[index].estado = true
            this.credito.pagares.pagares[index].observacion = 'Se cancelo mediante el metodo de abono a capital con disminucion de tiempo aplicado a la ultima cuota'
            this.credito.pagares.pagares[index].fechaPago = hoy
            this.credito.pagares.pagares[index].dias = 0
            this.credito.pagares.pagares[index].interes = interes
            let data = {
                pagares : this.credito.pagares.pagares,
                idCredito : this.credito._id,
                idPagares:this.credito.pagares._id,
                nombre:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                numeroCredito:this.credito.numeroCredito,
                interes,
                capital,
                descripcion:'Se cancelo mediante el metodo de abono a capital con disminucion de tiempo aplicado a la ultima cuota',
                index,
                fechaIngresoEfectivo : hoy,
                codigoEmpleado : this.$auth.$state.user._id,
                oldInteres
            }
            try {               
                if(!this.credito.pagares.pagares[index-1].estado){
                    data.tipo = 'xxx01'
                    const okPagoUltimaCuota =  await this.$axios.$post('/contabilidad/pagoUltimaCuotaDisminucionCapital',data)
                    if(okPagoUltimaCuota.success){
                        this.spiner = false
                        this.verCredito({_id:this.credito._id})
                        this.cargarCreditos()
                    }
                }else{
                    data.tipo = 'ultimaCuota'
                    const okPagoUltimaCuota =  await this.$axios.$post('/contabilidad/pagoUltimaCuotaDisminucionCapital',data)
                    if(okPagoUltimaCuota.success){
                        this.spiner = false
                        this.verCredito({_id:this.credito._id})
                        this.cargarCreditos()
                    }
                }
                
            } catch (error) {
                console.log(error)
            }

        },
        async modalMoverAlFinal(index,interes){
            this.modalMoverAlFinall = true
            this.info.valorApagar = {
                interes,
                index
            }
        },
        async cerrarModalMoverAlFinal(){
            this.modalMoverAlFinall = false
            this.info.valorApagar = {
                interes : 0,
                index : 0
            }
        },
        async moverAlFinal(index,interes){
            let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            this.spiner = true
            let b = 0
            let length = this.credito.pagares.pagares.length
            let frecuencia = this.credito.frecuencia
            let pagados = 0
            for (let a = index; a < length; a++) {
                console.log('aca')
                if(!this.credito.pagares.pagares[a].estado){
                    b = b + 1 
                }else{
                    pagados = pagados + 1
                }                
            }
            let oldPagare = this.credito.pagares.pagares[b+index-1]
            let fecha = new Date(oldPagare.fecha)
            let newPagare = {}
            if(frecuencia==='Mensual' || frecuencia === 'Pago Unico'){
                fecha = fecha.setMonth(fecha.getMonth() + 1)
            }
            if(frecuencia==='Quincenal'){
                fecha = fecha.setDate(fecha.getDate() + 15)
            }
            if(frecuencia==='Semanal'){
                fecha = fecha.setDate(fecha.getDate() + 8)
            }
            newPagare.capital = oldPagare.capital
            newPagare.estado = oldPagare.estado
            newPagare.fecha = new Date(fecha)
            newPagare.interes = oldPagare.interes
            newPagare.interesAlaMora = oldPagare.interesAlaMora
            newPagare.abono = oldPagare.abono
            if(frecuencia === 'Pago Unico'){
                this.credito.pagares.pagares[b+index-1].capital = 0
            }
            this.abonar.push({a:false})
            this.credito.pagares.pagares.splice(b+index,0,newPagare)
            this.credito.pagares.pagares[index].observacion = 'Se pago solo interes y se creo la cuota # '+((b+index)+1)
            this.credito.pagares.pagares[index].estado = true
            this.credito.pagares.pagares[index].dias = 0
            //en las proxias lineas cambiaremos los valores de la que antes fuese la ultima cuota
            this.credito.pagares.pagares[b+index-1].ultimoBtn = false
            const datos = {
                idCredito:this.credito._id,
                fp:this.credito.pagares.pagares[index+1].fecha,
                _id:this.credito.pagares._id,
                pagares:this.credito.pagares.pagares,
                nombre:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                numeroCredito:this.credito.numeroCredito,
                interes,
                index,
                fechaIngresoEfectivo : hoy,
                codigoEmpleado : this.$auth.$state.user._id,
            }
            const actualizarPagaresOk = await this.$axios.$post('/creditos/cambiarPagares',datos)
            console.log(actualizarPagaresOk)
            if(actualizarPagaresOk.success){
                this.spiner = false
                this.verCredito({_id:this.credito._id})
                this.cerrarModalMoverAlFinal()
                console.log('se actualizaron con exito')
            }else{
                alert(actualizarPagaresOk.msg)
            }
        },
        async actualizarMora(){
            const updateOk = await this.$axios.$post('/creditos/actualizarMora')
            if (updateOk.success) {
                alert('Se an actualizado con exito !!!')
            }else{
                alert('error al actualizar')
                console.log(updateOk.error)
            }
            this.cargarCreditos()
        },
        async cargarCreditos(){
            this.entregadosActivosDos = await this.$axios.$get('/creditos/entregadosActivos') 
            this.entregadosActivos = this.entregadosActivosDos
        },
        async verCredito(credito) {
            this.noMostrar = false
            this.enMora = false
            this.enFalso = 0
            this.crAbono={
                capital:0,
                interes:0,
                btn_Abono:false,
                leyenda:'',
            }
            this.cr={
                capital:0,
                interes:0,
            }
            this.crPagoTotal={
                capital:0,
                interes:0,
            }
            let b=0
            this.credito = await this.$axios.$post('/creditos/verCreditoUnico', credito)
            this.verCredit = true
            if(this.modalPago = true){
                this.modalPago = false
            }
            let w = 0
            let pagados = 0
            this.historia(this.credito._id)
            for (let a = 0; a < this.credito.pagares.pagares.length; a++) {  
                this.abonar.push({a:false})
                if(!this.credito.pagares.pagares[a].estado){
                    w=a
                    this.enFalso = this.enFalso + 1  
                    this.cr.capital = this.cr.capital + this.credito.pagares.pagares[a].capital-this.credito.pagares.pagares[a].abono
                    this.crPagoTotal.capital = this.crPagoTotal.capital + this.credito.pagares.pagares[a].capital - this.credito.pagares.pagares[a].abono
                    this.cr.interes = this.cr.interes + this.credito.pagares.pagares[a].interes
                    if(new Date(this.credito.pagares.pagares[a].fecha)<=new Date()){
                        let fechaInicio = new Date(this.credito.pagares.pagares[a].fecha).getTime();
                        let fechaFin = new Date().getTime();
                        let diff = fechaFin - fechaInicio;
                        let cantidadDias = parseInt((diff/(1000*60*60*24)))
                        this.credito.pagares.pagares[a].diasMora = cantidadDias
                        this.credito.pagares.pagares[a].interesAlaMora  = Math.round(((((this.credito.pagares.pagares[a].capital*this.interesMoratorio)/100)/360)*cantidadDias))
                        this.credito.pagares.pagares[this.credito.pagares.pagares.length-1].enMora = true
                        this.enMora = true
                        if(this.credito.frecuencia === 'Pago Unico'){
                          this.credito.pagares.pagares[a].interesAlaMora  = Math.round(((((this.credito.pagares.pagares[a].interes*this.interesMoratorio)/100)/360)*cantidadDias))
                        }
                    }else{                        
                        let fechaInicio = new Date(this.credito.pagares.pagares[a].fecha).getTime();
                        let fechaFin = new Date().getTime();
                        let diff =  fechaInicio - fechaFin;
                        let cantidadDias = parseInt((diff/(1000*60*60*24)))
                        this.credito.pagares.pagares[a].diasFavor = cantidadDias
                        this.credito.pagares.pagares[a].interesAlaMora = 0
                    }
                    if(this.enFalso==1){
                        if(this.credito.pagares.agregadas<2 && !this.credito.pagares.pagares[a].diasMora){
                            this.credito.pagares.pagares[a].pasarAlFinal = true  
                            if(this.credito.pagares.pagares[a].abono){
                                this.credito.pagares.pagares[a].pasarAlFinal = false
                                this.credito.pagares.pagares[a].pasarAlFinalMsg = 'Tienes un abono en esta cuota no puedes pasarla al final'
                            }           
                        }else{
                            if(this.credito.pagares.agregadas==2){
                                this.credito.pagares.pagares[a].pasarAlFinalMsg = 'agotaste las posibilidades de pasar la cuota al final'
                            }
                            if(this.credito.pagares.pagares[a].diasMora > 0){
                                this.credito.pagares.pagares[a].pasarAlFinalMsg = 'No puedes pasar al final por q estas en mora'
                            }
                            if(this.credito.pagares.pagares[a].abono){
                                console.log(this.credito.pagares.pagares[a].abono)
                                this.credito.pagares.pagares[a].pasarAlFinalMsg = 'Tienes un abono en esta cuota no piedes pasarla al final'
                            }
                        }
                    }  
                    if(this.enFalso>2){
                        b=b+1
                        if(this.credito.frecuencia === 'Pago Unico'){   
                            this.crAbono.capital = ((this.credito.pagares.pagares[this.credito.pagares.pagares.length-1].capital * 30)/100)
                            this.crAbono.interes = 0
                            this.crAbono.btn_Abono = true                          
                        }
                        if(this.credito.frecuencia === 'Mensual'){ 
                            if(b<3){                                                              
                                this.crAbono.capital = this.crAbono.capital+this.credito.pagares.pagares[a-2].capital
                                this.crAbono.interes = 0  
                                this.crAbono.btn_Abono = false
                                this.crAbono.leyenda = 'No cumple con las condiciones, se deben 3 o menos de 3 cuotas '                     
                            } 
                            if(b>=2){
                                this.crAbono.btn_Abono = true
                                this.crAbono.leyenda = ''
                            }
                        }
                        if(this.credito.frecuencia === 'Quincenal'){
                            if(b<4) {                            
                                this.crAbono.capital = this.crAbono.capital+this.credito.pagares.pagares[a-2].capital
                                this.crAbono.interes = 0
                                this.crAbono.leyenda = 'No cumple con las condiciones, se deben 4 o menos de 4 quincenas '
                                this.crAbono.btn_Abono = false
                            } 
                            if(b>=3){
                                this.crAbono.btn_Abono = true
                                this.crAbono.leyenda = ''
                            }
                        }
                        if(this.credito.frecuencia === 'Semanal'){
                            if (b<8) {                            
                                this.crAbono.capital = this.crAbono.capital+this.credito.pagares.pagares[a-2].capital
                                this.crAbono.interes = 0
                                this.crAbono.btn_Abono = false
                                this.crAbono.leyenda = 'No cumple con las condiciones, se deben 8 o menos de 8 semanas '
                            } 
                            if(b>=7){
                                this.crAbono.btn_Abono = true
                                 this.crAbono.leyenda = ''
                            }
                        }   
                    }else{
                        /* console.log(this.credito.pagares.pagares[a])    */                  
                    }  
                }else{  
                    //aca sumaremos los pagos en verdadero                   
                    //como guardaremo el valor de dias y el del pago de interes si es el caso y la fecha de pago 
                    //ahy obtendremos las operaciones necesarias para mostrar en pantalla
                    this.credito.pagares.pagares[a].interesAlaMora = 0
                    if(!this.credito.pagares.pagares[a].observacion){
                        pagados = pagados + 1
                    }else{
                        if(a<=pagados){
                            pagados = pagados + 1
                        }
                    }
                }                                      
            }  
            console.log(this.enFalso)
            if(this.enFalso < 2 ){
                this.noMostrar = true
            }
            let diax = 0
            switch (this.credito.frecuencia) {
                case 'Mensual':
                    diax = 30
                    break;
                case 'Pago Unico':
                    diax = 30
                    break;
                case 'Quincenal':
                    diax = 15
                    break;
                case 'Semanal':
                    diax = 8
                break;
                default:
                    break;
            }              
            if(pagados<1){ 
                let fI = new Date(this.credito.pagares.pagares[pagados].fecha)
                let fechaInicio = new Date()
                fI.setDate(fI.getDate()-diax)
                fechaInicio = fI.getTime()
                let hoy = new Date().getTime()
                let diferr = (hoy-fechaInicio)
                let cantDias = parseInt((diferr/(1000*60*60*24)))
                this.crPagoTotal.alert = 'Se calculara el valor de los intereses de acuerdo a los dias de uso que lleva el capital desde que se entrego el credito '+
                this.verFecha(fI)+' de la siguiente manera ((('+this.crPagoTotal.capital+ ' X ' +this.credito.interes+'% ) / '+30.5+' ) X '+cantDias  +
                ') donde 30.5 son los dias promedio de un mes y '+cantDias + ' son los dias de uso desde la entrega del credito'            
                this.crPagoTotal.interes = parseInt((((this.crPagoTotal.capital * this.credito.interes) / 100)/30.5)*cantDias)
                this.crPagoTotal.btn_crPagoTotal = true
               }else{
                let fI = new Date(this.credito.pagares.pagares[pagados-1].fecha)
                let fechaInicio = new Date()
                fechaInicio = fI.getTime()
                let hoy = new Date().getTime()
                let diferr = (hoy-fechaInicio)
                let cantDias = parseInt((diferr/(1000*60*60*24)))
                if(cantDias>0){
                    this.crPagoTotal.alert = 'Se calculara el valor de los intereses de acuerdo a los dias de uso que lleva el capital en uso desde el ultimo pago '+this.verFecha(this.credito.pagares.pagares[pagados-1].fecha) +' de la siguiente manera ((('+this.crPagoTotal.capital+ ' X ' +this.credito.interes+'% ) / '+30.5+' ) * '+cantDias +
                    ') donde 30.5 son los dias promedio de un mes y '+cantDias + ' son los dias de uso desde la ultima fecha de pago'
                    this.crPagoTotal.interes = parseInt((((this.crPagoTotal.capital * this.credito.interes) / 100)/30.5)*cantDias) 
                }else{
                    this.crPagoTotal.alert = 'No debera pagar interes al tener '+ (-1*cantDias) +' dias a favor'
                    this.crPagoTotal.interes = 0               
                }
                this.crPagoTotal.btn_crPagoTotal = true
            }
            if(pagados>2){
                this.refinanciar = true
            }  
            if(this.credito.pagares.pagares[w].diasFavor>0){
                this.credito.pagares.pagares[w].ultimoBtn = true  
            }else{
                this.credito.pagares.pagares[w].ultimoBtn = false
            }       
        },
        async historia(id){
            this.botonH = false
            this.historial = await this.$axios.$post('/contabilidad/HistorialCredito',{id})
        },
        verFecha(fecha){
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            let fech = new Date (fecha)
            const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
            return y         
        },
        async regresando(){
            this.verCredit = false
        },
        async buscando(x){ 
            let persona = {}
            let y = isNaN(x)   
            if(y){
                persona.nombre = x
                const creditosPersona = await this.$axios.$post("/creditos/creditosClienteActivosNombre", persona)
                if (creditosPersona.length>0) {
                    this.entregadosActivos = creditosPersona
                }  else {
                    this.entregadosActivos = this.entregadosActivosDos
                } 
            } else {
                persona.cedula = x
                const creditosPersona = await this.$axios.$post("/creditos/creditosClienteActivosCedula", persona)
                if (creditosPersona.length>0) {
                    this.entregadosActivos = creditosPersona
                }  else {
                    this.entregadosActivos = this.entregadosActivosDos
                } 
            }                    
        },
        async nombreYcedula (){
            const actualizados = await this.$axios.$post('/creditos/nombreYcedula')
            console.log(actualizados) 
        },
        pagarOk(index,pagares,idCredito,nombre,interes){
            if(index===0){
                this.info.interesMora = interes
                this.info.index = index
                this.info.pagares = pagares
                this.info.idCredito = idCredito
                this.info.nombre = nombre
                this.info.valorApagar = {
                    capital:pagares[index].capital-pagares[index].abono,
                    interes:pagares[index].interes,
                }
                if(this.info.valorApagar.capital<0){
                    this.info.valorApagar = {
                        interes:interes+capital,
                        capital:0,
                    }     
                }
                this.modalPago = true
                if(new Date(pagares[index].fecha) < new Date()) {
                    let fechaInicio = new Date(pagares[index].fecha).getTime();
                    let fechaFin = new Date().getTime();
                    let diff = fechaFin - fechaInicio;
                    this.info.cantidadDias = -parseInt((diff/(1000*60*60*24)))
                }else{
                    let fechaInicio = new Date(pagares[index].fecha).getTime();
                    let fechaFin = new Date().getTime();
                    let diff =  fechaInicio - fechaFin;
                    this.info.cantidadDias = parseInt((diff/(1000*60*60*24))); 
                } 
            } else {
                if(!pagares[index-1].estado){
                    alert('error!! la cuota anterior no esta paga')
                }else{
                    this.info.index = index
                    this.info.interesMora = interes
                    this.info.pagares = pagares
                    this.info.idCredito = idCredito
                    this.info.nombre = nombre
                    this.info.valorApagar = {
                        capital:pagares[index].capital-pagares[index].abono,
                        interes:pagares[index].interes
                    }
                    if(this.info.valorApagar.capital<0){
                        this.info.valorApagar = {
                            interes:this.info.valorApagar.interes+this.info.valorApagar.capital,
                            capital:0,
                        }     
                    }
                    this.modalPago = true
                    if(new Date(pagares[index].fecha) < new Date()) {
                        let fechaInicio = new Date(pagares[index].fecha).getTime();
                        let fechaFin = new Date().getTime();
                        let diff = fechaFin - fechaInicio;
                        this.info.cantidadDias = -parseInt((diff/(1000*60*60*24)))
                    }else{
                        let fechaInicio = new Date(pagares[index].fecha).getTime();
                        let fechaFin = new Date().getTime();
                        let diff =  fechaInicio - fechaFin;
                        this.info.cantidadDias = parseInt((diff/(1000*60*60*24))); 
                    }
                }
            }                    
        },
        async pagarCuota(info) {
            let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            console.log(info)
            this.spiner = true
            let valores = {}
            let TrueOrFalse = false            
            if(info.index === info.pagares.length - 1 || info.pagares[info.index+1].estado === true) {
                valores = {
                    numeroCredito : this.credito.numeroCredito,
                    tipo : 'ultimaCuota',
                    capital: info.valorApagar.capital, 
                    interes:info.valorApagar.interes,
                    interesMora:info.interesMora,
                    nombre:info.nombre,
                    descripcion: 'ingreso pago ultima cuota credito #'+this.credito.numeroCredito,
                    codigoEmpleado : this.$auth.$state.user._id,
                    fechaIngresoEfectivo : hoy,
                    idCredito:info.idCredito,
                    idPagares:this.credito.pagares._id,
                    enMora:false,
                    index: info.index,
                    cantidadDias:info.cantidadDias
                }
                if(info.pagares[info.index].diasFavor){
                    valores.diasFavor
                }
                if(info.pagares[info.index].diasMora){
                    valores.diasMora
                }
                if(valores.capital<0){                    
                    valores.interes = valores.interes-valores.capital
                    valores.capital = info.pagares[info.index].capital
                }
                const ingresoOk = await this.$axios.$post("/contabilidad/guardarIngresoCuota", valores)
                if(ingresoOk.success){
                    this.modalPago = false
                    this.info.valorApagar={
                        capital:0,
                        interes:0
                    } 
                    this.verCredito({_id:info.idCredito}) 
                    this.cargarCreditos()                      
                    this.spiner = false       
                }
            }else{
                if(new Date(info.pagares[info.index+1].fecha) < new Date()){
                    TrueOrFalse = true
                }
                valores = {
                    numeroCredito : this.credito.numeroCredito,
                    tipo : 'pagoCuota',
                    capital: info.valorApagar.capital, 
                    interes:info.valorApagar.interes,
                    interesMora:info.interesMora,
                    nombre:info.nombre,
                    descripcion: 'ingreso pago cuota # '+(info.index+1)+' del credito #'+this.credito.numeroCredito,
                    codigoEmpleado : this.$auth.$state.user._id,
                    fechaIngresoEfectivo : hoy,
                    idCredito:info.idCredito,
                    idPagares:this.credito.pagares._id,
                    proximaFp:info.pagares[info.index+1].fecha,
                    valCuotaMens:info.pagares[info.index+1].capital+info.pagares[info.index+1].interes,
                    enMora:TrueOrFalse,
                    index: info.index,
                    cantidadDias:info.cantidadDias
                }
                if(valores.capital<0){                    
                    valores.interes = valores.interes-valores.capital
                    valores.capital = info.pagares[info.index].capital
                }
                const ingresoOk = await this.$axios.$post("/contabilidad/guardarIngresoCuota", valores)
                if(ingresoOk.success){
                    this.modalPago = false 
                    this.info.valorApagar={
                        capital:0,
                        interes:0
                    }
                    this.verCredito({_id:info.idCredito})     
                    this.cargarCreditos()   
                    this.spiner = false 
                            
                }  
            }       
        },
        async abonoTrue (index){
            if(index==0){
                this.abonar[index].a = true
            }else if(this.credito.pagares.pagares[index-1].estado==false){
                alert('debe ser el consecutivo a que se encuentre pago o en su defecto el primero')
            } else {
                this.abonar[index].a = true
            }         
        },
        async abonoFalse (index){
            this.abonar[index].a = false
        },
        async guardarAbono(valAbono, index, idPagares,idCredito,numeroCredito,pags){
            let capital = 0
            let interes = 0
            let abono = pags.abono
            let descripcion = ''
            valAbono = parseInt(valAbono)
            const capMasInteres = pags.capital + pags.interes - pags.abono 
            if(valAbono>0){
                if(valAbono>capMasInteres){
                    alert('el abono supera el valor total de la cuota')
                    this.spiner = false 
                }else{
                    if(valAbono+pags.abono>pags.capital){
                        capital=capMasInteres-pags.interes
                        interes = ((valAbono+pags.abono)-pags.capital) 
                        descripcion= '1ingreso abono a cuota # '+(index+1)+' del credito #'+this.credito.numeroCredito
                        if (capital<0){
                            console.log(capital)
                            console.log(interes)
                            console.log((interes+capital))
                            interes = (interes+capital)
                            capital = 0
                            descripcion= '2ingreso abono a cuota # '+(index+1)+' del credito #'+this.credito.numeroCredito+' solo interes no se debia a capital en la cuota'
                        }            
                    }else{
                        descripcion= '3ingreso abono a cuota # '+(index+1)+' del credito #'+this.credito.numeroCredito
                        capital = valAbono
                        interes = 0
                    }    
                    let h = new Date()
                    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))                
                    let valores = {
                        numeroCredito,
                        capital,
                        interes,
                        abono,
                        concepto:'Abono',
                        nombre:this.credito.cliente.nombreCliente+' '+this.credito.cliente.primerApellidoCliente+' '+this.credito.cliente.segundoApellidoCliente,
                        descripcion : descripcion,
                        codigoEmpleado : this.$auth.$state.user._id,
                        fechaIngresoEfectivo : hoy,
                        idCredito,
                        idPagares,
                        index,
                    }
                    if(this.credito.frecuencia === 'Pago Unico' && index < this.credito.pagares.pagares.length-1) {
                        valores.tipo = 'Pago Unico'
                    }
                    this.spiner = true
                    const abonoOk = await this.$axios.$post('/contabilidad/guardarAbono',valores)
                    if(abonoOk.success){
                        this.verCredito({_id:idCredito}) 
                        this.cargarCreditos() 
                        valores = {}
                        this.valAbono = 0
                        this.spiner = false
                        this.abonar[index].a = false
                    }else{
                        alert('A ocurrido un error')
                        this.spiner = false
                    }
                }
            }else{
                alert('ingresa un valor ')
            }
            
        },
        async abonoAcapital(capitalMinimoAbonar){
            this.capitalMinimoAbonar = capitalMinimoAbonar
            this.modalAbonoCapital = true
        },
        async guardarAbonoCapital(abono, abonoMinimo,abonoMaximo, n,id){
            let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
            abono = parseInt(abono)
            if (abono) {
                if(abono<abonoMinimo){
                    return
                }else if(abono>abonoMaximo){
                    return
                }else{
                    let nuevoValInteres = 0
                    if(n===1){
                        let y  = 0
                        let r = 0                        
                        let pagares = this.credito.pagares.pagares
                        for (let a = pagares.length-1; a >= 0; a--) {
                            if(!pagares[a].estado){
                                y = y + pagares[a].capital
                                if(y<=abono){
                                    let restante = abono - y
                                    pagares[a].estado = true
                                    pagares[a].fechaPago = hoy
                                    pagares[a].interes = 0
                                    pagares[a].observacion = 'cancelado mediante abono a capital con reduccion de tiempo'
                                    if(restante<pagares[a-1].capital){
                                        r = restante
                                    }
                                    pagares[a].dias = 0
                                }
                                nuevoValInteres = nuevoValInteres + pagares[a].interes
                                
                            }else{
                                alert('la cuota # '+(a+1) +'con fecha de pago: '+ pagares[a].fecha+' ya se encuentra paga');
                            }               
                        }
                        if(r>0){
                            let c = 0
                            for (let b = 0; b < pagares.length; b++) {
                                if(pagares[b].estado==false && c<1){
                                    c=c+1
                                    pagares[b].abono = r
                                }                                
                            }
                        }
                        
                        const data = {
                            concepto:'Abono a capital',
                            nombre:this.credito.nombreCliente,
                            numeroCredito : this.credito.numeroCredito, 
                            descripcion: 'ingreso abono a capital con reduccion de tiempo al credito '+this.credito.numeroCredito,
                            codigoEmpleado : this.$auth.$state.user._id,
                            fechaIngresoEfectivo : hoy,
                            idCredito:this.credito._id,
                            idPagares:this.credito.pagares._id,
                            pagares,
                            capital:abono,
                            interes:0,
                            nuevoValInteres
                        } 
                        const actualizarPagares = await this.$axios.$post('/contabilidad/actualizarPagares',data)
                        if(actualizarPagares.success){
                            this.verCredito({_id:id}) 
                            this.cargarCreditos() 
                            this.modalAbonoCapital=false
                            this.capitalMinimoAbonar = 0
                            this.valorAbono= ''
                        }
                    }                    
                    if(n===2){
                        let b = 0
                        let quedaDebiendo = abonoMaximo - abono
                        let pagares = this.credito.pagares.pagares
                        for (let a = pagares.length-1; a >= 0; a--) {
                            if(!pagares[a].estado){
                                b = b + 1
                            }
                        }
                        let valorCuota = quedaDebiendo / b
                        nuevoValInteres = (((quedaDebiendo * this.credito.interes) / 100)*b)
                        let interes = ((quedaDebiendo * this.credito.interes) / 100)
                        if(this.credito.frecuencia == 'Mensual'){
                            interes = interes
                        }
                        if(this.credito.frecuencia == 'Quincenal'){
                            let intt = interes
                            interes = ((intt / 30 )* 15)
                        }
                        if(this.credito.frecuencia == 'semanal'){
                            let intt = interes
                            interes = ((intt / 30 )* 7)
                        }
                        for (let a = pagares.length-1; a >= 0; a--) {
                            if(!pagares[a].estado){
                                pagares[a].capital = parseInt(valorCuota)                                
                                pagares[a].interes = parseInt(interes)
                            }
                        }
                        const data = {
                            concepto:'Abono a capital',
                            nombre:this.credito.nombreCliente,
                            numeroCredito : this.credito.numeroCredito, 
                            descripcion: 'ingreso abono a capital con reduccion en valor de cuota al credito # '+this.credito.numeroCredito,
                            codigoEmpleado : this.$auth.$state.user._id,
                            fechaIngresoEfectivo : hoy,
                            idCredito:this.credito._id,
                            idPagares:this.credito.pagares._id,
                            pagares,
                            capital:abono,
                            interes:0,
                            nuevoValInteres,
                        } 
                        const actualizarPagares = await this.$axios.$post('/contabilidad/actualizarPagares',data)
                        if(actualizarPagares.success){
                            this.verCredito({_id:id}) 
                            this.cargarCreditos() 
                            this.modalAbonoCapital=false
                            this.capitalMinimoAbonar = 0
                            this.valorAbono= ''
                        }
                    }
                }   
            }else{
                console.log('errorCuatro')
                return                
            }
        }
    },
}
</script>

<style>

</style>