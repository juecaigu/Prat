<template>
  <div class="m-istyle">
    <dl @mouseover="over" :class="navList.class">
      <dt>{{ navList.title }}</dt>
      <dd
        v-for="(item,index) in navList.list"
        :key="index"
        :data-type="item.tab"
        :class="{active:kind === item.tab }"
      >{{ item.text }}</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item,index) in menuList[kind]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" alt="图片" />
          <div class="cbody">
            <p class="title">{{ item.title }}</p>
            <p class="sub-title">{{ item.subTitle }}</p>
            <div class="price-info">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">￥</span>
                <span class="current-price numfont">{{ item.price }}</span>
              </span>
              <span class="sold bottom-right-info">{{ item.address }}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
import api from "../API/index.js";
export default {
  props: ["navList"],
  data() {
    return {
      kind: "all",
      menuList: {}
    };
  },
  mounted() {
    api.resultsByKeywords().then(res => {
      console.log(res)
      res.data.data.movie = res.data.data.food;
      res.data.data.travel = res.data.data.all;
      this.menuList = res.data.data;
    });
  },
  methods: {
    over(e) {
      let dom = e.target;
      let tagName = dom.tagName.toLowerCase();
      if (tagName !== "dd") {
        return;
      }
      this.kind = dom.getAttribute("data-type");
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>