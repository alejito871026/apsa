export const state = () => ({
    capitalIngresos:0,
    interesIngresos:0,
    capitalEgresos:0,
    carteraCapital:0,
    carteraInteres:0,
})
export const getters= {
} 
export const actions = {
    async cargarValoresCapital({commit}) {
        const capitalIngresos = await this.$axios.$post("/contabilidad/sumarCapitalIngresos")
        commit('estadoCapitalIngresos',capitalIngresos)
    },
    async cargarValoresInteres({commit}) {
        const interesIngresos = await this.$axios.$post("/contabilidad/sumarInteresIngresos")
        commit('estadoInteresIngresos',interesIngresos)
    },
    async cargarValoresEgresos({commit}) {
        const capitalEgresos = await  this.$axios.$post("/contabilidad/sumarEgresos")
        commit('estadoCapitalEgresos',capitalEgresos)
    },
    async cargarCarteraCapital({commit}) {
        const capitalCartera = await  this.$axios.$post("/contabilidad/sumarCapitalCartera")
        commit('estadoCapitalCartera',capitalCartera)
    },
    async cargarCarteraInteres({commit}) {
        const  interesCartera= await  this.$axios.$post("/contabilidad/sumarInteresCartera")
        commit('estadoInteresCartera',interesCartera)
    }
}
export const mutations={
    estadoCapitalIngresos(state, capitalIngresos){
        state.capitalIngresos = capitalIngresos
    },
    estadoInteresIngresos(state, interesIngresos){
        state.interesIngresos = interesIngresos
    },
    estadoCapitalEgresos(state, capitalEgresos){
        state.capitalEgresos = capitalEgresos
    },
    estadoCapitalCartera(state, capitalCartera){
        state.carteraCapital = capitalCartera
    },
    estadoInteresCartera(state, interesCartera){
        state.carteraInteres = interesCartera
    },
}