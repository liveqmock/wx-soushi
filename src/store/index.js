/**
 * Created by songyingchun on 2017/7/20.
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        islogin: false,
        isShowPrice: false,
        isEmployVerify: false,
        data: {}
    },
    mutations: {
        login (state) {
            state.islogin = true;
        },
        showPrice (state) {
            state.isShowPrice = true;
        },
        employVerify (state) {
            state.isEmployVerify = true;
        }
    }
});

module.exports = store;