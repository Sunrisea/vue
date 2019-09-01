<template>
    <div>
        <Navigate></Navigate>
    </div>
</template>

<script>
import Navigate from './Navigate'
export default {
    name:'searchresult',
    components:{
        'Navigate':Navigate,
    },
    beforeMount(){
        var keywords=this.$route.query.keywords;
    }
}
</script>

<style scoped>

</style>