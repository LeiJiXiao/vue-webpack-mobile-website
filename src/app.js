import Vue from "vue";
import axios from "axios";
import ElementUi from "element-ui";
import { router, PAGE_TITLE } from "@/router/main";
import { store } from "@/store/main";
import App from '@/views/App';

Vue.use( ElementUi );

/**
 * 全局before钩子，配置页面title
 */
let currentUrl;
router.beforeEach( ( to, from, next ) => {
    //to 将要进入的目router对象；
    //from 将要离开的目router对象；
    currentUrl = to.fullPath;
    window.document.title = PAGE_TITLE[ to.name ];
    next();
} );

const app = new Vue( {
    store,
    router,
    ...App
} );

export {
    app,
    router
};

