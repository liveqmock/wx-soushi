<template>
    <div class="masker-swiper" v-if="isShowMaskerSwiper">
        <div class="masker-show" @click="hideMaskerSwiper"></div>
        <div class="masker-container">
            <div class="m-box">
                <div class="page">
                    <div class="slider" id="slider">
                        <ul>
                            <li v-for="(item, index) in assistantImageList">
                                <div class="pinch-zoom">
                                    <img :src="item.assistantImageUrl" alt="">
                                </div>
                            </li>
                        </ul>
                        <div class="text">
                            {{mySwipe.index + 1}}/
                            <i>{{mySwipe.length}}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swipe from "src/plugins/swipe";
import RTP from "src/plugins/pinchzoom";
import util from "src/common/util";
import $ from "jquery";
export default {
    props: {
        assistantImageList: {
            type: Array,
            default: []
        },
        isShowMaskerSwiper: {
            type: Boolean,
            default: false
        },
        flag: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            mySwipe: {}
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.initPinchZoom();
        });
        this.initSwiper();
    },
    methods: {
        initSwiper () {
            const mySwipe = new Swipe(document.getElementById('slider'), {
                speed: 400,
                callback: function (index) {}
            });
            this.mySwipe = mySwipe;
        },
        initPinchZoom () {
            $("pinch-zoom").each( function (){
                new RTP.PinchZoom($(this), {});
            });
        },
        hideMaskerSwiper () {
            this.$emit("hide-masker-swiper");
        }
    }
}
</script>

<style lang="sass" scoped>
.masker-swiper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .masker-show {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.65);
    }
    .masker-container{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
    }
    .page {
        width: 750px;
        height: 750px;
        position: relative;
    }
    .text{
        text-align: center;
        color: #fff;
        font-size: 34px;
        line-height: 54px;
        margin-top: 17px;
    }
}
</style>