<template>
    <div id="Seesaw" ref="Seesaw">
        <div v-for="i in 10000" :key="i"></div>
    </div>
</template>
<script>
    export default {
        name: "Seesaw",
        mounted () {
            this.$refs.Seesaw.addEventListener("mouseover", (event) => {
                let Event =  event.target;
                Event.setAttribute("class", "");
            });
            this.$refs.Seesaw.addEventListener("mouseout", (event) => {
                let Event =  event.target;
                Event.setAttribute("class", "over");
            });
        }
    }
</script>

<style scoped lang="scss">
    @import '../common/styles/Mixin';
    #Seesaw{
        @keyframes over {
            0%{
                background: #FFF;
            }
            10%{
                background: #DDD;
            }
            100%{
                background: #FFF;
            }
        }
        /*background: url("../common/image/bg.gif") repeat;*/
        position: fixed;top: 0;right: -30px;bottom: 0;left: 0;
        z-index: 0;opacity: 1;overflow: hidden;
        div{
            height:20px;width:20px;float: left;box-sizing: border-box;background: #FFF;
            border-top: #EEE 1px dotted;border-left: #EEE 1px dotted;
            &.over{
                animation: over 1.3s ease-in-out;
            }
        }
    }
</style>