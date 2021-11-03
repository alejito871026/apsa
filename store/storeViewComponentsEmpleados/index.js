export const state = () => ({
    actualizarTablaEmpleados:false
})
export const getters= {
} 
export const mutations={
    estadoActualizarTablaEmpleados(state,valor){
        state.actualizarTablaEmpleados = valor
    },
}
export const actions= {}