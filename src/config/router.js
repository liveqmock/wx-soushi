/**
 * Created by songyingchun on 2017/7/25 0025.
 */
import index from "src/page/index/index";
import gallery from "src/page/gallery/gallery";
import boutique from "src/page/boutique/boutique";
import boutiqueDetail from "src/page/boutiqueDetail/boutiqueDetail";
import search from "src/page/search/search";
import searchDetail from "src/page/searchDetail/searchDetail";
import send from "src/page/send/send";
import mine from "src/page/mine/mine";
import galleryDetail from "src/page/galleryDetail/galleryDetail";
import gallerySend from "src/page/gallerySend/gallerySend";

// 个人中心
import addAddress from "src/page/addAddress/addAddress";

import login from "src/page/login/login";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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
        path: "/boutiqueDetail",
        component: boutiqueDetail
    },{
        path: "/search",
        component: search
    },{
        path: "/searchDetail",
        component: searchDetail
    },{
        path: "/send",
        component: send
    },{
        path: "/mine",
        component: mine
    },{
        path: "/galleryDetail",
        component: galleryDetail
    },{
        path: "/gallerySend",
        component: gallerySend
    },
    {
        path: "/addAddress",
        component: addAddress
    },{
        path: "/login",
        component: login
    }]
});

export default router;