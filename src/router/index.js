import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import SignUp from "@/components/SignUp"
import postcontent from "@/components/postcontent"
import chatroom from "@/components/chatroom"
import lesson from "@/components/lesson"
import oj from "@/components/OJ"
import school from "@/components/school"
import guide from "@/components/guide"
import userzone from "@/components/userzone"
import test from "@/components/test"
import searchresult from '@/components/searchresult'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:"/",
            name:'Home',
            component:Home,
        },
        {
            path:"/SignUp",
            name:"SignUp",
            component:SignUp
        },
        {
            path:"/postcontent",
            name:"postcontent",
            component:postcontent
        },
        {
            path:"/userzone",
            name:"userzone",
            component:userzone
        },
        {
            path:"/chatroom",
            name:"chatroom",
            component:chatroom
        },
        {
            path:"/lesson",
            name:"lesson",
            component:lesson
        },
        {
            path:"/OJ",
            name:"OJ",
            component:oj
        },
        {
            path:"/school",
            name:"school",
            component:school
        },
        {
            path:"/guide",
            name:"guide",
            component:guide
        },
        {
            path:"/test",
            name:"test",
            component:test
        },
        {
            path:"/searchresult",
            name:"searchresult",
            component:searchresult
        }
    ]
})