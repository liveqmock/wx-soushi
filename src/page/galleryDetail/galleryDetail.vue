<template>
    <div class="wrapper">
        <div class="container">
            <v-focus :assistantImageList="detail.assistantImageList" v-if="flag"></v-focus>
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
                                <i class="icon-rmb"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import focus from "src/components/focus/focus";
    import * as url from "src/config/url";
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
            }
        }
    },
    components: {
        "v-focus": focus
    },
    created () {

    },
    mounted () {
        this.getGalleryDetailData();
    },
    methods: {
        handleData () {
            return {
                stoneLibId: 1040
            }
        },
        getGalleryDetailData () {
            this.$http.get(url.galleryDetail, {
                params: this.handleData()
            }).then((response) => {
                console.log("getGalleryDetailData");
                this.galleryDetailData = response.data;
                this.$nextTick(()=>{
                    this.fixImageList();
                    this.flag = true;
                });
            }).catch((response) => {
                console.log('fail');
            });
        },
        fixImageList () {
            const detail = this.galleryDetailData.data.detail;
            let assistantImageList = detail.assistantImageList;
            let standardImage = detail.standardImage;
            this.$set(detail, "assistantImageList", [{assistantImageUrl: standardImage}, ...assistantImageList]);
            this.detail = detail;
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
                .icon-rmb{
                    content: '￥';
                    font-size: 14px;
                    color: #fe5104;
                }
                .icon-ym2{
                    content: '';
                    font-size: 20px;
                    color: #adadad;
                    margin-left: 20px;
                    width: 48px;
                    height: 18px;
                    @include background("dw.png");
                    position: absolute;
                    top: 15px;
                    right: -53px;
                }
            }
        }
    }
}
</style>
