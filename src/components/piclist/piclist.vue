<template>
    <div class="pic-list">
        <div class="pic-item-wrapper">
            <div class="pic-item">
                <div class="box">
                    <img class="big-pic" src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                    <div class="small-pic-item-wrapper">
                        <div class="small-pic-item">
                            <img class="small-pic" src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                        <div class="small-pic-item">
                            <img class="small-pic" src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                        <div class="small-pic-item">
                            <img class="small-pic" src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                        <div class="small-pic-item">
                            <img class="small-pic" src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                    </div>
                    <p class="text">云多拉灰-A级</p>
                    <v-price></v-price>
                </div>
            </div>
            <div class="pic-item">
                <div class="box">
                    <img src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                    <div class="small-pic-item-wrapper">
                        <div class="small-pic-item">
                            <img src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                        <div class="small-pic-item">
                            <img src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                        <div class="small-pic-item">
                            <img src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                        <div class="small-pic-item">
                            <img src="http://slab.image.soushi88.com/block/5876/20170720/8/15005443320095247/1f1d9116acbc4a3cd01446a35dbcc49d.jpg?x-oss-process=style/high" alt="">
                        </div>
                    </div>
                    <p class="text">云多拉灰-A级</p>
                    <v-price></v-price>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import price from "src/components/price/price";
export default {
    data () {
        return {
            islogin: this.$store.state.data.islogin,
            isShowPrice: this.$store.state.data.isShowPrice,
            isEmployVerify: this.$store.state.data.isEmployVerify
        }
    },
    props:  {
        picListData: {
            type: Object,
            default: {}
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {

    },
    components: {
        "v-price": price
    }
}
</script>

<style lang="sass">
    .pic-list {
        background: #f8f8f8;
        .pic-item-wrapper{
            padding: 20px 10px 0;
            display: flex;
            .pic-item{
                flex: 1;
                padding: 0 10px;
                box-sizing: border-box;
                .box{
                    width: 100%;
                    background: #fff;
                    position: relative;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, .1);
                    img{
                        width: 100%;
                    }
                    .small-pic-item-wrapper {
                        padding: 10px 5px 0;
                        display: flex;
                        .small-pic-item {
                            padding: 0px 5px;
                            box-sizing: border-box;
                            flex: 1;
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
    }

</style>
