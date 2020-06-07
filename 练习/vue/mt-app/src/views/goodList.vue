<template>
  <div class="page-product">
    <el-row>
      <MyCrumb />
    </el-row>
    <el-row>
      <el-col :span="19">
        <el-row>
          <Category />
        </el-row>
        <el-row>
          <List ref="listCount" :metaList="metaList" :total="totalNum" />
        </el-row>
        <el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            @prev-click="prevClick"
            @next-click="nextClick"
            @current-change="currentChange"
            :total="totalNum"
          ></el-pagination>
        </el-row>
      </el-col>
      <el-col :span="5">
        <MyFavorite />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MyCrumb from "../components/goodList/crumb.vue";
import Category from "../components/goodList/category.vue";
import List from "../components/goodList/list.vue";
import MyFavorite from "../components/goodList/favorite.vue";
import api from "@/components/API/local.js";
export default {
  components: {
    MyCrumb,
    Category,
    List,
    MyFavorite
  },
  data() {
    return {
      totalNum: null,
      metaList: [],
      count: 0
    };
  },
  beforeCreate() {
    api.getGoodsList().then(res => {
      this.totalNum = Number(res.data.total);
      this.metaList = res.data.page[this.count].poiInfos;
    });
  },
  methods: {
    change(cur) {
      this.count = cur - 1;
      api.getGoodsList().then(res => {
        this.metaList = res.data.page[this.count].poiInfos;
      });
      //跳转到页面顶部
      window.scrollTo(0,0)
    },
    prevClick(cur) {
        this.change(cur)
    },
    nextClick(cur) {
        this.change(cur)
    },
    currentChange(cur) {
        this.change(cur)
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>