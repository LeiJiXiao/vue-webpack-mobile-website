import Vue from "vue";
import Vuex from "vuex";

Vue.use( Vuex );

export const store = new Vuex.Store( {
    state: {
        IMG_HOST: "http://localhost:8080/"
    },
    mutations: {

    }
} );