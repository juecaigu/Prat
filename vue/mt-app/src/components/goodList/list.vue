<template>
  <div class = "m-products-list">
      <ul>
          <li
        v-for="item in nav"
        :key="item.key"
        :class="{'s-nav-active':item.active}"
        @click=orderRules(item)
          >{{ item.name }}</li>
      </ul>
    <el-row>
        <Each 
        v-for="item in metaList"
        :key= "item.itemId"
        :meta="item" />
    </el-row>
  </div>
</template>
<script>
import Each from "./each.vue";
export default {
  components: {
    Each
  },
  props:{
    total:{
      type:Number,
      default:10
    },
    metaList:{
      type:Array
    }
  },
  data() {
    return {
        nav: [
        {
          key: "s-default",
          name: "智能排序",
          active: true
        },
        {
          key: "s-price",
          name: "价格最低",
          active: false
        },
        {
          key: "s-score",
          name: "人气最高",
          active: false
        },
        {
          key: "s-comment",
          name: "评价最高",
          active: false
        }
      ]
    };
  },
  methods:{
    orderRules(items){
    //  清除所有样式，显示点击样式
     this.nav.forEach(ele=>{
       ele.active = false;
     })
     items.active = true
    //数据排序
    switch (items.key) {
      case "s-price":
        this.metaList.sort((a,b)=>{
          return a.avgPrice - b.avgPrice
        })
        break;
      case "s-score" :
        this.metaList.sort((a,b)=>{
          return b.allCommentNum - a.allCommentNum
        })
        break;
      case "s-comment" :
      this.metaList.sort((a,b)=>{
        return b.avgScore - a.avgScore
      })
      break;
      case "s-default" :
      this.metaList.sort(()=>{
        return Math.random() * 0.5 - 0.5
      })
      break;
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/products/list.scss";
</style>