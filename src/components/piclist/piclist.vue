<template>
    <div class="pic-list" :class="{index: index, boutique: boutique}" ref="pic-list">
        <ul class="pic-wrapper">
            <li class="pic-item" v-for="(item, index) in list" :key="item.id" ref="pic-item">
                <div class="box">
                    <img class="big-pic" :src="item.imageUrlList[item.currentIndex]" alt="">
                    <div class="small-pic-item-wrapper" ref="smallPicItemWrapper">
                        <div class="small-pic-item" :class="{active: item.currentIndex === index_imageUrlList }" v-for="(item_imageUrlList, index_imageUrlList) in item.imageUrlList" v-if="index_imageUrlList <= 3" @click.stop.prevent="selectSmallPic(index_imageUrlList, index, $event)"  :key="item_imageUrlList.id">
                            <img class="small-pic" :src="item_imageUrlList" alt="">
                        </div>
                    </div>
                    <p class="text">{{item.variety}}</p>
                    <v-price></v-price>
                </div>
            </li>
            <v-loadingbar :loadingStatus="loadingStatus"></v-loadingbar>
        </ul>
    </div>
</template>

<script>
    import price from "src/components/price/price";
    import IScroll from "src/plugins/iscroll-probe";
    import loadingbar from "src/components/loadingbar/loadingbar";
export default {
    props:{
        picListData: {
            type: Object,
            default () {
                return {};
            }
        },
        index: {
            type: Boolean,
            default: false
        },
        boutique: {
            type: Boolean,
            default: false
        },
        refresh: {
            type: Boolean,
            default: false
        },
        refreshCount: {
            type: Number,
            default: 0
        },
    },
    data () {
        return {
            list: this.picListData.data.list,
            scroll: {},
            loadingStatus: {
                loading: true,
                loaded: false,
            },
            text: ""
        }
    },
    created () {
        this.initList();
    },
    mounted () {
        this.initScroll();
        if(this.refresh) {
            this.scroll.refresh();
            this.scroll.scrollTo(0, -this.$refs["pic-item"][0].clientHeight * 4 * this.refreshCount + this.scroll.wrapperHeight - 130);
        }
    },
    methods: {
        initList () {
            this.list.forEach((item, index) => {
                this.$set(item, "currentIndex", 0);
            });
        },
        initScroll () {
            let picList = this.$refs["pic-list"];
            let scroll = new IScroll(picList, {
                bounceTime: 500,
                mouseWheel: true,
                scrollbars: true,
                fadeScrollbars: true,
                probeType: 3,
                click:false
            });
            var self = this;
            scroll.on("scrollEnd", function () {
                if(this.y <= this.maxScrollY) {
                    if(self.index) {
                        self.$set(self.loadingStatus, "loading", false);
                        self.$set(self.loadingStatus, "loaded", true);
                    }
                    setTimeout(()=>{
                        if(self.index) {
                            self.scroll.refresh();
                            self.scroll.scrollTo(0, self.scroll.maxScrollY + 120, 500);
                        }else{
                            self.reloadData();
                        }
                        setTimeout(()=>{
                            self.$set(self.loadingStatus, "loading", true);
                            self.$set(self.loadingStatus, "loaded", false);
                        }, 500);
                    }, 300);
                }
            });

            scroll.on("scroll", function (pos) {
                if(this.y <= this.maxScrollY) {
                    self.$set(self.loadingStatus, "loading", true);
                }
            });

            this.scroll = scroll;
        },
        reloadData () {
            this.$emit("get-data", {});
        },
        selectSmallPic(index_imageUrlList, index, ev) {
            this.list[index].currentIndex = index_imageUrlList;
        }
    },
    components: {
        "v-price": price,
        "v-loadingbar": loadingbar
    }
}
</script>

<style lang="sass" scoped>
        .pic-list{
            background: #f8f8f8;
            position: absolute;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            &.index {
                 top: 640px;
                .pic-wrapper {
                    padding-bottom: 110px;
                }
             }
            &.boutique {
                top: 190px;
             }
        }
        .pic-wrapper{
            overflow: hidden;
            padding: 0 10px;
            .pic-item{
                padding: 20px 10px 0;
                box-sizing: border-box;
                width: 50%;
                float: left;
                .box{
                    width: 100%;
                    background: #fff;
                    position: relative;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, .1);
                    .big-pic{
                        width: 100%;
                        height: 260px;
                    }
                    .small-pic-item-wrapper {
                        padding: 10px 5px 0;
                        overflow: hidden;
                        .small-pic-item {
                            padding: 0px 5px;
                            box-sizing: border-box;
                            float: left;
                            width: 25%;
                            img {
                                width: 73px;
                                height: 55px;
                            }
                            &.active img{
                                 border: 1px solid #FF8989;
                             }
                        }
                    }
                    .text{
                        font-size: 26px;
                        padding: 20px 10px 20px;
                    }
                }
            }
        }

</style>
