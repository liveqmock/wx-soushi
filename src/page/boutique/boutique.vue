<template>
    <div class="wrapper">
        <div class="container">
            <div class="masker masker-black" @click="hideMasker()" v-show="isShowMasker"></div>
            <div class="masker masker-error" v-if="isNoResult">
                <div class="no-result">
                    <i class="icon">
                        <img src="./icon/no-result.png" alt="">
                    </i>
                    <span class="text">搜索不到相关结果</span>
                </div>
            </div>
            <div class="masker masker-error" v-if="isNoData">
                <div class="no-data">
                    <i class="icon">
                        <img src="./icon/no-data.png" alt="">
                    </i>
                    <span class="text">暂无数据</span>
                </div>
            </div>
            <v-search @get-search-data="getSearchData" @upload-pic="getUploadPicData"></v-search>
            <div class="selectMenu">
                <div class="select-control">
                    <div class="select-control-wrapper">
                        <div class="select-item" :class="{active: selectControlStatus[0]}">
                            <div class="icon-text" @click="selectControl(0, $event)">
                                <span class="text">{{selectTextStatus[0]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[1]}">
                            <div class="icon-text" @click="selectControl(1, $event)">
                                <span class="text">{{selectTextStatus[1]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[2]}">
                            <div class="icon-text" @click="selectControl(2, $event)">
                                <span class="text">{{selectTextStatus[2]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                        <div class="select-item" :class="{active: selectControlStatus[3]}">
                            <div class="icon-text" @click="selectControl(3, $event)">
                                <span class="text">{{selectTextStatus[3]}}</span>
                                <i class="icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="select-detail" v-show="isShowMasker">
                    <div class="select-detail-wrapper">
                        <div class="list kind-list" v-if="selectControlStatus[0]">
                            <span class="item" :class="{active: selectItemStatus[0] == 0}" @click="selectItem(0, 0, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 1}" @click="selectItem(1, 0, $event)">雅典黑冰花</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 2}" @click="selectItem(2, 0, $event)">磨卡咖</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 3}" @click="selectItem(3, 0, $event)">金线米黄</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 4}" @click="selectItem(4, 0, $event)">欧亚木纹</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 5}" @click="selectItem(5, 0, $event)">柏拉图灰</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 6}" @click="selectItem(6, 0, $event)">爵士白</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 7}" @click="selectItem(7, 0, $event)">金碧辉煌</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 8}" @click="selectItem(8, 0, $event)">银线米黄</span>
                            <span class="item" :class="{active: selectItemStatus[0] == 9}" @click="selectItem(9, 0, $event)">金线米黄</span>
                        </div>
                        <div class="list color-list" v-if="selectControlStatus[1]">
                            <span class="item" :class="{active: selectItemStatus[1] == 0}" @click="selectItem(0, 1, $event)">全部</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 1}" @click="selectItem(1, 1, $event)">红色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 2}" @click="selectItem(2, 1, $event)">白色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 7}" @click="selectItem(7, 1, $event)">黄色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 8}" @click="selectItem(8, 1, $event)">黑色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 5}" @click="selectItem(5, 1, $event)">灰色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 4}" @click="selectItem(4, 1, $event)">绿色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 6}" @click="selectItem(6, 1, $event)">棕色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 3}" @click="selectItem(3, 1, $event)">蓝色</span>
                            <span class="item" :class="{active: selectItemStatus[1] == 9}" @click="selectItem(9, 1, $event)">其他</span>
                        </div>
                        <div class="list format-list" v-if="selectControlStatus[2]">
                            <span class="all">全部</span>
                            <div class="self">
                                <span class="s-text">自定义：</span>
                                <input class="input" type="text" placeholder="长">
                                <i class="add-rotate">+</i>
                                <input class="input" type="text" placeholder="宽">
                                <i class="add-rotate">+</i>
                                <input class="input" type="text" placeholder="厚">mm
                                <span class="finish">完成</span>
                            </div>
                        </div>
                        <div class="list price-list" v-if="selectControlStatus[3]">
                            <span class="all">全部</span>
                            <div class="self">
                                <span class="s-text">自定义：</span>
                                <input class="input" type="text" placeholder="200">
                                <i class="min">一</i>
                                <input class="input input-max-price" type="text" placeholder="400">
                                <i class="icon-ypfm"></i>
                                <span class="finish">完成</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--<v-piclist :pic-list-data="picListData" :src="src" @get-data="getData" :refreshCount="refreshCount" :refresh="refresh" v-if="flag" :search-pic="searchPic"></v-piclist>-->
            <v-piclist :pic-list-data="picListData" v-if="flag" :boutique="true"></v-piclist>
        </div>
    </div>
</template>

<script>
import search from "src/components/search/search";
import piclist from "src/components/piclist/piclist";
import loadingbar from "src/components/loadingbar/loadingbar";
import * as url from "src/config/url";

export default {
    components: {
        "v-search": search,
        "v-piclist": piclist,
        "v-loadingbar": loadingbar,
    },
    data () {
        return {
            selectControlStatus: [false, false, false, false],
            selectItemStatus: [0, 0, 0, 0],
            selectTextStatus: ["品种", "颜色", "规格", "价格"],
            isShowMasker: false,
            flag: false,
            refresh: false,
            refreshCount: 0,
            isNoData: false,
            isNoResult: false,
            loadingStatus: {
                loading: true,
                loaded: false,
            },
            src: "",
            searchPic: false
        }
    },
    created () {
        console.log("created");
        this.getBoutiqueData();
    },
    mounted () {
        console.log("mounted");
    },
    methods:{
        selectControl (index, ev) {
            let selectControlStatus = this.selectControlStatus;
            for(let i = 0, l = selectControlStatus.length; i < l; i++) {
                if(index === i) {
                    this.$set(selectControlStatus, i, !selectControlStatus[i]);
                }else {
                    this.$set(selectControlStatus, i, false);
                }
            }
            // 弹窗
            for(let i = 0, l = selectControlStatus.length; i < l; i++) {
                if(selectControlStatus[i]) {
                    this.isShowMasker = true;
                    break;
                }else {
                    this.isShowMasker = false;
                }
            }
        },
        selectItem (index, parentIndex, ev) {
            this.$set(this.selectItemStatus, parentIndex, index);
            this.selectControl(parentIndex, ev);
            this.selectText(parentIndex, ev);
            this.getBoutiqueData ({
                kind: this.selectItemStatus[0],
                color: this.selectItemStatus[1],
                country: this.selectItemStatus[2]
            });
        },
        selectText (parentIndex, ev) {
            var arr = ["品种", "颜色", "规格", "价格"];
            var text = ev.target.innerText;
            if(text == "全部") {
                text = arr[parentIndex];
            }
            this.selectTextStatus[parentIndex] = text;
        },
        showMasker () {
            this.isShowMasker = true;
        },
        hideMasker() {
            this.isShowMasker = false;
            for(let i = 0, l = this.selectControlStatus.length; i < l; i++) {
                this.selectControlStatus[i] = false;
            }
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
        getBoutiqueData(data) {
            let self = this;
            this.flag = false;
            this.$http.get(url.boutique, {
                params: data || this.handleData()
            }).then((response) => {
                console.log("getGalleryData");
                if(response.data.data.list.length == 0) {
                    this.isNoData = true;
                }else {
                    self.$nextTick(()=> {
                        this.picListData = response.data;
                        this.flag = true;
                    });
                }
            }).catch((response) => {
                console.log('fail');
                this.isNoResult = true;
            });
        },
        getSearchData (data) {
            this.hideMasker();
            this.getGalleryData(Object.assign({}, data, {
                kind: this.selectItemStatus[0],
                color: this.selectItemStatus[1],
                country: this.selectItemStatus[2]
            }));
        },
        getData () {
            this.$http.get(url.gallery, {
                params: this.handleData()
            }).then((response) => {
                if(response.data.data.list.length == 0) {
                    this.isNoData = true;
                }else {
                    this.flag = false;
                    let list = this.picListData.data.list;
                    list = list.concat(response.data.data.list);
                    this.$nextTick(()=>{
                        this.$set(this.picListData.data, "list", list);
                        this.flag = true;
                        this.refresh = true;
                        this.refreshCount++;
                    });
                }
            }).catch((response) => {
                console.log('fail');
                this.isNoResult = true;
            });
        },
        getUploadPicData (data, src) {
            this.hideMasker();
            this.src = src;
            this.searchPic = true;
            this.getBoutiqueData(data);
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";
    .selectMenu {
        background-color: #fff;
        position: relative;
        z-index: 2;
        .select-control-wrapper {
            position: relative;
            z-index: 99;
            background: #fff;
            display: flex;
            padding:0 27px;
            margin-right: -124px;
            .select-item {
                flex: 1;
                padding-top: 21px;
                padding-bottom: 21px;
                background-color: #fff;
                position: relative;
                font-size: 28px;
                color: #666;
                width: 200px;
                box-sizing: border-box;
                &.active {
                    .text {
                        color: #03A3E7;
                    }
                    .icon {
                        @include background("icon_pull_1.png");
                    }
                }
                .icon-text{
                    padding: 10px 0 10px 10px;
                    margin-left: -10px;
                }
                .icon{
                    @include background("icon_pull.png");
                    width: 18px;
                    height: 12px;
                    display: inline-block;
                }
            }
        }
        .select-detail {
            font-size: 26px;
            padding: 15px 0 75px 27px;
            position: relative;
            z-index: 99;
            background: #fff;
            border-top: 1px solid #ebebeb;
            .select-detail-wrapper {
                position: relative;
                z-index: 3;
                background: #fff;
                .list {
                    &.color-list, &.kind-list {
                         margin-right: -154px;
                        overflow: hidden;
                     }
                    &.color-list .item{
                         width: 154px;
                     }
                    &.kind-list .item {
                          width: 192px;
                      }
                    .item {
                        display: inline-block;
                        font-size: 28px;
                        line-height: 64px;
                        height: 64px;
                        float: left;
                        &.active {
                             color: #03a3e7;
                         }
                    }
                    .all{
                        display: inline-block;
                        width: 154px;
                        font-size: 28px;
                        line-height: 64px;
                        height: 64px;
                    }
                    .self{
                        line-height: 63px;
                        .input {
                            width: 120px;
                            border: 0;
                            border-bottom: 1px solid #cdcdcd;
                            text-align: center;
                            padding: 10px 0;
                            border-radius: 0;
                            font-size:100%;
                        }
                        .add-rotate {
                            display: inline-block;
                            transform: rotate(-45deg);
                            -webkit-transform: rotate(45deg);
                            font-size: 24px;
                        }
                        .finish{
                            font-size: 28px;
                            color: #03A3E7;
                            padding: 14px 20px;
                            line-height: 28px;
                            float: right;
                            margin-right: 10px;
                            margin-top: 5px;
                        }
                    }
                    &.price-list .icon-ypfm{
                         @include background("icon_ypf.png");
                         width: 76px;
                         height: 33px;
                         position: relative;
                         display: inline-block;
                         top: 7px;
                     }
                }
            }
        }
    }
    .pic-list {
        background: #f8f8f8;
        position: absolute;
        top: 190px;
        bottom: 0;
        width: 100%;
    }
    .masker{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        }
        .masker-black {
            background: rgba(0, 0, 0, 0.65);
        }
        .masker-error {
            background: #fff;
            .no-data, .no-result {
                padding-top: 230px;
                text-align: center;
            .text {
                display: block;
                padding: 15px 0;
                font-size: 30px;
                text-align: center;
                color: #666;
            }
        }
    }
</style>
