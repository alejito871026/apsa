export const state = () => ({
    buscarClienteCreditoNuevo:false,
    botonAgregarCredito:false,
    verCreditoUnico:false,
    cargarCreditos:false,
})
export const getters= {
} 
export const mutations={
    estadoBuscadorClienteCreditoNuevo(state,valor){
        state.buscarClienteCreditoNuevo = valor
    },
    estadoBotonAgregarCredito(state,valor){
        state.botonAgregarCredito = valor
    },
    estadoVerCreditoUnico(state,valor){
        state.verCreditoUnico = valor
    },
    estadoCargarCreditos(state,valor){
        state.cargarCreditos = valor
    },
}
export const actions= {}
