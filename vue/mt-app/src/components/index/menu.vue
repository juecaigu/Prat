<template>
  <!-- 菜单 -->
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,index) in menuList"
        :key="index"
        @mouseenter="menuEnter(item)"
      >
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="curList" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <template v-for="(item,index) in curList">
        <h4 :key="index">{{ item.title }}</h4>
          <span v-for="(v, i) in item.items" :key="v + '_'+ i">
            <router-link :to="{name:'goodList'}">
              {{v}}
            </router-link>
            </span>
      </template>
    </div>
  </div>
</template>
<script>
import api from "../API/index.js"
export default {
  data() {
    return {
      menuList: null,
      curList: null
    };
  },
  mounted(){
    api.getNav().then(res => {
      let result = [];
      for(let i = 0;i<5;i++){
        result = result.concat(res.data.data)
      }
      this.menuList = result;
    })
  },
  methods: {
    menuEnter(item) {
      this.curList = item.items;
    },
    menuLeave() {
        let self = this;
      this.timer = setTimeout(function() {
        self.curList = null;
      }, 500);
    },
    detailEnter() {
        clearTimeout(this.timer);
    },
    detailLeave() {
        this.curList = null;
    }
  }
};
</script>