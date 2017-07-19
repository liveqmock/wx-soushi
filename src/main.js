/**
 * Created by songyingchun on 2017/7/19.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Vuex from "vuex";
import App from "./App.vue";
import rem from "./config/flexible";
import ResetCss from "./style/reset.css";
import CommonCss from "./style/common.scss";
import index from "./page/index/index";
import gallery from "./page/gallery/gallery";
import boutique from "./page/boutique/boutique";
import search from "./page/search/search";
import send from "./page/send/send";
import mine from "./page/mine/mine";

Vue.use(VueRouter);

const a = "a";

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
        component: {
            template: gallery
        }
    },{
        path: "/boutique",
        component: {
            template: boutique
        }
    },{
        path: "/search",
        component: {
            template: search
        }
    },{
        path: "/send",
        component: {
            template: send
        }
    },{
        path: "/mine",
        component: {
            template: mine
        }
    }]
});

const app = new Vue({
    el: "#app",
    render: x => x(App),
    router
});