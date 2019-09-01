<template>
    <div>
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request='uploadFileMethod'
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    <div>
        <el-avatar :src="imagesrc"></el-avatar>
    </div>
    </div>
</template>


<script>
export default {
    name:'test',
    computed:{
        usernow(){
            return this.$store.status.usernow;
        }
    },
    data() {
      return {
        imageUrl: '',
        imagesrc: '',
      };
    },
    methods: {
      beforeAvatarUpload(file) {
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
      uploadFileMethod(param){
        //let username=this.usernow;
        let fileObject = param.file;
        let formData = new FormData();
        formData.append("image", imageObject);
        formData.append("username",username)
        this.$axios
        .post("/",formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res=>{
            console.log(res);
            this.imagesrc=res.data.url;
            this.imageUrl=res.data.url;
        })
        .catch(e=>{
            console.log(e);
        })
      }

    }
}
</script>

<style scoped>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>