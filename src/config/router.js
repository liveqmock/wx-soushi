/**
 * Created by songyingchun on 2017/7/25 0025.
 */
// import index from "src/page/index/index";
import gallery from "src/page/gallery/gallery";
import boutique from "src/page/boutique/boutique";
import boutiqueDetail from "src/page/boutiqueDetail/boutiqueDetail";
import search from "src/page/search/search";
import searchDetail from "src/page/searchDetail/searchDetail";
import send from "src/page/send/send";
import personal from "src/page/personal/personal";
import galleryDetail from "src/page/galleryDetail/galleryDetail";
import gallerySend from "src/page/gallerySend/gallerySend";
import photo from "src/page/photo/photo";
import authorized from "src/page/authorized/authorized";

// 个人中心
import addAddress from "src/page/addAddress/addAddress";
import manageAddress from "src/page/manageAddress/manageAddress";
import editorAddress from "src/page/editorAddress/editorAddress";
import modifyPassword from "src/page/modifyPassword/modifyPassword";

//登录注册
import login from "src/page/login/login";
import register from "src/page/register/register";
import forgetPassword from "src/page/forgetPassword/forgetPassword";
import findPassword from "src/page/findPassword/findPassword";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: "/",
        component: resolve => require(["src/page/index/index"], resolve),
        meta: {
            title: "搜石商城"
        }
    },{
        path: "/index",
        component: resolve => require(["src/page/index/index"], resolve),
        meta: {
            title: "搜石商城"
        }
    },{
        path: "/gallery",
        component: resolve => require(["src/page/gallery/gallery"], resolve),
        meta: {
            title: "石材图库"
        }
    },{
        path: "/boutique",
        component: resolve => require(["src/page/boutique/boutique"], resolve),
        meta: {
            title: "精品商城"
        }
    },{
        path: "/boutiqueDetail",
        component: resolve => require(["src/page/boutiqueDetail/boutiqueDetail"], resolve),
        meta: {
            title: "精品商城详情页"
        }
    },{
        path: "/search",
        component: resolve => require(["src/page/search/search"], resolve),
        meta: {
            title: "搜现货"
        }
    },{
        path: "/searchDetail",
        component: resolve => require(["src/page/searchDetail/searchDetail"], resolve),
        meta: {
            title: "搜现货详情页"
        }
    },{
        path: "/send",
        component: resolve => require(["src/page/send/send"], resolve),
        meta: {
            title: "样板寄送"
        }
    },{
        path: "/personal",
        component: resolve => require(["src/page/personal/personal"], resolve),
        meta: {
            title: "个人中心"
        }
    },{
        path: "/galleryDetail",
        component: resolve => require(["src/page/galleryDetail/galleryDetail"], resolve),
        meta: {
            title: "石材图库详情页"
        }
    },{
        path: "/gallerySend",
        component: resolve => require(["src/page/gallerySend/gallerySend"], resolve),
        meta: {
            title: "石材图库样板寄送"
        }
    },{
        path: "/photo",
        component: resolve => require(["src/page/photo/photo"], resolve),
        meta:{
            title:" 拍照找石"
        }
    },{
        path: "/addAddress",
        component: resolve => require(["src/page/addAddress/addAddress"], resolve),
        meta: {
            title: "新增收货地址"
        }
    },{
        path: "/login",
        component: resolve => require(["src/page/login/login"], resolve),
        meta: {
            title: "登录-搜石网"
        }
    },{
        path: "/authorized",
        component: resolve => require(["src/page/authorized/authorized"], resolve),
        meta: {
            title: "个人认证"
        }
    },{
        path: "/manageAddress",
        component: resolve => require(["src/page/manageAddress/manageAddress"], resolve),
        meta: {
            title: "管理收货地址"
        }
    },{
        path: "/editorAddress",
        component: resolve => require(["src/page/editorAddress/editorAddress"], resolve),
        meta: {
            title: "编辑收货地址"
        }
    },{
        path: "/modifyPassword",
        component: resolve => require(["src/page/modifyPassword/modifyPassword"], resolve),
        meta: {
            title: "修改密码"
        }
    },{
        path: "/register",
        component: resolve => require(["src/page/register/register"], resolve),
        meta: {
            title: "注册帐号"
        }
    },{
        path: "/forgetPassword",
        component: resolve => require(["src/page/forgetPassword/forgetPassword"], resolve),
        meta: {
            title: "手机证验"
        }
    },{
        path: "/findPassword",
        component: resolve => require(["src/page/findPassword/findPassword"], resolve),
        meta: {
            title: "找回密码"
        }
    }]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;