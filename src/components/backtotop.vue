<template>
    <div class="uptotopbutton">
        <el-button type="primary" icon="el-icon-top" circle @click="totop"></el-button>
    </div>
</template>

<script>
export default {
    name:"backtotop",
    methods:{
        totop(){
            scroll(0,0);
        }
    }
}
</script>


<style scoped>
    .uptotopbutton{
        position: fixed;
        top:73%;
        left: 86%;
    }

    .uptotopbutton button{

        width: 50px;
        height: 50px;
    }

    .uptotopbutton button:hover{
        background: #0984e3;
        color:white
    }
</style>
