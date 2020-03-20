<template>
    <el-row class = "m-header-topbar m-header">
        <el-col :span="10">
            <MyGeo />
        </el-col>
        <el-col :span="14">
            <MyNav />
        </el-col>
    </el-row>
</template>
<script>
import MyNav from "./nav.vue"
import MyGeo from "./geo.vue"
export default {
    components:{
        MyNav,
        MyGeo
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/public/header/topbar.scss"
</style>