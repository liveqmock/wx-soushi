<template>
    <div class="wrapper">
        <div class="container" v-show="!isShowDetailErrorMasker">
            <v-focus :assistantImageList="detail.assistantImageList" @show-masker-swiper="showMaskerSwiper" v-if="flag"></v-focus>
            <div class="place-info">
                <div class="place-title">
                    {{detail.chineseName}}
                </div>
                <div class="place-content">
                    <span class="label">
                        参考价：
                    </span>
                    <div class="place-list">
                        <div class="place-item" v-for="(item, index) in detail.priceDtoList">
                            <p>
                                <span class="text">{{map[item.kind]}}</span>
                                <i class="icon-rmb place" :class="{'icon-ym2': index % 2 == 1 || index === detail.priceDtoList.length - 1}">{{item.lowPrice}}-{{item.highPrice}}</i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="productor">
                <div class="productor-control control-list">
                    <span class="control-item" :class="{active: productorCurrentIndex == 0}" @click="productorControl(0)">供应商</span>
                    <span class="control-item" :class="{active: productorCurrentIndex == 1}" @click="productorControl(1)">品种信息</span>
                </div>
                <div class="productor-content content-list" v-if="flag">
                    <div class="content-item" v-show="productorCurrentIndex == 0">
                        <div class="pic-text-list">
                            <div class="pic-text-item" v-for="(item, index) in galleryDetailData.data.supplier">
                                <div class="pic">
                                    <img :src="item.image" alt="">
                                </div>
                                <div class="text-wrapper">
                                    <span class="title">{{item.companyName}}</span>
                                    <span class="name">联系人：{{item.contact}}</span>
                                    <span class="phone">手&nbsp;&nbsp;&nbsp;机：{{item.mobile}}</span>
                                    <span class="address">
                                        <i class="label">地&nbsp;&nbsp;&nbsp;址：</i>
                                        <i class="text">{{item.address}}</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-item" v-show="productorCurrentIndex == 1">
                        <div class="variety-list">
                            <div class="variety-item">
                                <span class="text">类别：{{detail.kindName}}</span>
                            </div>
                            <div class="variety-item">
                                <span class="text">颜色：{{detail.colorName}}</span>
                            </div>
                            <div class="variety-item">
                                <span class="text">产地：{{detail.countryName}}</span>
                            </div>
                            <div class="variety-item">
                                <span class="text">吸水率：{{detail.waterAbsorption}}</span>
                            </div>
                            <div class="variety-item">
                                <span class="text">密度：{{detail.density}}</span>
                            </div>
                            <div class="variety-item">
                                <span class="text">抗压强度：{{detail.strength}}</span>
                            </div>
                            <div class="variety-item introduce">
                                <span class="text">简介：{{detail.introduction}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-navguider @show-guider-masker="showGuiderMasker"></v-navguider>
        <v-maskerguider @hide-guider-masker="hideGuiderMasker" v-show="isShowGuiderMasker"></v-maskerguider>
        <v-maskerdetailerror v-show="isShowDetailErrorMasker"></v-maskerdetailerror>
        <v-maskerswiper :assistantImageList="detail.assistantImageList" :isShowMaskerSwiper="isShowMaskerSwiper" @hide-masker-swiper="hideMaskerSwiper" v-if="flag"></v-maskerswiper>
    </div>
</template>

<script>
    import focus from "src/components/focus/focus";
    import divider from "src/components/divider/divider";
    import navguider from "src/components/navguider/navguider";
    import maskerguider from "src/components/maskerguider/maskerguider";
    import maskerdetailerror from "src/components/maskerdetailerror/maskerdetailerror";
    import maskerswiper from "src/components/maskerswiper/maskerswiper";
    import url from "src/config/url";
    import util from "src/common/util";
export default {
    props: {

    },
    data () {
        return {
            galleryDetailData: {},
            detail: {},
            flag: false,
            map: {
                1: "A级",
                2: "B级",
                3: "C级"
            },
            productorCurrentIndex: 0,
            isShowGuiderMasker: false,
            isShowDetailErrorMasker: false,
            isShowMaskerSwiper: false
        }
    },
    components: {
        "v-focus": focus,
        "v-divider": divider,
        "v-navguider": navguider,
        "v-maskerguider": maskerguider,
        "v-maskerdetailerror": maskerdetailerror,
        "v-maskerswiper": maskerswiper,
    },
    created () {

    },
    mounted () {
        this.getGalleryDetailData();
    },
    methods: {
        handleData () {
            return {
                stoneLibId: util.parseUrl(window.location.href).id
            }
        },
        getGalleryDetailData () {
            this.$http.get(url.galleryDetail, {
                params: this.handleData()
            }).then((response) => {
                if(response.data.status.code == 0) {
                    this.galleryDetailData = response.data;
                    this.$nextTick(()=>{
                        this.fixImageList();
                        this.flag = true;
                    });
                }else {
                    this.isShowDetailErrorMasker = true;
                }
            }).catch((response) => {
                this.isShowDetailErrorMasker = true;
            });
        },
        fixImageList () {
            const detail = this.galleryDetailData.data.detail;
            let assistantImageList = detail.assistantImageList;
            let standardImage = detail.standardImage;
            this.$set(detail, "assistantImageList", [{assistantImageUrl: standardImage}, ...assistantImageList]);
            this.detail = detail;
        },
        productorControl (index) {
            this.productorCurrentIndex = index;
        },
        hideGuiderMasker () {
            this.isShowGuiderMasker = false;
        },
        showGuiderMasker () {
            this.isShowGuiderMasker = true;
        },
        showMaskerSwiper (index) {
            this.isShowMaskerSwiper = true;
        },
        hideMaskerSwiper () {
            this.isShowMaskerSwiper = false;
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
.place-info{
    padding: 20px;
    .place-title{
        font-size: 36px;
        line-height: 46px;
        padding: 10px 0;
    }
    .place-content{
        display: flex;
        .label{
            flex: 1;
            color: #666;
            font-size: 28px;
            line-height: 50px;
        }
        .place-list {
            flex: 4;
            overflow: hidden;
            .place-item {
                float: left;
                width: 50%;
                .text {
                    font-size: 28px;
                    line-height: 45px;
                }
                .place {
                    color: #fe5104;
                    margin-left: 20px;
                    position: relative;
                    font-size: 28px;
                    line-height: 28px;
                    &.icon-rmb:before{
                         content: '￥';
                         font-size: 15px;
                         color: #fe5104;
                     }
                    &.icon-ym2:after{
                        content: '';
                        font-size: 20px;
                        color: #adadad;
                        margin-left: 20px;
                        width: 48px;
                        height: 18px;
                        @include background("dw.png");
                        position: absolute;
                        top: 13px;
                        right: -53px;
                    }
                }
            }
        }
    }
}
.productor{
    padding: 0 20px 110px 20px;
    .productor-control{
        border-bottom: 2px solid #f2f2f2;
        margin-right: -20px;
        .control-item{
            font-size: 28px;
            color: #656565;
            display: inline-block;
            padding: 18px 0px 18px 0;
            margin-right: 40px;
            &.active{
                 color: #03A3E7;
                 border-bottom: 2px solid #03A3E7;
                 margin-bottom: -1px;
             }
        }
    }
    .productor-content{
        margin-top: 10px;
        .content-item{
            .pic-text-list {
                .pic-text-item{
                    overflow: hidden;
                    margin-top: 30px;
                    display: flex;
                    .pic{
                        width: 280px;
                    }
                    .text-wrapper{
                        flex: 1;
                        margin-left: 30px;
                        span{
                            display: block;
                            font-size: 22px;
                            line-height: 42px;
                        }
                        .title{
                            font-size: 28px;
                        }
                        .address{
                            display: flex;
                            .label{
                                width: 85px;
                            }
                            .text{
                                flex: 1;
                            }
                        }
                    }
                }
            }
            .variety-list{
                overflow: hidden;
                .variety-item{
                    float: left;
                    width: 50%;
                    &.introduce{
                        width: 100%;
                     }
                    .text{
                        font-size: 24px;
                        line-height: 44px;
                        color: #686868;
                        display: block;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>
