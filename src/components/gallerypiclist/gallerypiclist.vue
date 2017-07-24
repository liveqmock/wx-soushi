<template>
    <div class="pic-list" ref="pic-wrapper">
        <ul class="pic-wrapper">
            <v-showsearchpic :src="src" :text="text" v-if="searchPic"></v-showsearchpic>
            <li class="pic-item" v-for="(item, index) in list" :key="item.id">
                <div class="box">
                    <img class="big-pic" :src="item.assistantImageList[item.currentIndex].assistantImageUrl" alt="">
                    <div class="small-pic-item-wrapper" ref="smallPicItemWrapper">
                        <div class="small-pic-item" :class="{active: item.currentIndex === index_imageUrlList }"
                             v-for="(item_imageUrlList, index_imageUrlList) in item.assistantImageList"
                             v-if="index_imageUrlList <= 3"
                             @click.stop.prevent="selectSmallPic(index_imageUrlList, index, $event)"
                             :key="item_imageUrlList.id">
                            <img class="small-pic" :src="item_imageUrlList.assistantImageUrl" alt="">
                        </div>
                    </div>
                    <p class="text">{{item.chineseName}}</p>
                </div>
            </li>
            <v-loadingbar :loading-status="loadingStatus"></v-loadingbar>
        </ul>
    </div>

</template>

<script>
    import IScroll from "src/plugins/iscroll-probe";
    import loadingbar from "src/components/loadingbar/loadingbar";
    import showsearchpic from "src/components/showsearchpic/showsearchpic";
    export default {
        props: {
            galleryPicListData: {
                type: Object,
                default () {
                    return {}
                }
            },
            refresh: {
                type: Boolean,
                default: false
            },
            refreshCount: {
                type: Number,
                default: 0
            },
            src: {
                type: String,
                default: ""
            },
            searchPic: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                list: this.galleryPicListData.data.list,
                loading: false,
                scroll: {},
                loadingStatus: {
                    loading: true,
                    loaded: false,
                },
                text: ""
            }
        },
        beforeCreate() {

        },
        created () {
            this.initList();
            this.fixImageList();
            this.initSearchPic();
        },
        mounted () {
            console.log("mounted");
            this.initScroll();
            if(this.refresh) {
                this.scroll.refresh();
                this.scroll.scrollTo(0, -1700 * this.refreshCount + this.scroll.wrapperHeight - 80);
            }
        },
        methods: {
            initList () {
                this.list.forEach((item, index) => {
                    this.$set(item, 'currentIndex', 0)
                })
            },
            initScroll () {
                let picList = this.$refs["pic-wrapper"];
                let scroll = new IScroll(picList, {
                    bounceTime: 500,
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: true,
                    probeType: 3,
                    click:false
                });
                window.scroll = scroll;
                var self = this;
                scroll.on("scrollEnd", function () {
                    if(this.y <= this.maxScrollY) {
                        console.log(this.y, this.maxScrollY);
                        self.$set(self.loadingStatus, "loading", false);
                        self.$set(self.loadingStatus, "loaded", true);
                        self.reloadData();
                        self.loading = false;
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
                this.list[index].currentIndex = index_imageUrlList
            },
            fixImageList () {
                const list = this.list;
                for(let i = this.refreshCount * 8, l = list.length; i < l; i++) {
                    let assistantImageList = list[i].assistantImageList;
                    let standardImage = list[i].standardImage;
                    this.$set(list[i], "assistantImageList", [{assistantImageUrl: standardImage}, ...assistantImageList]);
                }
            },
            initSearchPic () {
                let list = this.list;
                this.text = list[0].chineseName;
            },
        },
        components: {
            "v-loadingbar": loadingbar,
            "v-showsearchpic": showsearchpic
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .pic-list {
        background: #f8f8f8;
        position: absolute;
        top: 190px;
        bottom: 0px;
        width: 100%;
        .pic-wrapper {
            overflow: hidden;
            padding: 0 10px;
            .pic-item {
                padding: 20px 10px 0;
                box-sizing: border-box;
                width: 50%;
                float: left;

                .box {
                    width: 100%;
                    background: #fff;
                    position: relative;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, .1);

                    .big-pic {
                        width: 100%;
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
                            &.active img {
                                border: 1px solid #FF8989;
                            }
                        }
                    }
                    .text {
                        font-size: 26px;
                        padding: 20px 10px 20px;
                    }
                }
            }
        }
    }
</style>
