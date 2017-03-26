import Vue from "vue";
import VueRouter from "vue-router";

/**
 * 导入页面
 */
import Index from "../views/Index.vue";

Vue.use( VueRouter );

const router = new VueRouter( {
    mode: "history",
    routes:[
        {
            name: "index",
            path: "/",
            component: Index
        }
    ]
} );

export {
    router
};
