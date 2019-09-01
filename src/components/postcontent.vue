<template>
    <div>
        <Navigate></Navigate>
        <el-card class="box-card" body-style="padding:0px">
            <el-container>
                <el-header class="head">
                    <span style="font-family:'Microsoft YaHei';font-weight:bold;float:left">帖子详情</span>
                    <span style="font-family:'Microsoft YaHei';float:left;margin-left:30px;">{{postinf.post.like}}赞</span>
                    <span style="font-family:'Microsoft YaHei';float:right">{{postinf.post.time | dateFormatter}}</span>
                </el-header>
                <el-main>
                    <el-container style="padding:0 0">
                        <el-aside width="19%" style="display:flex;align-items:center;justify-content: center;">
                            <div>
                                <el-avatar :src="postinf.url"></el-avatar>
                                <p style="font-size:14px">{{postinf.post.authorname}}</p>
                            </div>        
                        </el-aside>
                        <el-main>
                            <p style="font-family:'Microsoft YaHei';font-weight:bold;float:left;padding:0 26px;font-size:20px;width:81%">{{postinf.post.title}}</p>
                            <mavon-editor class="md"
                                :value="postinf.post.content"
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
        <el-card  body-style="padding:0px" v-for="item in reply" :key="item.id" style="margin:5px 18%;">
            <el-container>
                <el-aside width="19%" style="display:flex;align-items:center;justify-content: center;">
                    <div style="margin-top:3px">
                        <el-avatar :src="item.url"></el-avatar>
                        <p style="font-size:14px">{{item.reply.replyname}}</p>                                
                    </div>
                </el-aside>
                <el-container>
                     <el-main  style="min-height:150px;padding:0 15px;">
                        <p>{{item.reply.content}}</p>
                    </el-main>
                    <el-footer style="padding:0 15px;">
                        <p ><span style="color:#808080;">第{{item.reply.rid}}楼 &nbsp; &nbsp; &nbsp;{{item.reply.time | dateFormatter2}}</span><el-button size="mini" icon="el-icon-caret-top" style="float:right" @click="likereply(item)">{{item.reply.like}}</el-button></p>
                    </el-footer>
                </el-container>
                <!-- <el-main  style="min-height:150px;padding:0 15px;">
                    <p>{{item.replycontent}}</p>
                </el-main> -->
            </el-container>
        </el-card>
        

        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true" class="postbutton"></el-button>

        <el-dialog title="回帖" :visible.sync="dialogFormVisible">
            <el-form :model="replyform">
                <el-form-item label="回帖内容" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="7"
                        placeholder="请输入内容"
                        v-model="replyform.content"
                        maxlength="300"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="replypost" >确 定</el-button>
            </div>
        </el-dialog>
        <el-card style="text-align:center">
            <el-pagination
                layout="prev, pager, next"
                :total="totalnum"
                @current-change="changepage()"
                ref="pagination">
            </el-pagination>
        
        </el-card>
    <backtotop></backtotop>
    <div class="deletepost" v-if="rootflag">
        <el-button type="danger" icon="el-icon-delete" circle @click="deletepost"></el-button>
    </div>
    <div class="likepost" >
        <el-button type="primary" icon="el-icon-caret-top" circle @click="likepost"></el-button>
    </div>
    <footer class="mainfooter">Copyright ©</footer>
        
    </div>
</template>

<script>
import Navigate from './Navigate';
import backtotop from './backtotop'
export default {
    name:"postcontent",
    components:{
        'Navigate':Navigate,
        'backtotop':backtotop
    },
    data(){
        return{
            postinf:{
                post:{
                    time:"",
                    authorname:"",
                    title:"",
                    content:"",
                },
                url:"",
            },
            reply:[
                {
                   reply:{
                       replyname:"",
                       replycontent:"",
                       rid:"",
                       time:"",
                       like:"",
                   }
                },
                
            ],
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '70px',
            replyform:{
                content:"",
            },
            postid:"",
            totalnum:1,
        }
    },
    methods:{
        changepage(page){
            let pagenum=this.$refs.pagination.internalCurrentPage;
            let formData=new FormData();
            formData.append("pid",this.postid);
            formData.append('page',pagenum);
            this.$axios
            .post('/reply/postpage',formData)
            .then(successResponse=>{
                this.reply=successResponse.data;
                this.totalnum=this.reply[0].sum;
            })
            .catch(failResponse => {
                this.$notify.error({
                    title: '错误',
                    message: '加载失败',
                    });
            })
        },
        replypost(){
            if(this.banflag==true){
                this.$notify({
                    title: '警告',
                    message: '该用户已被禁言',
                    type: 'warning'
                });
                return;
            }
            this.$axios
            .post("/reply/publish",{
                pid:this.postid,
                replyname:this.usernow,
                content:this.replyform.content,
                time:new Date(),
            })
            .then(res=>{
                this.$notify({
                title: '成功',
                message: '发表成功',
                type:'success',
                });
            })
            .catch(res=>{
                this.$notify.error({
                title: '错误',
                message: '发表失败',
                });
            })
            this.dialogFormVisible=false;
        },
        deletepost(){
            var formData=new FormData();
            formData.append('pid',this.postid);
            this.$axios
            .post('/post/remove',formData)
            .then(res=>{
                this.$notify({
                title: '成功',
                message: '删帖成功',
                type:'success',
                });
                this.$router.push({path:"/"})
            })
            .catch(res=>{
                this.$notify.error({
                title: '错误',
                message: '删除失败',
                });
            })
        },
        likepost(){
            var formData=new FormData();
            formData.append('username',this.usernow);
            formData.append('pid',this.postid);
             this.$axios
            .post("/postpage/postlike",formData)
            .then(res=>{
                if(res.data==true){
                   this.postinf.post.like=this.postinf.post.like+1;
                }
                else{
                    this.$notify.info({
                        title: '消息',
                        message: '你已经点过赞了'
                    });
                }
            })
            .catch(res=>{
                console.log(res);
            })
        },
        likereply(item){
            var rid=item.reply.rid;
            var formData=new FormData();
            formData.append('username',this.usernow);
            formData.append('rid',rid);
            formData.append('pid',this.postid);
            this.$axios
            .post("/postpage/replylike",formData)
            .then(res=>{
                if(res.data==true){
                    item.reply.like=item.reply.like+1;
                }
                else{
                    this.$notify.info({
                        title: '消息',
                        message: '你已经点过赞了'
                    });
                }
            })
        }
    },
    beforeMount(){
        this.postid=this.$route.query.postid;
        console.log(this.postid);
        let formData=new FormData();
        formData.append('pid',this.postid);
        this.$axios
        .post("/postpage/open",formData)
        .then(res=>{
            this.postinf=res.data;
            console.log(this.postinf);
        })
        .catch(e=>{
            console.log(e);
        })

        formData.append('page',1)
        this.$axios
        .post("/reply/postpage",formData)
        .then(res=>{
            this.reply=res.data;
            this.totalnum=this.reply[0].sum;
        })
        .catch(e=>{
            console.log(e)
        })
    },
    computed:{
      usernow(){
          return this.$store.state.usernow;
      },
      userroot(){
          return this.$store.state.root;
      },
      userflag(){
          if(this.usernow=="")
          return false;
          else return true;
      },
      banflag(){
          if(this.userroot=="1"){
              return true;
          }
          else return false;
      },
      rootflag(){
          if(this.userroot=="2"){
              return true;
          }
          else return false;
      }
    }
}
</script>

<style scoped>
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
    .postbutton{
        position: fixed;
        top:65%;
        left: 86%;
        border-style: none;
        width: 50px;
        height: 50px;
    }
    .mainfooter {
        height: 75px;
        margin-top: 30px;
        background: #487eb0;
        text-align: center;
        padding-top: 40px;
        color:#505050
    }
    .deletepost{
        position: fixed;
        top:89%;
        left: 86%;
    }

    .deletepost button{

        width: 50px;
        height: 50px;
    }

    .likepost{
        position: fixed;
        top:81%;
        left: 86%;
    }

    .likepost button{
        width: 50px;
        height: 50px;
    }

    .likepost button:hover{
        background: #0984e3;
        color:white
    }

</style>