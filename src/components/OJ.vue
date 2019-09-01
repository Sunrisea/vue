<template>
    <div>
        <Navigate></Navigate>
        <div class="intro">
            <h1>WashBasin 脸盆网·刷题版块</h1>
            <h4>三人行，必有我师。勇敢地提出自己的问题，并乐于解决他人的问题</h4>
        </div>
        <div class="cardpage" style="min-height:400px">
            <el-card class="box-card" body-style="padding:0px" style="min-height:100px">
                <el-container>
                    <el-header>
                        <span style="font-family:'Microsoft YaHei';font-weight:bold;float:left">刷题版块</span>
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
        <el-card style="text-align:center;margin:30px 18%">
            <el-pagination
                layout="prev, pager, next"
                :total="totalnum"
                @current-change="changepage()"
                ref="pagination">
            </el-pagination>
        
        </el-card>
        
        <el-button type="primary" icon="el-icon-edit" circle @click="sendpost" class="postbutton"></el-button>

        <el-dialog title="发布帖子" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="帖子名称" :label-width="formLabelWidth">
                    <el-input v-model="form.headline" autocomplete="off" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="选择版块" :label-width="formLabelWidth">
                     <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="讨论区" value="讨论区"></el-option>
                        <el-option label="课程推荐" value="课程推荐"></el-option>
                        <el-option label="刷题版块" value="刷题版块"></el-option>
                        <el-option label="校园周边" value="校园周边"></el-option>
                    </el-select>    
                </el-form-item>
                <el-form-item label="帖子内容" :label-width="formLabelWidth">
                   <mavon-editor v-model="form.content" :toolbars="toolbars"></mavon-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="decidepost" >确 定</el-button>
            </div>
        </el-dialog>
        <backtotop></backtotop>
        <footer>Copyright ©</footer>
    </div>
</template>

<script>
import Navigate from './Navigate';
import backtotop from './backtotop'
export default {
    name:"OJ",
    components:{
        'Navigate':Navigate,
        'backtotop':backtotop,
    },
    data(){
        return{
            posts:[
            ],
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
            headline: '',
            region: '',
            content:""
            },
            formLabelWidth: '70px',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: false, // 标记
                superscript: false, // 上角标
                subscript: false, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: false, // 链接
                imagelink: false, // 图片链接
                code: false, // code
                table: false, // 表格
                fullscreen: false, // 全屏编辑
                readmodel: false, // 沉浸式阅读
                htmlcode: false, // 展示html源码
                help: false, // 帮助
                /* 1.3.5 */
                undo: false, // 上一步
                redo: false, // 下一步
                trash: false, // 清空
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
             totalnum:0,
        }
    },
    methods:{
      sendpost(){
        if(this.usernow==""){
          this.$notify.info({
          title: '消息',
          message: '发帖请先登录'
        });
        return;
        }
        this.dialogFormVisible = true;
      },
       sortPostlist(){
          var sortedpost=this.posts;
          sortedpost.sort(function(a,b){
              return -parseInt(a.reply)+parseInt(b.reply);
          })
          return sortedpost;
      },
      jump(postid){
          if(this.usernow==""){
              this.$notify.info({
                title: '消息',
                message: '请先登录'
            });
            return;
          }
          this.$router.push({path:"/postcontent",name:'postcontent',query:{postid:postid}})
      },
      changepage(page){
            let zone="刷题版块";
            let pagenum=this.$refs.pagination.internalCurrentPage;
            let formData=new FormData();
            formData.append("zone",zone);
            formData.append('page',pagenum);
            this.$axios
            .post('/post/zonepage',formData)
            .then(successResponse=>{
                this.posts=successResponse.data;
                this.totalnum=this.posts[0].sum;
            })
            .catch(failResponse => {
                this.$notify.error({
                    title: '错误',
                    message: '加载失败',
                    });
            })
        },
        decidepost(){
        if(this.form.headline==''|| this.form.region=='' || this.form.content==''){
          this.$notify.error({
                title: '错误',
                message: '帖子的标题，内容，版块不能为空',
                });
                return;
        }
        this.$axios
        .post('/post/publish',{
          authorname:this.usernow,
          title:this.form.headline,
          zone:this.form.region,
          content:this.form.content,
          time:new Date()
        })
        .then(successReponse=>{
          this.dialogFormVisible = false;
          this.$notify({
                title: '成功',
                message: '发表成功',
                type:'success',
                });
        })
        .catch(failResponse=>{
          this.dialogFormVisible = false;
           this.$notify.error({
                title: '错误',
                message: '发表失败',
                });
        })
      },
    },
    computed:{
      usernow(){
        return this.$store.state.usernow;
      }
    },
    beforeMount(){
        let zone="刷题版块"
        let formData=new FormData();
        formData.append("zone",zone);
        formData.append("page",1);
        this.$axios
        .post('/post/zonepage',formData)
        .then(successResponse=>{
            this.posts=successResponse.data;
            this.totalnum=this.posts[0].sum;
        })
         .catch(failResponse => {
            this.$notify.error({
                title: '错误',
                message: '加载失败',
                });
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
    .cardpage{
        margin: 10px 18%;
        width:64%;
        padding: 0%
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
    .postbutton{
        position: fixed;
        top:65%;
        left: 86%;
        border-style: none;
        width: 50px;
        height: 50px;
    }

    .postbutton button:hover{
        background: #0984e3;
        color:white
    }
    footer {
        height: 75px;
        margin-top: 30px;
        background: #487eb0;
        text-align: center;
        padding-top: 40px;
        color:#505050
    }
</style>