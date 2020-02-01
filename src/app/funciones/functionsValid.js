const axios = require('axios')
const formatDecimal = require('format-decimal')
const f = {};
class pagos {
    constructor(dia,mes,ano){
      this.dia = dia;
      this.mes = mes;
      this.ano = ano;
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



f.pagares=(dp, cm, f, monto, mess, sumaA, intereses , valor )=>{
    const sumaAno = sumaA
    const fechaA = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear();
    var t=monto
    var mess = mess
    var dp = dp
    var cm = cm//en mese 6-12-18-24..72
    var f = f;
    var cuentaDias = 0;
    var d ="";
    var m ="";
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
            //si la frecuancia de pago es mensual se ejecutara el siguiente codigo
            cantCuotas=1;
            cuentaDias=30;  
            //si el dia de pago escogido es menor a la fecha de inicio del credito entonces se validara y se ejcutara el siguiente codigo           
                if (dp < diasFI) {  
                    // esta ciclo for ira desde el dia de inicio del credito hasta la fecha de pago, como sabemos que es menor la fecha de pago que la de inicio 
                    // se cumplira  el cambio de mes  y la variable a debera ir hasta 30 que son los dias establecidos por cada mes  y sumarle los dias de la pago                 
                    for (var a = diasFI; a <= 30 + parseInt(dp) ;) {
                        a++
                        //este contador tendra los dias que hay entre el dia de inicio y el dia de pago establecido para la cuota
                        cont++
                    }
                    if (cont <= 8) {
                    //establecemos 8 dias de gracia para el primer 
                    //si el valor del contador es menor a 8 significa que la fecha de pago se cumplira en los dias que tenga establecidos el contador,
                    //y el pago de la cuota se correra para el siguiente mes.
                        console.log('cobro por meses cuando el dia de pago es menor al dia de inicio del credito y el contador de dias es <= 8')  
                        Mes=Mes+2;
                        //como el contador es menor a 8 y se ha de cumplir el cambio dem es en el paso de estos mismos 8 entonces el mes debera aumentarce en dos
                        // si es 29 de un mes y la fecha establecida es el 6, al llegar el 6 del proximo mes no se habran cumplido los 8 dias que se dan
                        // de gracias para el primer cobro  y este se corrrera hasta el otro mes por eso se aumenta en 2 el mes
                        // el siguiente if valida si el mes es mayor a 12 para hacer que el siguiente mes sea 1 y no 13 y si esto se cumple tambien aumentara el año en 1
                        if(Mes>12){
                            Mes = 1
                            Ano=Ano+1
                        }
                        //en el siguiente if validamos que si el mes de inicio es febrero y el dia de pago establecido es mayor a 28
                        // entonces en este mes el dia de pago sea 28 y no un numero mayor
                        if(Mes == 2 && dp > 28){
                            dp = 28
                        } 
                        //en estra primera ocacion  la variable pagar es un objeto que contiene el dia de pago el mes y el año de la primera cuota del credito
                        var pagar=new pagos(dp,Mes,Ano)
                        //agregamos esta primer fecha de pago al array de pagares
                        pagares[0]=pagar;
                        for(let l=1;l<=cm-1;l++){
                            // en este ciclo for  la variable l empezara en 1 y ira hasta (cm cuentaMeses) nummero de meses establecido como tiempo para el pago
                            //aumentara el mes en 1 cada ciclo 
                            Mes++
                            //de nuevo validamos si el mes es mayor a 12, lo hacemos dentro de for  ya que en el ciclo los meses estan aumentado y posible mente pasemos por el mes 12 
                            //en repetidas ocaciones
                            if(Mes>12){
                                Mes=1
                                Ano=Ano+1
                            }
                            //de nuevo validamos si el mes inicio es febrero y el dia de pago establecido es mayor a 28, lo hacemos dentro de for  
                            //ya que en el ciclo los meses estan aumentado y posiblemente pasemos por el mes 2 en repetidas ocaciones
                            if(Mes == 2 && dp > 28){
                                dp = 28
                            }else{
                                dp = dp22
                            }  
                            //incertamos en el array de pagares los pagos correspondientes desde el segundo mes ya que el primero se inserto antes del ciclo for
                            //insertamos uno cada vez que el ciclo for se cumple para geerar hasta el ultimo pago segun los mese de pago establecidos
                            pagar=new pagos(dp,Mes,Ano)
                            pagares.push(pagar);
                        }
                    } else {
                        //si el contador es mayor a 8 significa que antes de cumplirce el primer pago ya habrian pasado 8 dias  y el pago se
                        // generaria para el mes siguiente inmediato
                        Mes=Mes+1;
                        //validamos si el mes es mayor a 12 y lo convertiremos en mes 1 y aumentamos el año 
                        if(Mes>12){
                            Mes = 1
                            Ano=Ano+1
                        }                
                        //validamos que si el mes de inicio es febrero y el dia de pago establecido es mayor a 28
                        // entonces en este mes el dia de pago sea 28 y no un numero mayor
                        if(Mes == 2 && dp > 28){
                            dp = 28
                        }else{
                            dp = dp22
                        }
                        //asignamos el primer pagare al array de pagares 
                        var pagar=new pagos(dp,Mes,Ano)
                        pagares[0]=pagar;
                        for(let l=1;l<=cm-1;l++){
                            // en este ciclo for  la variable l empezara en 1 y ira hasta (cm cuentaMeses) nummero de meses establecido como tiempo para el pago
                            //aumentara el mes en 1 cada ciclo 
                            Mes++
                            //de nuevo validamos si el mes es mayor a 12, lo hacemos dentro de for  ya que en el ciclo los meses estan aumentado 
                            //y posible mente pasemos por el mes 12 en repetidas ocaciones
                            if(Mes>12){
                                Mes=1
                                Ano=Ano+1
                            }
                            //de nuevo validamos si el mes inicio es febrero y el dia de pago establecido es mayor a 28, lo hacemos dentro de for  
                            //ya que en el ciclo los meses estan aumentado y posiblemente pasemos por el mes 2 en repetidas ocaciones
                            if(Mes == 2 && dp > 28){
                                dp = 28
                            }else{
                                dp = dp22
                            }  
                            //incertamos en el array de pagares los pagos correspondientes desde el segundo mes ya que el primero se inserto antes del ciclo for
                            //insertamos uno cada vez que el ciclo for se cumple para geerar hasta el ultimo pago segun los mese de pago establecidos
                            pagar=new pagos(dp,Mes,Ano)
                            pagares.push(pagar);
                            
                        }
                    }
                } else {
                    //esta else se cumplira cuando la fecha de pago sea mayor a la fecha de inicio del credito
                    //si se cumple significa que posiblememnte la primera cuota del credito deba pagarse en el mismo mes que esta corriendo.
                    console.log('cobro por meses cuando el dia de pago es mayor al dia de inicio del credito y el contador de dias es <= 8')
                    for (var a = diasFI; a <= parseInt(dp);) {
                        //este contador tendra los dias que hay entre el dia de inicio y el dia de pago establecido para la cuota  
                        a++
                        cont++
                    }
                    if (cont <=  8) {
                        //si es menor o igual a 8 significa que la fecha de pago establecida se cumplira en los ocho dias siguientes, entonces la primera fecha de pago 
                        //se asignara para el mes siguiente, por eso aumentamos el mes en 1.
                        Mes=Mes+1;
                        //validamos si el mes es mayor a 12 y lo convertiremos en mes 1 y aumentamos el año en 1
                        if(Mes>12){
                            Mes = 1
                            Ano=Ano+1
                        }                
                        //validamos que si el mes de inicio es febrero y el dia de pago establecido es mayor a 28
                        // entonces en este mes el dia de pago sea 28 y no un numero mayor
                        if(Mes == 2 && dp > 28){
                            dp = 28
                        }else{
                            dp = dp22
                        }
                        //asignamos el primer pagare al array de pagares 
                        var pagar=new pagos(dp,Mes,Ano)
                        pagares[0]=pagar;
                        
                        for(let l=1;l<=cm-1;l++){
                           // en este ciclo for  la variable l empezara en 1 y ira hasta (cm cuentaMeses) nummero de meses establecido como tiempo para el pago
                            //aumentara el mes en 1 cada ciclo 
                            Mes++
                            //de nuevo validamos si el mes es mayor a 12, lo hacemos dentro de for  ya que en el ciclo los meses estan aumentado 
                            //y posible mente pasemos por el mes 12 en repetidas ocaciones
                            if(Mes>12){
                                Mes=1
                                Ano=Ano+1
                            }
                            //de nuevo validamos si el mes inicio es febrero y el dia de pago establecido es mayor a 28, lo hacemos dentro de for  
                            //ya que en el ciclo los meses estan aumentado y posiblemente pasemos por el mes 2 en repetidas ocaciones
                            if(Mes == 2 && dp > 28){
                                dp = 28
                            }else{
                                dp = dp22
                            } 
                            //incertamos en el array de pagares los pagos correspondientes desde el segundo mes ya que el primero se inserto antes del ciclo for
                            //insertamos uno cada vez que el ciclo for se cumple para generar hasta el ultimo pago segun los mese de pago establecidos
                            pagar=new pagos(dp,Mes,Ano)
                            pagares.push(pagar);
                        }
                    } else {
                        //si el contador es mayor a 8 significa que  el pago se generaria para el mes que esta corriendo en la fecha establecida  ya que 
                        //habrian pasado mas de 8 dias desde la fecha de inicio del credito hasta la fecha de primer pago                     
                        Mes=Mes;
                        if(Mes>12){
                            Mes = 1
                            Ano=Ano+1
                        }
                        //validamos que si el mes de inicio es febrero y el dia de pago establecido es mayor a 28
                        // entonces en este mes el dia de pago sea 28 y no un numero mayor
                        if(Mes == 2 && dp > 28){
                            dp = 28
                        }else{
                            dp = dp22
                        }
                        //asignamos el primer pagare al array de pagares 
                        var pagar=new pagos(dp,Mes,Ano)
                        pagares[0]=pagar;
                        for(let l=1;l<=cm-1;l++){
                            // en este ciclo for  la variable l empezara en 1 y ira hasta (cm cuentaMeses) nummero de meses establecido como tiempo para el pago
                            //aumentara el mes en 1 cada ciclo 
                            Mes++
                            //de nuevo validamos si el mes es mayor a 12, lo hacemos dentro de for  ya que en el ciclo los meses estan aumentado 
                            //y posible mente pasemos por el mes 12 en repetidas ocaciones
                            if(Mes>12){
                                Mes=1
                                Ano=Ano+1
                            }
                            //de nuevo validamos si el mes inicio es febrero y el dia de pago establecido es mayor a 28, lo hacemos dentro de for  
                            //ya que en el ciclo los meses estan aumentado y posiblemente pasemos por el mes 2 en repetidas ocaciones
                            if(Mes == 2 && dp > 28){
                                dp = 28
                            }else{
                                dp = dp22
                            } 
                            //incertamos en el array de pagares los pagos correspondientes desde el segundo mes ya que el primero se inserto antes del ciclo for
                            //insertamos uno cada vez que el ciclo for se cumple para generar hasta el ultimo pago segun los mese de pago establecidos
                            pagar=new pagos(dp,Mes,Ano)
                            pagares.push(pagar);
                        }
                    }
                }
                //asignamos los valores a las variables definidas inicialmente para retornanrlas al final del switch en la funcion    
            totalPagos=pagares.length
            var valCuotas=t/totalPagos
            valCuotas= Math.round(valCuotas); 
            valCuotas=formatDecimal(valCuotas)

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
            var pagar=new pagos(dp,mess,Ano)
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
            var pagar2=new pagos(proxF,mess,Ano)
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
                pagar=new pagos(dp,mess,Ano)
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
                pagar2=new pagos(proxF,mess,Ano)
                pagares.push(pagar2)                 
            }          
            totalPagos=pagares.length
            var valCuotas=t/totalPagos
            valCuotas= Math.round(valCuotas); 
            valCuotas=formatDecimal(valCuotas)
            break
        }
        case 'semanal': {
            console.log(diasFI)
            diasFI = diasFI -1
            console.log(diasFI)
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
            valCuotas=formatDecimal(valCuotas)
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
            valCuotas=formatDecimal(valCuotas)
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
                console.log(pagar)
                pagares.push(pagar);                
                l++
            }
            totalPagos=pagares.length
            var valCuotas = valor*intereses/100;
            valCuotas= Math.round(valCuotas); 
            valCuotas=formatDecimal(valCuotas)
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