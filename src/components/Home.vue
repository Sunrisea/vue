<template>
  <div>
  	<Navigate></Navigate>
    <div class="intro">
        <h1>WashBasin 脸盆网</h1>
        <h4>天空宽广，映照的是整个世界；脸盆虽小，却足够我们看清自己</h4>
    </div>
    <Posttable section="讨论区"></Posttable>
    <Posttable section="课程推荐"></Posttable>
    <Posttable section="刷题版块"></Posttable>
    <Posttable section="校园周边"></Posttable>
    <footer>Copyright ©</footer>
    <!-- <postbutton></postbutton> -->
    <el-button type="primary" icon="el-icon-edit" circle @click="sendpost" class="postbutton"></el-button>

        <el-dialog title="发布帖子" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="帖子名称" :label-width="formLabelWidth">
                    <el-input v-model="form.headline" autocomplete="off" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="选择版块" :label-width="formLabelWidth">
                     <el-select v-model="form.region" placeholder="请选择发帖版块">
                        <el-option label="讨论区" value="讨论区"></el-option>
                        <el-option label="课程推荐" value="课程推荐"></el-option>
                        <el-option label="刷题版块" value="刷题版块"></el-option>
                        <el-option label="校园周边" value="校园周边"></el-option>
                    </el-select>    
                </el-form-item>
                <el-form-item label="帖子内容" :label-width="formLabelWidth">
                  <!-- subfield单双栏模式 defaultopen:默认显示区域 -->
                   <mavon-editor v-model="form.content" :toolbars="toolbars"></mavon-editor>
                   <!-- <mavon-editor class="md"
                    :value="form.content"
                    
                    :subfield = "false"
                    :defaultOpen = "'preview'"
                    :toolbarsFlag = "false"
                    :editable="false"
                    :scrollStyle="true"
                  ></mavon-editor> -->

                  <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" :autosize="{ minRows: 10}" v-model="form.content" maxlength="1000" show-word-limit></el-input> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="decidepost" >确 定</el-button>
            </div>
        </el-dialog>
    <backtotop></backtotop>
  </div>
</template>

<script>
import Navigate from './Navigate'
import Posttable from './Posttable'
import backtotop from './backtotop'

export default {
  name: 'Home',
  components:{
    'Navigate':Navigate,
    'Posttable':Posttable,
    'backtotop':backtotop,
  },
  data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          headline: '',
          region: '',
          content:"",
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
        }
      };
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
        else if(this.banflag==true){
           this.$notify({
                    title: '警告',
                    message: '该用户已被禁言',
                    type: 'warning'
                });
        return;
        }
        this.dialogFormVisible = true;
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
      }
    },
    computed:{
      usernow(){
        return this.$store.state.usernow;
      },
      userroot(){
          return this.$store.state.root;
      },
      banflag(){
          if(this.userroot=="1"){
              return true;
          }
          else return false;
      },
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

</style>
