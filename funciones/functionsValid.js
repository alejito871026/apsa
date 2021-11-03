const axios = require('axios')
const formatDecimal = require('format-decimal')
const f = {};
class pagos {
    constructor(dia,mes,ano){
      this.dia = dia;
      this.mes = mes;
      this.ano = ano;
      this.estado = false;
      this.valorCuota = 0;
      this.interesCuota  = 0;
      this.abono = 0;
    }
  }
f.calcularInteresMensual = (montoDinero, interes)=>{
    return  montoDinero*interes/100;
};

f.totalCredito = (tiempo,montoDinero,interesMensual)=>{
    const tiemp=parseInt(tiempo);
    const montoDiner=parseInt(montoDinero);
    const interesMensua=parseInt(interesMensual);
    const cantidadTotalCredito = (tiemp * interesMensua) + montoDiner;
    return cantidadTotalCredito;
};

f.sumarDias=(fecha, dias)=>{
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

f.pagares=(dp, cm, f, monto, mess, sumaA, intereses , valor, mes )=>{
    const sumaAno = sumaA
    var t=monto
    var mess = mess
    var dp = dp
    var cm = cm//en mese 6-12-18-24..72
    var f = f;
    var cuentaDias = 0;
    var cont = 0;
    var intereses = intereses
    Ano=new Date().getFullYear()
    if(sumaAno){

        Ano ++
    }
    var Mes=(new Date().getMonth()+1);
    var diasFI =new Date().getDate()+2
    var totalPagos = 0
    if(diasFI == dp){
        diasFI = diasFI+1
    }
    var pagares=[]
    //se establece una bandera dp22 que contedra el valor del dia de pagp dp
    var dp22 = dp
    switch(f){
        case 'mensual':{
            var pagar = new pagos(dp, mes, Ano)
            pagares[0]=pagar;
            for(let r = 1; r <= cm-1; r++){
                    mes++
                    if(mes>12){
                        mes=1
                        Ano=Ano+1
                    }
                    if(mes == 2 && dp > 28){
                        dp = 28
                    }else{
                        dp = dp22
                    }
                    pagar=new pagos(dp,mes,Ano)   
                    pagares.push(pagar);
                }
            totalPagos=pagares.length
            var valCuotas=t/totalPagos
            valCuotas= Math.round(valCuotas); 

            break
        }
        case 'quincenal':{
            cuentaDias=15;
            var dpp=parseInt(dp)
            //la siguiente variable contiene el numero de la siguiente  fecha pasados 15 dias de la fecha establecida como fecha de pago
            var proxF=(dpp+cuentaDias)
            //r2 contendra el valor original de la proxima fecha.
            var r2 = proxF
            var r22 = r2
            if(mess == 2 && dp > 28){
                dp = 28
            }else{
                dp = dp22
            }
            let interess = valor / 2
            var pagar=new pagos(dp,mess,Ano,false,0,interess)
            pagares[0]=pagar;
            if(proxF>30){
                proxF = (proxF - 30)
                r2 = proxF

                mess++
            }
            if(mess>12){
                mess=1
                Ano=Ano+1
            }
            if(mess == 2 && proxF > 28){
                proxF = 28
            }else{
                proxF = r2
            } 
            var pagar2=new pagos(proxF,mess,Ano,false,0,interess)
            pagares.push(pagar2);
            for(let l=1;l<=cm-1;l++){   
                if(mess == 2 && dp > 28){
                    dp = 28
                }else{
                    dp = dp22   
                }
                if(r22 <= 30){
                    mess++  
                }                     
                if(mess>12){
                    mess=1
                    Ano=Ano+1
                }
                pagar=new pagos(dp,mess,Ano,false,0,interess)
                pagares.push(pagar);
                if(r22>30){
                    mess++
                    }   
                    if(mess>12){
                        mess=1
                        Ano=Ano+1
                    } 
                    if(mess == 2 && proxF > 28){
                        proxF = 28
                    }else{
                        proxF = r2
                    }                                            
                pagar2=new pagos(proxF,mess,Ano,false,0,interess)
                pagares.push(pagar2)                 
            }          
            totalPagos=pagares.length
            var valCuotas=t/totalPagos
            valCuotas= Math.round(valCuotas); 
            break
        }
        case 'semanal': {
            diasFI = diasFI -1
            var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            cuentaDias = 7;
            Mes = Mes;
            if(diasFI > meses[Mes-1]){
                diasFI = diasFI - meses[Mes - 1]
                Mes++
            }
            for (let l = 0; l <= cm;) {
                for (let a = diasFI; a <= meses[Mes - 1];) {
                    cont++
                    if (cont == cuentaDias) {
                        var pagar = new pagos(a, Mes, Ano)
                        pagares.push(pagar);
                        cont = 0
                    }
                    a++
                    if (a >= meses[Mes - 1]) {
                        diasFI = 1
                    }
                }
                Mes++
                l++
                if (Mes > 12) {
                    Ano++
                    Mes=1
                }
            }
            totalPagos=pagares.length
            var valCuotas=t/totalPagos
            valCuotas= Math.round(valCuotas); 
            break
        }
        case 'diario':{            
            var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            cuentaDias=1;
            Mes = Mes;
            diasFI = diasFI -1
            if(diasFI > meses[Mes-1]){
                diasFI = diasFI - meses[Mes - 1]
                Mes++
            }
            for (let l = 0; l <= cm;) {
                for (let a = diasFI; a <= meses[Mes - 1];) {
                    cont++
                    if (cont == cuentaDias) {
                        var pagar = new pagos(a, Mes, Ano)
                        pagares.push(pagar);
                        cont = 0
                    }
                    a++
                    if (a >= meses[Mes - 1]) {
                        diasFI = 1
                    }
                }
                Mes++
                l++
                if (Mes > 12) {
                    Ano++
                    Mes=1
                }
            }
            totalPagos=pagares.length
            var valCuotas=t/totalPagos
            valCuotas= Math.round(valCuotas); 
            break
        }
        case 'pagoUnico' : {
            for (let l = 1; l <= cm;) {
                mess = mess+1
                if (mess > 12) {
                    Ano++
                    mess=1
                }
                if(mess == 2 && dp > 28){
                    dp = 28
                }else{
                    dp = dp22
                }
                var pagar = new pagos(dp, mess, Ano)
                pagares.push(pagar);                
                l++
            }
            totalPagos=pagares.length
            var valCuotas = valor*intereses/100;
            valCuotas= Math.round(valCuotas); 
            break
        }
    } 
    var  devolver ={
        pagares,
        valCuotas,
        totalPagos
    }
    return devolver   
}
module.exports = f;