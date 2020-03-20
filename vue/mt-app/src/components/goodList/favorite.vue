<template>
    <div>
        <dl class="m-products-favorite">
            <dt>猜你喜欢</dt>
            <dd v-for="item in list" :key="item.poiId">
                <div class = "image">
                    <img :src=item.frontImg alt="图片">
                </div>
                <p class = "title">{{ item.title }}</p>
                <p class = "addres">{{ item.adress }}</p>
                <p class = "price">￥<span>{{ item.avgPrice }}</span></p>
            </dd>
        </dl>
    </div>
</template>
<script>
import api from "@/components/API/local.js"
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        api.getFavorite().then(res=>{
            this.list = res.data.data.favorite
        })
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/products/favorite.scss"
</style>