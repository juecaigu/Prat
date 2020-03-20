<template>
    <div class = "search-panel">
        <el-row class = "m-header-searchbar">
            <el-col class = "left" :span = "3">
                <router-link :to="{name:'Index'}">
                <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
                </router-link>
            </el-col>
            <el-col class = "center" :span = "10">
                <el-row class = "wrapper">
                    <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="foucsInt" @blur="blurInt"></el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                    <dl class = "hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item,index) in hotPlaceList" :key="index">
                            <router-link to="/">{{ item }}</router-link>
                        </dd>
                    </dl>
                    <dl class = "searchList" v-if="isSearchList">
                       <dd v-for="(item,index) in searchList" :key="index">
                            <router-link to="/">{{ item }}</router-link>
                        </dd>
                    </dl>
                </el-row>
                <el-row class = "suggest">
                    <router-link to="/" v-for="(item,index) in suggestList" :key="index">{{ item }}</router-link>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from "../API/index.js"
export default {
    data(){
        return {
            hotPlaceList:null,
            searchList:null,
            suggestList:null,
            isShow:false,
            searchWord:""
        }
    },
    mounted(){
        api.getSearchList().then(res => {
            this.searchList = res.data.data.list;
        })
        api.getsearchHotWords().then(res => {
            console.log(res);
            this.suggestList = res.data.data;
            this.hotPlaceList = res.data.data;
        })
    },
    computed:{
        isHotPlace(){
            return this.isShow && !this.searchWord
        },
        isSearchList(){
            return this.isShow && this.searchWord
        }
    },
    methods:{
        foucsInt(){
            this.isShow = true;
        },
        blurInt(){
            let self = this;
            setTimeout(function(){
                self.isShow = false;
            },500)
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/public/header/search.scss"
</style>