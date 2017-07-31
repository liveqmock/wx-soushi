<template>
    <div class="count">
        <i class="min" :class="{active: minActive}" @click="min">-</i>
        <span>
            <input type="text" placeholder="0" ref="input" v-model="copyCounter"/>
        </span>
        <i class="add" :class="{active: addActive}" @click="add">+</i>
    </div>
</template>

<script>
export default {
    props: {
        num: {
            type: Number
        },
        counter: {
            type: [Number, String]
        }
    },
    data () {
        return {
            minActive: false,
            addActive: false,
            copyCounter: this.counter
        }
    },
    watch: {
        counter (val, oldVal){
            this.copyCounter = val;
        },
        copyCounter (val, oldVal) {
            this.$emit("change", this.num, val);
        }
    },
    created () {
        console.log(this.counter);
        console.log(this.num);
    },
    methods: {
        min () {
            this.$emit("min", this.num);
            this["minActive"] = true;
            this["addActive"] = false;
        },
        add () {
            this.$emit("add", this.num);
            this["minActive"] = false;
            this["addActive"] = true;
        }
    }
}
</script>

<style lang="sass" scoped>
    .count {
        font-size: 26px;
        color: #999;
        line-height: 63px;
        .min, .add{
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 1px solid #e2e2e2;
            border-radius: 50%;
            text-align: center;
            background: #fff;
            vertical-align: middle;
            line-height: 40px;
            padding: 5px;
            &.active {
                color: #03A3E7;
                 border: 1px solid #03A3E7;
             }
        }
        span {
            display: inline-block;
            width: 80px;
            border-bottom: 1px solid #9a9a9a;
            color: #333;
            text-align: center;
            input {
                display: inline-block;
                width: 80px;
                color: #333;
                text-align: center;
                border: 0;
            }
        }
    }
</style>