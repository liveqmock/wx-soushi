/**
 * Created by songyingchun on 2017/7/19.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "src/store/index";
import VueResource from "vue-resource";

import rem from "./config/flexible";
import ResetCss from "./style/reset.css";
import CommonCss from "./style/common.scss";

Vue.use(VueResource);

export const app = new Vue({
    el: "#app",
    store,
    render: x => x(App),
    router: store.state.router
});