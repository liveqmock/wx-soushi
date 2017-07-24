<template>
    <div>
        <div class="header">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="./icon/banner_01.jpg" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="./icon/banner_02.jpg" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img src="./icon/banner_03.jpg" alt="">
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="wraper">
            <div class="container">
                <v-navlist></v-navlist>
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
                    <v-piclist :pic-list-data="picListData" v-if="flag" :index="true"></v-piclist>
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
    import Vue from 'vue';
    import * as url from "src/config/url";
    import { mapMutations } from "vuex";

    export default {
        data() {
            return {
                picListData: {},
                flag: false
            }
        },
        created () {

        },
        components: {
            'v-navlist': navlist,
            'v-footer': footer,
            'v-piclist': piclist
        },
        mounted () {
            this.$nextTick(()=> {
                console.log(1);
                this.initSwiper();
                this.getMyProfileData();
            });
        },
        methods: {
            initSwiper () {
                const swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true,
                    autoplay: 2000,
                    speed: 1000
                })
            },
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
                this.$http.get(url.getMyProfile_fail, {
                    params: {}
                }).then((response) => {
                    var data = response.data;
                    if(data.status.code == 10) {
                        this.$store.commit("login");
                        this.$store.commit("showPrice");
                        if(data.employVerify == 2 || data.employVerify == 5) {
                            this.$store.commit("employVerify");
                        }
                    }
                    this.getQueryData();
                }).catch((response) => {
                    console.log('fail');
                });
            },
            getQueryData() {
                this.$http.get(url.query, {
                    params: this.handleData()
                }).then((response) => {
                    console.log("data");
                    this.picListData = response.data;
                    this.flag = true;
                }).catch((response) => {
                    console.log('fail');
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .header {
        .swiper-container {
            width: 100%;
            height: 100%;
            .swiper-slide {
                font-size: 18px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                height: 328px;
                img {
                    width: 100%;
                }
            }
            .swiper-pagination-bullet {
                width: 10px;
                height: 10px;
                background: #fff;
            }
            .swiper-pagination-bullet-active {
                background: #fff;
                width: 20px;
                border-radius: 5px;
            }
        }
    }

    .wraper {
        .container {
            .boutique-title {
                padding: 30px 20px;
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
