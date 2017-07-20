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
            </div>
        </div>
        <v-footer :index="index"></v-footer>
    </div>
</template>

<script>
import "src/style/swiper.css";
import swiper from "swiper";
import navlist from "src/components/navlist/navlist";
import footer from "src/components/footer/footer";

export default {
    data() {
        return {
            index: 0
        }
    },
    created () {

    },
    components: {
        "v-navlist": navlist,
        "v-footer": footer
    },
    mounted () {
        this.initSwiper();
    },
    methods: {
        initSwiper () {
            const swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                autoplay: 2000,
                speed: 1000
            });
        }
    }
}
</script>

<style lang="sass">
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
                img{
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

        }
    }

</style>
