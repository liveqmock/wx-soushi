<template>
    <div class="nav-footer">
        <div class="nav-footer-list">
            <div class="nav-item">
                <router-link to="/index">
                    <i class="icon index"></i>
                    <span class="text">首页</span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/boutique">
                    <i class="icon boutique"></i>
                    <span class="text">精品</span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/photo">
                    <i class="icon photo"></i>
                    <span class="text">拍照找石</span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/search">
                    <i class="icon search"></i>
                    <span class="text">现货</span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/mine">
                    <i class="icon mine"></i>
                    <span class="text">我的</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">
    .nav-footer {
        .nav-footer-list {
            display: flex;
            .nav-item{
                flex: 1;
                &.photo {
                    flex: 1.5;
                 }
            }
        }
    }
</style>
