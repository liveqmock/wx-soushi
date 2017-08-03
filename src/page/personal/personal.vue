<template>
    <div class="wrapper">
        <div class="container">
            <div class="personal-panel">
                <div class="pic">
                    <img :src="genderMap[data.gender]" alt="">
                </div>
                <p class="text">{{data.name}}</p>
            </div>
            <div class="person-options">
                <div class="company icon-nextpage">
                    <span class="label">企业认证</span>
                    <span class="name">{{data.companyName}}</span>
                    <i class="authorized" v-if="data.employVerify == 2">认证</i>
                    <i class="unauthorized" v-if="data.employVerify != 2">未认证</i>
                </div>
                <v-divider></v-divider>
                <div class="price icon-showprice" :class="{active: isShowPrice}" @click="showPrice">
                    {{isShowPrice ? '显示' : '隐藏'}}产品价格
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import divider from "src/components/divider/divider";
    import util from "src/common/util";
    import url from "src/config/url";
    export default {
        props: {

        },
        components: {
            "v-divider": divider,
        },
        data () {
            return {
                data: {},
                page: "personal",
                genderMap: {
                    0: 'src/page/personal/icon/none.png',
                    1: 'src/page/personal/icon/man.png',
                    2: 'src/page/personal/icon/lady.png'
                },
                isShowPrice: false
            };
        },
        created () {
            console.log("created");
            this.pageShow();
            this.getData();
        },
        mounted () {
            console.log("mounted");
        },
        methods: {
            pageShow () {
                window.onpageshow = function(event) {
                    if (event.persisted) {
                        window.location.reload()
                    }
                };
            },
            handleData () {
                return {}
            },
            getData() {
                this.$http.get(url.getMyProfile, {
                    params: this.handleData()
                }).then((response) => {
                    console.log("getData");
                    if(response.data.status.code == 0) {
                        this.data = response.data.data;
                        this.$store.commit({
                            type: "data",
                            key: this.page,
                            value: response.data
                        });
                    }else {
                        util.toast(response.data.status.message, this);
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            },
            showPrice() {
                this.$http.get(url.setShowPrice, {
                    params: {
                        showPrice: this.isShowMasker ? 1 : 0
                    }
                }).then((response) => {
                    if(response.data.status.code == 0) {
                        this.isShowPrice = !this.isShowPrice;
                    }else {
                        util.toast(response.data.status.message, this);
                    }
                }).catch((response) => {
                    util.toast(response.message, this);
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .wrapper{
        .personal-panel{
            width: 100%;
            height: 435px;
            @include background('Bitmap.jpg');
            .pic{
                padding-top: 75px;
                text-align: center;
                width: 160px;
                margin: 0 auto;
                img{
                    width: 160px;
                    height: 160px;
                }
            }
            .text{
                text-align: center;
                color: #fff;
                font-size: 36px;
                line-height: 36px;
                padding-top: 30px;
            }
        }
        .person-options{
            .icon-nextpage:after{
                content: '';
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
                position: absolute;
                top: 50%;
                right: 25px;
                display: block;
                margin-top: -14px;
                width: 14px;
                height: 27px;
                @include background("icon_nextpage.png");
            }
            .company  {
                padding:36px 0 36px 25px;
                position: relative;
                font-size: 28px;
                line-height: 28px;
                i{
                    font-size: 20px;
                    padding: 7px 14px;
                    border-radius: 5px;
                    margin: -7px 5px 0;
                    vertical-align: top;
                    color: #fff;
                }
                .authorized{
                    background: #feb13b;
                }
                .unauthorized{
                    background: #d2d2d2;
                }
            }
            .price{
                padding-top: 31px;
                padding-bottom: 31px;
                background-color: #fff;
                position: relative;
                display: block;
                font-size: 28px;
                line-height: 28px;
                margin-left: 25px;
                border-bottom: 1px solid #ddd;
                &.icon-showprice:after{
                     content: '';
                     position: absolute;
                     top: 50%;
                     right: 20px;
                     margin-top: -16px;
                     width: 32px;
                     height: 32px;
                     @include background("icon_default.png");
                 }
                &.active.icon-showprice:after{
                    @include background("icon_selected_1.png");
                 }
            }
        }
    }
</style>
