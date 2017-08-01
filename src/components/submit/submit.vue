<template>
    <div class="button" @click="submit">{{text}}</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ""
        }
    },
    methods: {
        submit() {
            this.$emit("submit");
        }
    }
}
</script>

<style lang="sass" scoped>
.button {
    font-size: 30px;
    border-radius: 10px;
    display: block;
    line-height: 30px;
    padding: 28px 0;
    background: #03A3E7;
    color: #fff;
    text-align: center;
    margin: 20px;
}
</style>
