<template>
    <div class="Done-tips" v-show="State.Done" ref="tips">
        <el-alert
            title="调研已完成"
            type="success"
            :description="State.Name + ' - ' + State.Location + ' - ' + State.Href"
            show-icon>
        </el-alert>
    </div>
</template>

<script>
export default {
    name: "Done",
    props: {
        State: Object
    },
    mounted () {
        let resetBut = document.createElement("a");
        resetBut.setAttribute("href", "#");
        resetBut.setAttribute("class", "resetBut");
        resetBut.appendChild(document.createTextNode("重置数据"));
        resetBut.style.marginLeft = "20px";
        let thisV = this;
        resetBut.onclick = function () {
            thisV.$confirm('确定重置','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                thisV.$emit("reset");
            }).catch(() => {

            })
        };
        this.$refs.tips.getElementsByClassName("el-alert__title")[0].appendChild(resetBut);
    }
}
</script>
<style lang="scss" scoped>
    @import '../common/styles/Mixin';
    .Done-tips{
        text-align: left;width: 840px;margin:0 auto 30px;
        position: relative;z-index: 5;
        @include box-shadow(0 0 10px #D2D2D2);
        @include border-radius(4px);
        *{
            font-family: "Microsoft YaHei UI Light";
        }
        /deep/ .resetBut{
            color: #409EFF;text-decoration: none;
        }
        /deep/ .el-icon-close{
            display: none;
        }
    }
</style>