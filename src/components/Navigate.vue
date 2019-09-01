<template>
  <div>
    <div class="header">
      <ul class="nav">
          <li><router-link id="logo" to="/">WashBasin</router-link></li>
          <li class="option dropdown"><router-link to='/'>首页</router-link>
          </li>
          <li class="option"><router-link to="/chatroom">讨论区</router-link></li>
          <li class="option"><router-link to="/lesson">课程推荐</router-link></li>
          <li class="option"><router-link to="/OJ">刷题版块</router-link></li>
          <li class="option"><router-link to="/school">校园周边</router-link></li>
          <li class="option"><router-link to="/guide">新手上路 </router-link></li>
          <li style="float: right" class="option" v-if="!userflag"><router-link to="/SignUp">登录</router-link></li>
          <li style="float: right" class="option" v-if="userflag">
                <el-dropdown style="color: #fff; text-decoration: none; display: block; margin: 10px 20px;" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{usernow}}
                    </span>
                    <el-dropdown-menu slot="dropdown" style="margin-top:20px">
                        <el-dropdown-item command="a">用户空间</el-dropdown-item>
                        <el-dropdown-item command="b" v-if="rootflag">封禁用户</el-dropdown-item>
                        <el-dropdown-item command="e" v-if="rootflag">解禁用户</el-dropdown-item>
                        <el-dropdown-item command="c" v-if="rootflag">编写新手上路</el-dropdown-item>
                        <el-dropdown-item command="d">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
        </li>
          <li></li>
      </ul>
    </div>
    <div style="height: 54px; width: 100%"></div>
    <el-dialog title="用户管理|禁言" :visible.sync="dialogFormVisible1">
        <el-form >
            <el-form-item label="搜索用户" :label-width="formLabelWidth">
                <el-input v-model="banusername" autocomplete="off" maxlength="6" show-word-limit placeholder="输入要禁言的用户名" ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="bansubmit" >确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="用户管理|解禁" :visible.sync="dialogFormVisible3">
        <el-form >
            <el-form-item label="搜索用户" :label-width="formLabelWidth">
                <el-input v-model="bancancelusername" autocomplete="off" maxlength="6" show-word-limit placeholder="输入要解禁的用户名" ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="bancancel" >确 定</el-button>
        </div>
    </el-dialog>
    
    <el-dialog title="新手上路" :visible.sync="dialogFormVisible2">
        <el-form >
            <el-form-item label="新手上路内容" :label-width="formLabelWidth">
                <mavon-editor v-model="guide.content" >123123</mavon-editor>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="guidesubmit" >确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>


<script>


export default {
  name: 'Navigate',
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        keywords:"",
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        formLabelWidth:'100px',
        banusername:'',
        bancancelusername:'',
        guide:{
            content:"",
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
     handleCommand(command) {
        if(command=="a"){
            this.$router.push({path:"/userzone"})
        }
        else if(command=="b"){
            this.dialogFormVisible1=true;
        }
        else if(command=="c"){
            this.dialogFormVisible2=true;
        }
        else if(command=="d"){
            this.$store.commit("logout");
             this.$notify({
                title: '成功',
                message: '注销成功',
                type:"success"
                });
            this.$router.push({path:"/"});
        }
        else if(command=="e"){
             this.dialogFormVisible3=true;
        }
      },
      bansubmit(){
           this.$axios
           .post('/banuser',{
               username:this.banusername
           })
           .then(res=>{
               if(res.data.code==500){
                   this.$notify.info({
                    title: '消息',
                    message: '该用户不存在',
                }); 
               }else if(res.data.code==400){
                   this.$notify.info({
                    title: '消息',
                    message: '该用户为管理员',
                }); 
               }else if(res.data.code==300){
                   this.$notify.info({
                    title: '消息',
                    message: '该用户已被封禁',
                }); 
               }else if(res.data.code==200){
                   this.$notify.info({
                    title: '消息',
                    message: '封禁成功',
                }); 
               }
           })
           .catch(e=>{
               this.$notify.error({
                title: '错误',
                message: '封禁失败'
                });
           })
           this.dialogFormVisible1=false;
      },
      bancancel(){
           this.$axios
           .post('/freeuser',{
               username:this.bancancelusername
           })
           .then(res=>{
               if(res.data.code==500){
                   this.$notify.info({
                    title: '消息',
                    message: '该用户不存在',
                }); 
               }else if(res.data.code==400){
                   this.$notify.info({
                    title: '消息',
                    message: '该用户是管理员',
                }); 
               }else if(res.data.code==300){
                   this.$notify.info({
                    title: '消息',
                    message: '该用户未被禁言',
                }); 
               }else if(res.data.code==200){
                   this.$notify.info({
                    title: '消息',
                    message: '解封成功',
                }); 
               }
           })
           .catch(e=>{
                this.$notify.error({
                title: '错误',
                message: '解禁失败'
                });
           })
           this.dialogFormVisible3=false;
      },
      guidesubmit(){
          if(this.guide.content==""){
              this.$notify.error({
                title: '错误',
                message: '内容不能为空',
                });
                return;
          }
          this.$axios
        .post('/post/publish',{
          authorname:this.usernow,
          title:"新手上路！！！",
          zone:"新手上路",
          content:this.guide.content,
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
        this.dialogFormVisible2=false;
      },
      search(){
          var keywords=this.keywords;
          this.$router.push({path:"/searchresult",name:'searchresult',query:{keywords:keywords}})
          alert(1);
      }
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
    .header {
        width: 100%;
        margin: 0px;
        background: #0097e6;
        top: 0%;
        left: 0%;
        position: absolute;
    }
    .nav{
        list-style-type: none;
        overflow: hidden;
        margin: 0%;
        padding: 0%;
    }
    .nav>li {
        margin: 0%;
        float: left;
        transition-duration: 200ms;
    }
    .nav>li>a,.nav>li>router-link{
        color: #fff;
        text-decoration: none;
        display: block;
        margin: 10px 20px;
        text-decoration: none;
        text-align: center;
    }
    
    .option:hover{
        background: rgba(0,0,0,0.5);
    }

    .option{
        padding-top: 3px;
        padding-bottom: 3px;
    }

    .search{
        padding-top: 0px;
        padding-bottom: 0px;
        float: right;
    }
    #logo{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left:100px;
        padding-top: 3px;
        padding-bottom: 3px;
    }
     .searchinput{
        border-radius: 44px;
        border-style: none;
        text-align: right;
        font-size: 15px;
        height: 17px;
        margin: 8px 40px;
        margin-left: 280px;
        width: 250px;
    }

    .searchbutton:hover{
        background-color: #20bf6b
    }

    .ifin{
        border-style: solid;
    }
   

</style>
