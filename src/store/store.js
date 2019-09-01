import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        usernow:"",
        root:"",
    },
    mutations: {
        changeuser(state,username){
            state.usernow=username;
        },
        logout(state){
            state.usernow="";
            state.root=""
        },
        changeroot(state,root){
            state.root=root;
        }
    }
})