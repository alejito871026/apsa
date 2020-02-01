import Vue from 'vue'
import Vuex from 'vuex'

import Autenticacion from './almacen/Autenticacion'


Vue.use(Vuex)

export default new Vuex.Store({
    modules :{
       Autenticacion:Autenticacion
    },
    state:{

    },
    mutations:{

    },
    actions:{
    }
})