<template>
    <div class="page-changeCity">
        <el-row>
            <province />
        </el-row>
        <el-row>
            <MyHot title="热门城市" :list="hotList"/>
        </el-row>
        <el-row>
            <MyHot title="最近访问" :list="hotList"/>
        </el-row>
        <el-row>
            <Category />
        </el-row>
    </div>
</template>
<script>
import Province from "../components/changeCity/province.vue"
import MyHot from "../components/changeCity/hot.vue"
import Category from "../components/changeCity/category.vue"
export default {
    data(){
        return{
            hotList:["北京",'上海','广州','深圳','成都','杭州']
        }
    },
    components:{
        Province,
        MyHot,
        Category,
    }
}
</script>