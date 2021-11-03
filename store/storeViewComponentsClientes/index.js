export const state = () => ({
    botonCrearCliente:false,
    crearCliente:false,
    tablaClientes:false,
})
export const getters= {
} 
export const mutations={
    estadoCrearCliente(state,valor){
        state.crearCliente = valor
    },
    estadoBotonCrearCliente(state,valor){
        state.botonCrearCliente = valor
    },
    estadoTablaClientes(state,valor){
        state.tablaClientes = valor
    }
}
export const actions= {}
