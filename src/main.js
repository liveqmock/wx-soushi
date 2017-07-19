/**
 * Created by songyingchun on 2017/7/19.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import App from './App.vue';

Vue.use(VueRouter);

const a = 'a';

const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: {
                template: '<div>foo</div>'
            }
        },
        {
            path: '/bar',
            component: {
                template: '<div>bar</div>'
            }
        }
    ]
});

const app = new Vue({
    el: "#app",
    render: x => x(App),
    router
});