/**
 * Created by songyingchun on 2017/7/20.
 */
import Vue from "vue";
import Vuex from "vuex";
import router from "src/config/router";
import url from "src/config/url";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        islogin: false,
        isShowPrice: false,
        isEmployVerify: false,
        data: {},
        router: router,
        url: url
    },
    getters: {

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
        },
        data (state, obj) {
            state.data[obj.key] = obj.value;
        },
        dataList (state, obj) {
            if(!state.data[obj.key]) {
                state.data[obj.key] = [];
            }
            state.data[obj.key].push(obj.value);
        },
        cleanDataList (state, obj) {
            console.log("cleanDataList");
            state.data[obj.key] = [];
        }
    },
    actions: {
        login (context) {
            context.commit("login");
        },
        showPrice (context) {
            context.commit("showPrice");
        },
        employVerify (context) {
            context.commit("employVerify");
        }
    }
});

module.exports = store;