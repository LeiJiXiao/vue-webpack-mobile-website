import Vue from "vue";
import VueRouter from "vue-router";

/**
 * 导入页面
 */
import Index from "@/views/pages/Index";
import Login from "@/views/pages/Login";
import Timer from "@/views/pages/Timer";

Vue.use( VueRouter );

const router = new VueRouter( {
    mode: "history",
    routes:[
        {
            name: "index",
            path: "/index",
            component: Index
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'timer',
            path: '/timer',
            component: Timer
        }
    ]
} );

const PAGE_TITLE = {
    index: '3D-动画',
    login: '登录',
    timer: 'c3-时间'
};

export {
    router,
    PAGE_TITLE
};
