/**
 * Created by songyingchun on 2017/7/19.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import App from "./App.vue";
import store from "./store/index";

import index from "./page/index/index";
import gallery from "./page/gallery/gallery";
import boutique from "./page/boutique/boutique";
import search from "./page/search/search";
import send from "./page/send/send";
import mine from "./page/mine/mine";

import rem from "./config/flexible";
import ResetCss from "./style/reset.css";
import CommonCss from "./style/common.scss";

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes: [{
        path: "/",
        component: index
    },{
        path: "/index",
        component: index
    },
    {
        path: "/gallery",
        component: gallery
    },{
        path: "/boutique",
        component: boutique
    },{
        path: "/search",
        component: search
    },{
        path: "/send",
        component: send
    },{
        path: "/mine",
        component: mine
    }]
});
console.log(store);
const app = new Vue({
    el: "#app",
    store,
    render: x => x(App),
    router
});

