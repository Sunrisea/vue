<template>
  <div >
    <div class="cardpage">
        <el-card class="box-card" body-style="padding:0px" style="min-height:100px">
            <el-container>
                <el-header>
                    <span style="font-family:'Microsoft YaHei';font-weight:bold;float:left">热帖·{{section}}</span>
                </el-header>
                <el-main v-for="item in posts" :key="item.id" class="postzone">
                    <el-container>
                        <el-aside width="14%">
                            <div style="margin-top:3px">
                                <el-avatar :src="item.url"></el-avatar>
                                <p style="font-size:14px">{{item.post.authorname}}</p>                                
                            </div>
                        </el-aside>
                        <el-main class="postcontent">
                            <p class="posttopic" style="font-size:20px;font-family:Microsoft YaHei;font-weight:700" @click="jump(item.post.pid)">{{item.post.title}}</p>
                            <p class="inf"><span>{{item.post.time | dateFormatter}}</span><span style="width:100px;float:right;margin-right:50px">回复量:{{item.post.rids}}</span></p>
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-card>
    </div>

  </div>
</template>

<script>


export default {
  name: 'Posttable',
  props:['section'],
  data(){
    return{
      posts:[
      ]
    }
  },
  methods:{
      jump(postid){
          if(this.usernow==""){
              this.$notify.info({
                title: '消息',
                message: '请先登录'
            });
            return;
          }
          this.$router.push({path:"/postcontent",name:'postcontent',query:{postid:postid}})
      }
  },
  computed:{
      usernow(){
          return this.$store.state.usernow;
      },
    },
    beforeMount(){
        let zone=this.section;
        let formData = new FormData();
        formData.append("zone",zone);
        this.$axios
        .post('/post/mainpage',formData)
        .then(successResponse=>{
            this.posts=successResponse.data;
        })
        .catch(failResponse => {
            console.log(failResponse);
            this.$notify.error({
                title: '错误',
                message: '加载失败',
                });
        })
    }
  
}
</script>

<style scoped>
    .cardpage{
        margin: 10px 18%;
        width:64%;
        padding: 0%;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main{
        border-style: none;
        border-bottom-style: solid;
        border-bottom-width: 0.5px;
        border-color: #dfe4ea;
        padding: 0%;
    }
    .el-aside {
        color: #333;
        text-align: center;
        height: 82px;
        line-height: 10px;
        float: right;
        margin: 10px 0;
        border-right-style: solid;
        border-bottom-width:1em;
        border-color: #dfe4ea;
    }
    .posttopic{
        margin-top: 17px;
        margin-bottom: 10px;
        font-size:22px;
        font-family:SimHei;
        font-weight:700
    }
    .posttopic:hover{
        color: #e84118;
    }
    .inf{
        margin-top: 20px;
        color: #707070;
    }

    .postcontent{
        padding-left: 15px
    }
    .postzone{
        transition-duration: 200ms;
    }
    .postzone:hover{
        background:#dfe4ea 
    }
</style>
