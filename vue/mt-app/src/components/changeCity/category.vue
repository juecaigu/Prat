<template>
    <!-- 所有城市按照首字母排序 -->
    <div class="category">
        <dl class = "m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd v-for="(item,index) in wordList" :key="index">
                <a :href="'#city-' + item ">{{ item }}</a>
            </dd>
        </dl>
        <dl
        class = "m-categroy-section" 
        v-for="(item,index) in cityGroup" 
        :key="index" 
        :id="'city-' + item.title ">
            <dt>{{ item.title }}</dt>
            <dd>
            <span v-for="city in item.name" 
            :key="city.id"
            @click="changeCity(city.name)"
            >
                {{ city.name }}
            </span>
            </dd>
        </dl>
    </div>
</template>
<script>
import api from "../API/index.js"
export default {
    data(){
        return {
            word:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            cityGroup:[],
            timer:null
        }
    },
    created(){
        api.getProvinceList().then(res => {
            let allData = [];
            let obj = {};
            //数据按照首字母收集
            res.data.data.forEach(ele=>{
                ele.cityInfoList.forEach(item=>{
                    if(!obj[item.firstChar]){
                        obj[item.firstChar] = [];
                    }
                      obj[item.firstChar].push(item)
                })
            })
            for(var props in obj){
                //循环obj中所有的属性名，添加成title属性
                let newObj = {};
                newObj.title = props;
                newObj.name = obj[props];
                allData.push(newObj);
            }
            //排序
            allData.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            this.cityGroup = allData;
        })
    },
    computed:{
        wordList(){
          return this.word.split("")  
        },
    },
    methods:{
        changeCity(city){
            //通过mutations改变state中的位置属性，并跳转到首页
            this.$store.commit("setPosition",city),
            window.scrollTo(0,0);
            this.timer = setTimeout(()=>{
                this.$router.push({name:"Index"})
            },200)
        }
    },
    destroyed(){
        clearTimeout(this.timer)
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/changecity/categroy.scss"
</style>