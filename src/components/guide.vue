<template>
    <div>
        <Navigate></Navigate>
        <div class="intro">
            <h1>WashBasin 脸盆网·新手上路</h1>
            <h4>你甚至可以在脸盆里洗脚</h4>
        </div>
        <el-card class="box-card" body-style="padding:0px">
            <el-container>
                <el-header class="head">
                    <span style="font-family:'Microsoft YaHei';font-weight:bold;float:left">新手上路</span>
                    <span style="font-family:'Microsoft YaHei';float:right">{{guide.post.time | dateFormatter}}</span>
                </el-header>
                <el-main>
                    <el-container style="padding:0 0">
                        <el-aside width="19%" style="display:flex;align-items:center;justify-content: center;">
                            <div>
                                <el-avatar :src="guide.url"></el-avatar>
                                <p style="font-size:14px">{{guide.post.authorname}}</p>
                            </div>        
                        </el-aside>
                        <el-main>
                            <p style="font-family:'Microsoft YaHei';font-weight:bold;float:left;padding:0 26px;font-size:20px;width:81%">新手必读！！！！！</p>
                            <mavon-editor class="md"
                                :value="guide.post.content"
                                :subfield = "false"
                                :defaultOpen = "'preview'"
                                :toolbarsFlag = "false"
                                :editable="false"
                                :scrollStyle="true"
                            ></mavon-editor>
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-card>
        <footer>Copyright ©</footer>
    </div>
</template>


<script>
import Navigate from "./Navigate"
export default {
    name:"guide",
    components:{
        'Navigate':Navigate,
    },
    data(){
        return{
            guide:{
                post:{
                    time:"",
                    authorname:"",
                    content:"",
                },
                url:"",
            }
        } 
    },
    beforeMount(){
        var guideid=0;
        var formData=new FormData();
        formData.append('pid',guideid);
        this.$axios
        .post("/postpage/open",formData)
        .then(res=>{
            this.guide=res.data;
        })
        .catch(e=>{
            console.log(e);
        })
    }
}
</script>

<style scoped>
    .intro{
        background: #ffffff;
        width: 64%;
        margin:20px 18%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px
    }
    .intro h1{
        padding:10px 30px;
        padding-bottom: 0px;
        margin-bottom: 0;
    }
    .intro h4{
         padding:13px 30px;
         padding-top:0px;
    }
    footer {
        height: 75px;
        margin-top: 30px;
        background: #487eb0;
        text-align: center;
        padding-top: 40px;
        color:#505050
    }
    .el-card{
        margin: 30px 18%;
        width:64%;
        padding: 0%
    }
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
        text-align: center;
        line-height: 10px;
        margin: 0px 0;
        border-right-style: solid;
        border-bottom-width:1em;
        border-color: #dfe4ea;
    }
    .el-main,.el-footer{
        padding:0%
    }
</style>