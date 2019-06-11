<template>
    <div class='Choosing' v-loading="State.Submission || Submission_it">
        <el-collapse v-model="activeNames" accordion>
            <el-collapse-item v-for='(v, index) of List' :key='index' :title="v.name" :name="index">
                <div v-if="index + 1 === List.length">
                    <form @submit.prevent="submit('form')">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-input v-model="input[0]" prefix-icon="el-icon-position" placeholder="请输入店铺名称" required :disabled="State.Done"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="input[1]" prefix-icon="el-icon-link" placeholder="请输入链接地址" required :disabled="State.Done"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="primary" native-type="submit" v-show="!State.Done" :disabled="State.Done">确定</el-button>
                            </el-col>
                        </el-row>
                    </form>
                </div>
                <el-row v-else>
                    <el-col :span="18">
                        <div>分类：{{ v.explain }}</div>
                        <div>地址：{{ v.location }}</div>
                        <div>链接：<a class="_href" :href="'https://' + v.href">{{ v.href }}</a></div>
                    </el-col>
                    <el-col :span="6" class="CheckBox">
                        <el-button type="success" icon="el-icon-check" circle title="选择这家" @click="submit(index)" :disabled="State.Done" v-if="!State.Done"></el-button>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: 'Choosing',
        props: {
            State: Object
        },
        methods: {
            submit (index) {
                let type = index === 'form' ? 1 : 0, Which = index === 'form' ? '' : this.List[index].name;
                this.$confirm(['确定选择：' + Which, '确认提交填写内容'][type], '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.Submission_it = true;
                    let subData = {
                        data: {
                            "Name": index === 'form' ? this.input[0] : this.List[index].name,
                            "Location": index === 'form' ? '广州市' : this.List[index].location,
                            "Href": index === 'form' ? this.input[1] : this.List[index].href
                        }
                    };
                    axios.post('/submitted', subData).then(() => {
                        this.Submission_it = false;
                        this.$notify({
                            title: '提交完成',
                            message: ['感谢您的选择', '感谢您的填写'][type],
                            type: 'success'
                        });
                        this.$emit("Finish", subData);
                    }).catch(() => {
                        this.Submission_it = false;
                        this.$notify({
                            title: '提交出错',
                            message: '服务器出现问题',
                            type: 'error'
                        });
                    });
                }).catch(() => {
                    // console.log('cancel');
                });

            }
        },
        data () {
            return {
                SubDone: false,
                activeNames : [],
                input: ['', ''],
                Submission_it: false,
                List: [{
                    name: 'JavaScript',
                    explain: '直译式脚本语言，是一种动态类型、弱类型、基于原型的语言',
                    location: '广东省',
                    href: 'www.baidu.com'
                },{
                    name: 'Java',
                    explain: '简单性、面向对象、分布式、健壮性、安全性、平台独立与可移植性、多线程、动态性等特点',
                    location: '广东省',
                    href: 'www.baidu.com'
                },{
                    name: 'PHP',
                    explain: '混合了C、Java、Perl以及PHP自创的语法。它可以比CGI或者Perl更快速地执行动态网页',
                    location: '广东省',
                    href: 'www.baidu.com'
                },{
                    name: 'Python',
                    explain: '一种计算机程序设计语言。是一种面向对象的动态类型语言',
                    location: '广东省',
                    href: 'www.baidu.com'
                },{
                    name: 'C++',
                    explain: '擅长面向对象程序设计的同时，还可以进行基于过程的程序设计',
                    location: '广东省',
                    href: 'www.baidu.com'
                },{
                    name: '其他'
                }]
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '../common/styles/Mixin';
    .Choosing{
        width: 800px;background: #FFF;
        margin: 0 auto;position: relative;z-index: 5;
        padding: 3px 20px;
        @include box-shadow(0 2px 12px 0 rgba(0, 0, 0, 0.15));
        @include border-radius(4px);
        border:#EBEEF5 1px solid;
        text-align: left;
        .el-collapse{
            border-top: none;
            /deep/ .el-collapse-item__header{
                font-family: SANS-SERIF;
            }
            /deep/ .CheckBox{
                height: 69px;display: flex;align-items: center;justify-content: center;
            }
            > div:last-child /deep/ .el-collapse-item__header,> div:last-child /deep/ .el-collapse-item__wrap{
                border-bottom: none;
            }
            .form{
                width: 48%;float: left;margin:0 1%;
            }
            ._href{
                font-family: SANS-SERIF;text-decoration: none;
                @include transition(color, .3s);
                &:link{
                    color: #66cccc;
                }
                &:visited{
                    color: #66cccc;
                }
                &:hover{
                    color: #58a9fa;
                }
            }
        }
        > div {
            border-bottom: #d7dae2 1px solid;
            &:last-child {
                border-bottom: none;
            }
        }
        .List_{
            height: 30px;line-height: 30px;padding: 8px 12px;
        }
        .List_Name{
            font-family: SANS-SERIF;
        }
        .List_Explain{
            font-size: 12px;
            font-family: '宋体';
            color: #888;
        }
    }
</style>