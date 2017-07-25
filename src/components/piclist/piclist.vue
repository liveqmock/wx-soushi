<template>
    <div class="pic-list" :class="{index: index, boutique: boutique, search: search}" ref="pic-list">
        <ul class="pic-wrapper">
            <v-showsearchpic :src="src" :text="text" v-if="searchPic"></v-showsearchpic>
            <li class="pic-item" v-for="(item, index) in list" :key="item.id" ref="pic-item">
                <div class="box">
                    <img class="big-pic" :src="item.imageUrlList[item.currentIndex]" alt="">
                    <div class="small-pic-item-wrapper" ref="smallPicItemWrapper">
                        <div class="small-pic-item" :class="{active: item.currentIndex === index_imageUrlList }" v-for="(item_imageUrlList, index_imageUrlList) in item.imageUrlList" v-if="index_imageUrlList <= 3" @click.stop.prevent="selectSmallPic(index_imageUrlList, index, $event)"  :key="item_imageUrlList.id">
                            <img class="small-pic" :src="item_imageUrlList" alt="">
                        </div>
                    </div>
                    <p class="text">{{item.variety}}-{{item.gradeName}}</p>
                    <v-price></v-price>
                </div>
            </li>
            <v-loadingbar :loadingStatus="loadingStatus" ref="loading-bar"></v-loadingbar>
        </ul>
    </div>
</template>

<script>
    import price from "src/components/price/price";
    import showsearchpic from "src/components/showsearchpic/showsearchpic";
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
        search: {
            type: Boolean,
            default: false
        },
        refresh: {
            type: Boolean,
            default: false
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
            list: this.picListData.data.list,
            scroll: {},
            loadingStatus: {
                loading: true,
                loaded: false,
            },
            text: "",
            isShowBar: false
        }
    },
    created () {
        this.initList();
    },
    mounted () {
        this.initScroll();
        if(this.refresh) {
            let showSearchPicClientHeight = 0;
            if(this.searchPic) {
                showSearchPicClientHeight = document.querySelector(".show-search-pic").clientHeight;
            }
            this.scroll.refresh();
            this.scroll.scrollTo(0, -this.$refs["pic-item"][0].clientHeight * (Math.ceil(this.$refs["pic-item"].length / 2) - 4) + this.scroll.wrapperHeight  - this.$refs["loading-bar"].$el.clientHeight - showSearchPicClientHeight);
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
                            self.scroll.scrollTo(0, -self.$refs["pic-item"][0].clientHeight * (Math.ceil(self.$refs["pic-item"].length / 2)) + self.scroll.wrapperHeight - document.querySelector(".nav-footer").clientHeight - 20, 500);
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
        "v-loadingbar": loadingbar,
        "v-showsearchpic": showsearchpic,
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
            &.boutique,&.search {
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
