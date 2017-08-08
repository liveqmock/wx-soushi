<template>
    <div>
        <div class="header">
            <v-swiperfocus></v-swiperfocus>
        </div>
        <div class="wrapper">
            <div class="container">
                <v-navlist></v-navlist>
                <v-divider></v-divider>
                <div class="boutique-title">
                    <span class="text">精品推荐</span>
                    <div class="more">
                        |
                        <router-link to="/boutique">
                            更多
                        </router-link>
                    </div>
                </div>
                <div class="content">
                    <v-piclist :bar="bar" :time="time" :page="page" @get-data="getData" v-if="flag"></v-piclist>
                </div>
            </div>
        </div>
        <v-footer :index="0"></v-footer>
    </div>
</template>

<script>
    import 'src/style/swiper.css';
    import swiper from 'swiper';
    import navlist from 'src/components/navlist/navlist';
    import footer from 'src/components/footer/footer';
    import piclist from 'src/components/piclist/piclist';
    import divider from 'src/components/divider/divider';
    import swiperfocus from 'src/components/swiperfocus/swiperfocus';
    import Vue from 'vue';
    import url from "src/config/url";
    import util from "src/common/util";

    export default {
        data() {
            return {
                flag: false,
                page: "index",
                time: 1,
                bar: "nav-footer"
            }
        },
        created () {
            console.log("index-created");
        },
        components: {
            'v-navlist': navlist,
            'v-footer': footer,
            'v-piclist': piclist,
            'v-divider': divider,
            'v-swiperfocus': swiperfocus,
        },
        mounted () {
            console.log("index-mounted");
            this.getMyProfileData();
        },
        destroyed() {
            console.log("index-destroyed");
        },
        methods: {
            handleData () {
                return {
                    kind: 0,
                    color: 0,
                    variety: '',
                    maxLength: 0,
                    minLength: 0,
                    maxWidth: 0,
                    minWidth: 0,
                    thickness: 0,
                    maxPrice: 0,
                    minPrice: 0,
                    grade: 1,
                    pageSize: 8,
                    pageCurrent: 1,
                    orderBy: 0
                }
            },
            getMyProfileData () {
                this.$http.get(url.getMyProfile, {
                    params: {}
                }).then((response) => {
                    var data = response.data;
                    if(data.status.code == 0) {
                        this.$store.commit("login");
                        this.$store.commit("showPrice");
                        if(data.data.employVerify == 2 || data.data.employVerify == 5) {
                            console.log("94");
                            this.$store.commit("employVerify");
                        }
                        if(data.data.employVerify == 1) {
                            this.$store.commit("unchecked");
                        }
                    }
                    this.$store.commit({
                        type: "data",
                        key: "getMyProfile",
                        value: response.data
                    });
                    this.getData();
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            },
            getData() {
                this.$http.get(url.index, {
                    params: this.handleData()
                }).then((response) => {
                    if(response.data.status.code == 0) {
                        this.flag = true;
                        this.$store.commit({
                            type: "dataList",
                            key: this.page,
                            value: response.data
                        });
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            }
        },
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .wrapper {
        .container {
            .boutique-title {
                padding: 20px 20px;
                .text {
                    font-size: 32px;
                }
                .more {
                    float: right;
                    font-size: 24px;
                    color: #f0f0f0;
                    a {
                        padding: 0 20px 0 10px;
                        color: #999;
                    }
                }
            }
        }
    }
</style>
