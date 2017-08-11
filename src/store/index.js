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
        isUnchecked: false,
        data: {}
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
        unchecked (state) {
            state.isUnchecked = true;
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
        },
        unchecked (context) {
            context.commit("unchecked");
        }
    }
});

module.exports = store;