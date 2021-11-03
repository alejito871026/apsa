const { Math } = require('core-js');
const CryptoJS = require('crypto-js')
const f = {};
f.validarUsuario = async ($axios,app)=>{  
    let res = await $axios.get('/login/validarToken') 
    if(res.status===200){
        let data = {
            access:true
        }  
        return data
    }
    if(res.status===205){
        let data = {
            access:false,
            code:401
        } 
        return data
    }        
} 
f.sumar = function(cantida,intere,cuotaInicia,tiemp,aumentoPorDia){
    let cantidad = parseInt(cantida)
    let interes = parseInt(intere)
    let cuotaInicial = parseInt(cuotaInicia)
    let tiempo = parseInt(tiemp)
    let aumentoPorDias = aumentoPorDia
    let canti = 0
    let interesTotal = 0
    let interesTotall = 0
    if(cantidad>0){
        canti = cantidad
    }
    if(interes>0){
        interesTotal = canti * interes /100 
    }
    if(tiempo>0){
        interesTotall = interesTotal * tiempo 
    }
    return (canti + cuotaInicial + interesTotall + aumentoPorDias)
};
f.calcularInteresMensual = (cantidad, interes)=>{
    return  cantidad*interes/100;
};
f.totalCredito = (tiempo,cantidad,interesMensual)=>{
    const tiemp=parseInt(tiempo);
    const montoDiner=parseInt(cantidad);
    const interesMensua=parseInt(interesMensual);
    const cantidadTotalCredito = (tiemp * interesMensua) + montoDiner;
    return cantidadTotalCredito;
};
class infoPagares{
    constructor(fecha,capital,interes){
        this.fecha=fecha
        this.capital=capital
        this.interes=interes
        this.estado = false
        this.abono = 0
    }
    
}
f.pagares = (frecuencia,tiempo,cantidad,inter,interesMensual,fechaPago) => {
    let pagares = []
    let cantidadCuotas = 0
    let valorCuota = 0
    if(frecuencia === 'Mensual'){
        valorCuota =Math.round((parseInt(cantidad) + parseInt((interesMensual*tiempo)))/parseInt(tiempo))
        capital = Math.round(cantidad / tiempo)
        cantidadCuotas = tiempo
        let f1 = new Date(fechaPago)
        let r = f1.setDate(f1.getDate()+1)
        r = f1.setHours(01,00,00,0)
        let fPago = new Date(r)
        let fPagoo = new Date(r)
        let pagare = new infoPagares(fPago,capital,interesMensual)
        pagares.push(pagare)
        for (let a = 1; a < tiempo; a++) {
            let rfPago = fPagoo.setMonth(fPagoo.getMonth()+1)
            rfPago = fPagoo.setHours(01,00,00,0)
            let fPagos= new Date(rfPago)
            let pagar = new infoPagares(fPagos,capital,interesMensual)
            pagares.push(pagar)                
        }
    }
    if (frecuencia === 'Quincenal') {
        valorCuota = Math.round(((parseInt(cantidad) + parseInt((interesMensual*tiempo)))/parseInt(tiempo)/2))
        capital = Math.round((cantidad / tiempo/2))
        cantidadCuotas = tiempo * 2
        let f1 = new Date(fechaPago)
        let r = f1.setDate(f1.getDate()+1)
        r = f1.setHours(01,00,00,0)
        let fPago = new Date(r)
        let fPagoo = new Date(r)
        let pagare = new infoPagares(fPago,capital,(interesMensual/2))
        pagares.push(pagare)
        for (let a = 1; a < cantidadCuotas; a++) {
            if(a%2==0){
                let rfPago = fPagoo.setDate(fPagoo.getDate()+15)
                rfPago = fPagoo.setHours(01,00,00,0)
                let fPagos= new Date(rfPago)
                let pagar = new infoPagares(fPagos,capital,(interesMensual/2))
                pagares.push(pagar)                
            }else{
                let rfPago = fPagoo.setMonth(fPagoo.getMonth()+1)
                let fPagos= new Date(rfPago)
                let rfPagoo = fPagoo.setDate(fPagoo.getDate()-15)
                rfPagoo = fPagoo.setHours(01,00,00,0)
                fPagos = new Date(rfPagoo)
                let pagar = new infoPagares(fPagos,capital,(interesMensual/2))
                pagares.push(pagar)
            }                
        }
    }
    if (frecuencia === 'Semanal'){
        let f1 = new Date()
        let fff1 = new Date(f1)
        let finicio =new Date(fff1.setDate(fff1.getDate()+2))
        let f2 = new Date(finicio)
        let ffin =new Date(f2.setMonth((f2.getMonth())+parseInt(tiempo)))
        while (finicio<=ffin) {
            let rfPago = finicio.setDate(finicio.getDate()+7)
            rfPago = finicio.setHours(01,00,00,0)
            let fPagos= new Date(rfPago)
            let pagar = new infoPagares(fPagos,0,0)
            pagares.push(pagar) 
        }
        let capi = cantidad/pagares.length+1
        let interM = ((interesMensual*tiempo)/pagares.length)
        for (let a = 0; a < pagares.length; a++) {
            pagares[a].capital = Math.round(capi)
            pagares[a].interes = Math.round(interM)
        }
        cantidadCuotas = pagares.length
        valorCuota =  Math.round(capi + interM)
        console.log(pagares)      
    }
    if (frecuencia === 'Pago Unico'){
        cantidadCuotas = tiempo
        valorCuota = interesMensual
        let f1 = new Date(fechaPago)
        let r = f1.setDate(f1.getDate()+1)
        r = f1.setHours(01,00,00,0)
        let fPago = new Date(r)
        let fPagoo = new Date(r)
        let pagare = new infoPagares(fPago,0,interesMensual)
        pagares.push(pagare)
        for (let a = 1; a < tiempo; a++) {
            if(a===(tiempo-1)){
                let rfPago = fPagoo.setMonth(fPagoo.getMonth()+1)
                rfPago = fPagoo.setHours(01,00,00,0)
                let fPagos= new Date(rfPago)
                let pagar = new infoPagares(fPagos,cantidad,interesMensual)
                pagares.push(pagar)
            }else{
                let rfPago = fPagoo.setMonth(fPagoo.getMonth()+1)
                rfPago = fPagoo.setHours(01,00,00,0)
                let fPagos= new Date(rfPago)
                let pagar = new infoPagares(fPagos,0,interesMensual)
                pagares.push(pagar)
            }                            
        }
    }
    let respuesta = {
        cantidadCuotas,
        valorCuota,
        pagares
    };
    return respuesta;
}
module.exports = f;