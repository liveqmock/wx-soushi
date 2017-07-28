<template>
    <div class="wrapper">
        <div class="container">
            <v-boutiquefocus :imageUrlList="boutiqueDetailData.data.detail.imageUrlList" @show-masker-swiper="showMaskerSwiper" v-if="flag"></v-boutiquefocus>
        </div>
    </div>
</template>

<script>
    import boutiquefocus from "src/components/boutiquefocus/boutiquefocus";
    import divider from "src/components/divider/divider";
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
            boutiqueDetailData: {},
            flag: false,
            isShowGuiderMasker: false,
            isShowDetailErrorMasker: false,
            isShowMaskerSwiper: false,
            index: 0
        }
    },
    components: {
        "v-boutiquefocus": boutiquefocus,
        "v-divider": divider,
        "v-maskerguider": maskerguider,
        "v-maskerdetailerror": maskerdetailerror,
        "v-maskerswiper": maskerswiper,
    },
    created () {

    },
    mounted () {
        this.getBoutiqueDetailData();
    },
    methods: {
        handleData () {
            return {
                stoneLibId: util.parseUrl(window.location.href).id
            }
        },
        getBoutiqueDetailData () {
            this.$http.get(url.boutiqueDetail, {
                params: this.handleData()
            }).then((response) => {
                if(response.data.status.code == 0) {
                    this.boutiqueDetailData = response.data;
                    this.$nextTick(()=>{
                        this.flag = true;
                    });
                }else {
                    this.isShowDetailErrorMasker = true;
                }
            }).catch((response) => {
                this.isShowDetailErrorMasker = true;
            });
        },
        hideGuiderMasker () {
            this.isShowGuiderMasker = false;
        },
        showGuiderMasker () {
            this.isShowGuiderMasker = true;
        },
        showMaskerSwiper (index) {
            this.index = index;
            this.isShowMaskerSwiper = true;
        },
        hideMaskerSwiper () {
            this.isShowMaskerSwiper = false;
        }
    }
}
</script>

<style lang="sass" scoped>

</style>