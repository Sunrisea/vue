<template>
    <div>
        <Navigate></Navigate>
        <div class="signupform">
            <form action="" v-show="flag">
                <h1>SignUp</h1>
                <el-input placeholder="username" v-model="signupform.username" clearable class="txtb" minlength="1"> </el-input>
                <el-input placeholder="password" v-model="signupform.password" show-password class="txtb" minlength="6"></el-input>
                <el-input placeholder="repassword" v-model="signupform.repassword" show-password class="txtb" minlength="6"></el-input>
                <input type="submit" class="signupbottom" value="注册账户" @click.prevent="signup">
                <a href="" @click.prevent="change">已经有账户了?</a>
            </form>
            <form action="" v-show="!flag">
                <h1>Login</h1>
                <el-input placeholder="username" v-model="loginform.username" clearable class="txtb" minlength="1"> </el-input>
                <el-input placeholder="password" v-model="loginform.password" show-password class="txtb" minlength="6"></el-input>
                <input type="submit" class="loginbottom" value="登录" @click.prevent="login">
                <a href="" @click.prevent="change">还没有账户?</a>
            </form>
        </div>
    </div>
</template>

<script>

import Navigate from './Navigate'
export default {
  name: 'App',
  data(){
      return{
          flag:true,
          loginform:{
              username:"",
              password:""
          },
          signupform:{
              username:"",
              password:"",
              repassword:""
          }
      }
  },
  components:{
      'Navigate':Navigate
  },
  methods:{
      change(){
          this.flag=!this.flag
      },
      login(){
        if(this.loginform.username==""||this.loginform.password=="")
        {
            this.$notify({
            title: '警告',
            message: '用户名和密码不能为空',
            type:"warning"
            });
            return;
        }
        this.$axios
        .post('/login', {
            username: this.loginform.username,
            password: this.loginform.password
        })
        .then(successResponse => {
            if (successResponse.data.code === 200) {
                 this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type:'success'
                    });
                this.$store.commit('changeuser',this.loginform.username);
                this.$store.commit('changeroot',"0");
                this.$router.replace({path: '/'})
            }else if(successResponse.data.code===500){
                this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type:'success'
                    });
                this.$store.commit('changeuser',this.loginform.username);
                this.$store.commit('changeroot',"2");
                this.$router.replace({path: '/'})
            }else if(successResponse.data.code===300){
                this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type:'success'
                    });
                this.$store.commit('changeuser',this.loginform.username);
                this.$store.commit('changeroot',"1");
                this.$router.replace({path: '/'})
            }
            else{
                this.$notify.error({
                title: '错误',
                message: '登录失败',
                });
            }
        })
        .catch(failResponse => {
            this.$notify.error({
                title: '错误',
                message: '登录失败',
                });
        })
    },
      signup(){
          this.$axios
          .post('/signup',{
              username: this.signupform.username,
              password: this.signupform.password,
              repassword: this.signupform.repassword
          })
          .then(successResponse=>{
              if(successResponse.data.code===200){
                  this.$notify({
                    title: '成功',
                    message: '注册成功',
                    type:'success'
                    });
                  this.$store.commit('changeuser',this.signupform.username);
                  this.$store.commit('changeroot',"0");
                  this.$router.replace({path: '/guide'})
              }
              else if(successResponse.data.code===300){
                  this.$notify.error({
                    title: '错误',
                    message: '用户已存在',
                    });
              }
              else if(successResponse.data.code===500){
                   this.$notify.error({
                    title: '错误',
                    message: '用户名长度应小于等于六个字符',
                    });
              }
              else if(successResponse.data.code===600){
                   this.$notify.error({
                    title: '错误',
                    message: '密码长度应为六到十八个字符',
                    });
              }
              else if(successResponse.data.code===400){
                  this.$notify.error({
                    title: '错误',
                    message: '密码不一致',
                    });
              }
          })
          .catch(failResponse=>{
               this.$notify.error({
                    title: '错误',
                    message: '注册失败',
                    });
          })
      }
  }
}
</script>

<style>
    .signupform{
        background-color: #7f8fa6;
        padding: 20px;
        position: absolute;
        width: 301px;
    
        text-align: center;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        overflow: hidden;
    }
    .signupform h1{
        margin-top: 60px;
        font-size: 44px;
        font-family: 'Do Hyeon', sans-serif;
        color: #fff
    }

    .signupform input{
        display: block;
        text-align: center;
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        border-style: none;
    }
    .signupform el-input{
        display: block;
        text-align: center;
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        border-style: none;
    }
    .txtb{
        margin: 10px 0;
        border-radius: 10px/10px;
        background-color: rgba(255,255,255,0.5)
    }
    .signupbottom,.loginbottom{
        margin-top: 60px;
        margin-bottom:20px;
        border-radius: 44px;
        background-color:#40739e;
        outline: none;
        border-style: none;
        transition-duration: 300ms;
        color: #fff
    }

    .signupbottom:hover,.loginbottom:hover{
        background-color:rgba(106, 105, 209, 0.5);
    }

    .signupform a{
        text-decoration: none;
        color: #fff;
        display: block;
        transition-duration: 0.8s;
        padding: 10px;
    }

    .signupform a:hover{
        background:rgba(0, 0, 0, 0.2);
    }
</style>
