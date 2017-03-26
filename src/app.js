import Vue from "vue";
import axios from "axios";
import ElementUi from "element-ui";
import { router } from "./router/main";
import { store } from "./store/main";

Vue.use( ElementUi );

const app = new Vue( {
    store,
    router
} );

export {
    app,
    router
};

