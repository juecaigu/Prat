<template>
  <!--省份和城市选择组件-->
  <div
    :class="['choose-wrap', disabled?'disabled':'']"
    @click="showWrapper"
    v-document-click="documentClick"
  ><!--在main中定义的document事件在这边应用-->
    <div class="choose">
      <span>{{ value }}</span>
      <i class="el-icon-caret-bottom"></i>
      <div class="mt-content" :class="{'active':showWrapperActive}">
        <h2>{{ title }}</h2>
        <div :class="['wrapper', className]">
          <div class="col" v-for="(dataList,index) in renderList" :key="index">
          <span class="mt-item" 
          :class="{'active':item === value}"
          v-for="(item,i) in dataList" :key="i"
          @click="changeValue(item)"
          >{{ item }}</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "value","list","className","showWrapperActive","disabled"],
  data() {
    return {
    }
  },
  computed:{
    renderList(){
      //每列显示12个数据
      let col = Math.ceil(this.list.length / 12);
      let resultList = [];
      for(let i = 0;i<col;i++){
        let data = this.list.slice(i*12,i*12+12);
        resultList.push(data);
      }
      return resultList;
    }
  },
  methods: {
    showWrapper(e) {
      e.stopPropagation();
      this.$emit("change_active",true)
    },
    documentClick() {
     this.$emit("change_active",false)
    },
    changeValue(item){
      this.$emit("change",item)
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/changecity/select.scss";
</style>