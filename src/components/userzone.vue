<template>
    <div style="background-color:bgColor" >
        <Navigate></Navigate>
        <div class="intro">
            <h1>WashBasin 脸盆网</h1>
        </div>
        <!-- 基本信息 -->
        <el-card body-style="padding:0px" class="el-card1">    
            <el-container style="margin: 0px">
                <el-aside width="20%" style="display:flex;align-items:center;justify-content:center;margin-left:10%" >
                        <el-avatar :size="100" :src="this.user.image"></el-avatar>
                </el-aside>
                <el-main>
                        <p style="font-size:30px;margin-top:0px;margin-bottom:0px;text-align:left;width:80%;margin-left:4%">
                            {{user.username}}
                            <i v-if="user.sex === 'male'" class="el-icon-male"></i>
                            <i v-if="user.sex === 'female'" class="el-icon-female"></i>
                        </p>
                        <p style="font-size:15px;margin-top:0px;margin-bottom:0px;padding:20px;width:70%">
                            <span style="float:left"><i class="el-icon-location"></i>{{user.region}}</span>
                            <span style="float:right"><i class="el-icon-date"></i>{{user.birthday | dateFormatter}}</span>
                        </p> 
                        <p style="font-size:15px;margin-top:7px;margin-bottom:0px;text-align:left;margin-left:4%;width:80%">
                            {{user.motto}}
                        </p> 
                </el-main>
            </el-container>
        </el-card>
        
        <!-- 三个板块 -->
        <div class="content">
            <el-tabs type="border-card" width="100%">
                <el-tab-pane label="我的帖子">
                    <div v-for="item in posts" :key="item.id" class="postzone">
                        <el-container>
                            <el-aside width="14%" class="el-aside2">
                                <div style="margin-top:3px">
                                    <el-avatar :src="item.url"></el-avatar>
                                    <p style="font-size:14px">{{item.post.authorname}}</p>                                
                                </div>
                            </el-aside>
                            <el-main class="el-main2">
                                <p class="posttopic" style="font-size:20px;font-family:Microsoft YaHei;font-weight:700" @click="jump(item.post.pid)">{{item.post.title}}</p>
                                <p class="inf"><span>{{item.post.time | dateFormatter}}</span><span style="width:100px;float:right;margin-right:50px">回复量:{{item.post.rids}}</span></p>
                            </el-main>
                        </el-container>
                    </div>
                        <div class="block" style="margin:30px">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="totalnum"
                                @current-change="handleCurrentChange"
                                ref="pagination">
                            </el-pagination>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="修改信息">
                    <el-form ref="form" :model="form" label-width="80px">
                        <!-- <el-form-item label="用户名">
                            <el-input v-model="form.username" 
                                type="text"
                                placeholder="请输入内容"
                                maxlength="6"
                                show-word-limit
                                style="width:200px">
                            </el-input>
                        </el-form-item> -->
                        <el-form-item label="头像">
                            <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :http-request='uploadFileMethod'
                                :before-upload="beforeAvatarUpload">
                                <img v-if="user.image" :src="user.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-select v-model="form.region" placeholder="请选择省份">
                            <el-option label="北京市" value="北京市"></el-option>
                            <el-option label="天津市" value="天津市"></el-option>
                            <el-option label="上海市" value="上海市"></el-option>
                            <el-option label="重庆市" value="重庆市"></el-option>
                            <el-option label="河北省" value="河北省"></el-option>
                            <el-option label="山西省" value="山西省"></el-option>
                            <el-option label="辽宁省" value="辽宁省"></el-option>
                            <el-option label="吉林省" value="吉林省"></el-option>
                            <el-option label="黑龙江省" value="黑龙江省"></el-option>
                            <el-option label="江苏省" value="江苏省"></el-option>
                            <el-option label="浙江省" value="浙江省"></el-option>
                            <el-option label="安徽省" value="安徽省"></el-option>
                            <el-option label="福建省" value="福建省"></el-option>
                            <el-option label="江西省" value="江西省"></el-option>
                            <el-option label="山东省" value="山东省"></el-option>
                            <el-option label="河南省" value="河南省"></el-option>
                            <el-option label="湖北省" value="湖北省"></el-option>
                            <el-option label="湖南省" value="湖南省"></el-option>
                            <el-option label="广东省" value="广东省"></el-option>
                            <el-option label="海南省" value="海南省"></el-option>
                            <el-option label="四川省" value="四川省"></el-option>
                            <el-option label="贵州省" value="贵州省"></el-option>
                            <el-option label="云南省" value="云南省"></el-option>
                            <el-option label="陕西省" value="陕西省"></el-option>
                            <el-option label="甘肃省" value="甘肃省"></el-option>
                            <el-option label="青海省" value="青海省"></el-option>
                            <el-option label="台湾省" value="台湾省"></el-option>
                            <el-option label="内蒙古自治区" value="内蒙古自治区"></el-option>
                            <el-option label="广西壮族自治区" value="广西壮族自治区"></el-option>
                            <el-option label="西藏自治区" value="西藏自治区"></el-option>
                            <el-option label="宁夏回族自治区" value="宁夏回族自治区"></el-option>
                            <el-option label="新疆维吾尔自治区" value="新疆维吾尔自治区"></el-option>
                            <el-option label="香港特别行政区" value="香港特别行政区"></el-option>
                            <el-option label="澳门特别行政区" value="澳门特别行政区"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-col :span="11">
                                <el-date-picker 
                                    type="date" 
                                    placeholder="选择日期" 
                                    v-model="form.birthday" 
                                    style="width: 100%;"
                                    :clearable="false"
                                    >
                                </el-date-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            <el-radio label="隐藏"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="个人签名">
                            <el-input type="textarea" v-model="form.motto"
                                rows="5"
                                placeholder="请输入内容"
                                maxlength="30"
                                show-word-limit
                                resize="none"
                                style="width:500px">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(form)">提交修改</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="修改密码">
                    <el-form :model="ruleForm" 
                        status-icon :rules="rules" 
                        ref="ruleForm" 
                        label-width="100px" 
                        class="demo-ruleForm">
                        <el-form-item label="原密码" prop="oldpass">
                            <el-input type="password" v-model="ruleForm.oldpass" 
                                maxlength="18"
                                minlength="6"
                                show-word-limit
                                style="width:200px"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" 
                                maxlength="18"
                                minlength="6"
                                show-word-limit
                                style="width:200px"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" 
                                maxlength="18"
                                show-word-limit
                                style="width:200px"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="页面风格">
                    <el-container>
                        <el-main>
                            
                        </el-main>
                    </el-container>
                </el-tab-pane> -->
            </el-tabs>
        </div>
        
    </div>
</template>

<script>
    import Navigate from './Navigate'
    import Posttable from './Posttable'

    export default {
        name: 'userzone',
        components:{
            'Navigate':Navigate,
            'Posttable':Posttable
        },
        data(){
            // 检验新密码
            var validatePass1 = (rule, value, callback) => {    
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码长度小于6'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            // 再次检验新密码
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            // 检验原密码
            var validatePass0 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    if (value !== this.user.password) {
                        callback(new Error('请输入正确密码'));
                    } else {
                        callback();
                    }
                    
                }
            };

            return{
                // 我的帖子有多少页
                totalnum:10,
                

                // 帖子内容
                posts:[
                ],

                // 用户信息表
                user: {
                    username: "",
                    image: "",
                    password: "",
                    region: "",
                    birthday: new Date(),
                    sex: "",
                    motto: "",
                },

                // 修改资料时用的表
                form: {
                    image: "",
                    region: "",
                    birthday: new Date(),
                    sex: "",
                    motto: "",
                },

                // 修改密码时用的表
                ruleForm: {
                    oldpass: '',
                    pass: '',
                    checkPass: '',
                },

                // 密码检验规则
                rules: {
                    oldpass: [
                        { validator: validatePass0, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                
            }
        },

        
        beforeMount() {
                // 提前加载用户信息
                this.user.username = this.usernow0;
                this.$axios
                .post('/userdata',{
                    username: this.user.username,
                })
                .then(successRes => {
                    this.user.password = successRes.data.password;
                    this.user.region = successRes.data.region;
                    this.user.birthday = successRes.data.birthday;;
                    this.user.sex = successRes.data.sex;
                    this.user.motto = successRes.data.motto;
                })
                .catch(failureRes => {
                    this.$notify.error({
                        title: '错误',
                        message: '加载信息失败',
                    });
                })
                
                let formData2=new FormData();
                formData2.append("username",this.user.username);
                this.$axios
                .post('/test/userimage',formData2)
                .then(successRes => {
                    this.user.image = successRes.data;
                })
                .catch(failureRes => {
                    this.$notify.error({
                        title: '错误',
                        message: '加载头像失败',
                    });
                })
                
                //获取第一页我的帖子内容
                let username=this.user.username;
                let formData=new FormData();
                formData.append("username",username);
                formData.append('page',1);
                this.$axios
                .post('/userspace/myposts',formData)
                .then(successResponse => {
                    this.posts=successResponse.data;
                    this.totalnum=this.posts[0].sum;
                })
                .catch(failureResponse => {})
            },

        methods:{
            submitForm(formName) {     //上传修改密码的表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios
                        .post('/usercode',{
                            username: this.user.username,
                            password: this.ruleForm.pass
                        })
                        .then(successRes => {
                            this.user.password = this.ruleForm.pass;
                            this.$notify({
                                title: '成功',
                                message: '修改完成！',
                                type: 'success'
                            });
                        })
                        .catch(failureRes => {
                            this.$notify.error({
                                title: '错误',
                                message: '修改密码失败',
                            });
                        })
                    } else {
                        this.$notify({
                            title: '警告',
                            message: '密码输入不符合要求',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {     //重置修改密码的表单
                this.$refs[formName].resetFields();
            },
            onSubmit(formName) {      //上传修改个人信息的表单
                if(this.form.region == "") {
                    this.form.region = this.user.region;
                }
                if(this.form.sex == "") {
                    this.form.sex = this.user.sex;
                }
                if(this.form.motto == "") {
                    this.form.motto = this.user.motto;
                }
                if(this.form.birthday == null) {
                    this.form.birthday = this.user.birthday;
                }

                this.$axios
                .post('/userzone',{
                    username: this.user.username,
                    region: this.form.region,
                    sex: this.form.sex,
                    birthday: this.form.birthday,
                    motto: this.form.motto
                })
                .then(successRes => {
                    this.$notify({
                        title: '成功',
                        message: '提交完成！',
                        type: 'success'
                    });
                    this.user.region = this.form.region;
                    this.user.sex = this.form.sex;
                    this.user.birthday = this.form.birthday;
                    this.user.motto = this.form.motto;
                })
                .catch(failureRes => {
                    this.$notify.error({
                        title: '错误',
                        message: '上传信息失败',
                    });
                })
            },

            // 跳转到帖子内容
            jump(postid){
                this.$router.push({path:"/postcontent",name:'postcontent',query:{postid:postid}})
            },

            uploadFileMethod(param){     //头像上传
                let username=this.user.username;
                let imageObject = param.file;
                let formData = new FormData();
                formData.append("image", imageObject);
                formData.append("username",username);

                this.$axios
                .post("/test/uploadImage",formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
                .then(res=>{
                    this.$notify({
                        title: '成功',
                        message: '上传完成！',
                        type: 'success'
                    });
                    this.user.image = res.data.url
                })
                .catch(e=>{
                    this.$notify.error({
                        title: '错误',
                        message: '上传头像失败',
                    });
                })
            },

            beforeAvatarUpload(file) {      // 图片格式、大小检验
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            handleCurrentChange(val) {    // 帖子分页跳转
                let username=this.user.username;
                let page=this.$refs.pagination.internalCurrentPage;
                let formData=new FormData();
                formData.append("username",username);
                formData.append('page',page);
                this.$axios
                .post('/userspace/myposts',formData)
                .then(successResponse => {
                    this.posts=successResponse.data;
                    this.totalnum=this.posts[0].sum;
                })
                .catch(failureRes => {
                    this.$notify.error({
                        title: '错误',
                        message: '页面跳转失败',
                    });
                })
            }
        },
        computed: {
            usernow0() {
                return this.$store.state.usernow;
            },
        }
    }
</script>

<style scoped>
    textarea{
        resize: none;
    }
    .el-card1 {
        margin: 30px 18%;
        width: 64%;
    }
    .intro{
        background: #ffffff;
        width: 64%;
        margin:20px 18%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px
    }
    .intro h1{
        padding:30px;
        padding-top: 10px;
    }
    footer {
        height: 75px;
        margin-top: 30px;
        background: #487eb0;
        text-align: center;
        padding-top: 40px;
        color:#505050
    }
    .el-card el-container el-aside {
        background-color: rgb(255, 255, 255);
        color: #333;
        text-align: center;
    }
    
    .el-card el-container el-main {
        background-color: rgb(255, 255, 255);
        color: #333;
        text-align: center;
    }

    .el-card el-container {
        margin-bottom: 40px;
        width: 100%;
        height: 180px;
        margin: 0px 0%;
    }
    .el-main2 {
        border-style: none;
        border-bottom-style: solid;
        border-bottom-width: 0.5px;
        border-color: #dfe4ea;
        padding: 0%;
        padding-left: 15px
    }
    .el-aside2 {
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
    .content {
        background: #ffffff;
        width: 64%;
        margin:20px 18%;
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
        border-bottom-style: solid;
        border-bottom-width: 0.5px;
        border-color: #dfe4ea;
    }
    .postzone:hover{
        background:#dfe4ea 
    }
    
    .block{
        background: #ffffff;
        width: 100%;
        text-align: center;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 180px;
        height: 180px;
    }
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover,.el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 180px;
        height: 180px;
        line-height: 180px;
        text-align: center;
    }
    .avatar {
        width: 180px;
        height: 180px;
        display: block;
    }
</style>
