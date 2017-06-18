import Vue from "vue";
import VueRouter from "vue-router";

/**
 * 导入页面
 */
import Index from "@/views/pages/Index";

Vue.use( VueRouter );

const router = new VueRouter( {
    mode: "history",
    routes:[
        {
            name: "index",
            path: "/",
            component: Index
        },
        {
            name: 'login',
            path: '/login',
            component: () => import ( '@/views/pages/Login' )
            //r => require.ensure( [], () => r( require( '@/views/pages/Login' ) ), 'chunkname1' )
        },
        {
            name: 'timer',
            path: '/timer',
            component: () => import ( '@/views/pages/Timer' )
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
