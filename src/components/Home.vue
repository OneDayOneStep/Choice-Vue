<template>
    <div>
        <div class="Home-Title">
            <i class="el-icon-chat-dot-square"></i>
            {{ title }}
        </div>
        <Done :State="State" @reset="Reset" />
        <Choosing :State="State" @Finish="Done" />
    </div>
</template>

<script>
    import Done from './Done'
    import Choosing from './Choosing'
    const axios = require('axios');
    export default {
        name: "Home",
        components: {
            Done,
            Choosing
        },
        data () {
            return {
                title: '最好的语言',
                State: {
                    "Done": false,
                    "Name": "#",
                    "Location": "#",
                    "Href": "#",
                    "Submission": true
                }
            }
        },
        methods: {
            Done (SubData) {
                this.State.Done = true;
                this.State.Name = SubData.data.Name;
                this.State.Location = SubData.data.Location;
                this.State.Href = SubData.data.Href;
            },
            Reset () {
                const loading = this.$loading({
                    lock: true
                });
                axios.post('/reset').then(() => {
                    this.State.Done = false;
                    loading.close();
                    this.$notify({
                        title: '已重置',
                        message: '您现在可重新选择/填写',
                        type: 'success'
                    });
                }).catch(() => {
                    loading.close();
                    this.$notify({
                        title: '重置出错',
                        message: '服务器出现问题',
                        type: 'error'
                    });
                });
            }
        },
        mounted () {
            axios.get("/data").then((res) => {
                let thisV = this;
                setTimeout(function(){
                    thisV.State = res.data.data;
                }, 1000)
            }).catch(() => {

            })
        }
    }
</script>

<style scoped lang="scss">
    .Home-Title{
        font-size: 40px;margin: 30px auto;font-family: "Microsoft YaHei UI Light";
        position: relative;z-index: 5;width: 500px;
        i{
            font-size: 46px;
            vertical-align: text-bottom;
        }
    }
</style>