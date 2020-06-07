<template>
    <!-- 头部和尾部的复用组件 -->
    <div>
        <el-container class="layout-default" > 
            <el-header height="">
                <MyHeader />
            </el-header>
            <el-main class = "main">
                <router-view></router-view>
            </el-main>
            <el-footer height="">
                <MyFooter /> 
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import MyHeader from "@/components/header/index.vue"
import MyFooter from "@/components/footer/index.vue"
export default {
    components:{
        MyHeader,
        MyFooter
    }
}
</script>
<style lang="scss">
    @import "../assets/css/public/layout.scss"  
</style>