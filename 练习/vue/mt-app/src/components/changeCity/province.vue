<template>
  <!-- 省份和城市-搜索组件 -->
  <div>
    <span class="name">按省份选择:</span>
    <!-- 引用selct组件 -->
    <MySelect
      :list="provinceList"
      title="省份"
      :value="province"
      class="province"
      :showWrapperActive="provinceActive"
      @change="changeProvince"
      @change_active="changeProvinceActive"
    />
    <MySelect
      :list="cityList"
      title="城市"
      :disabled="classDisabled"
      :value="city"
      class="city"
      :showWrapperActive="cityActive"
      @change="changeCity"
      @change_active="changeCityActive"
    />
    <span>直接搜索:</span>
    <!-- element-ui下拉框组件 -->
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in options" 
      :key="item.value" 
      :label="item.label"
      :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import MySelect from "./select.vue";
import api from "../API/index.js";
export default {
  components: {
    MySelect
  },
  data() {
    return {
      province: "省份",
      city: "城市",
      // 控制城市和省份标签的选择性
      provinceActive: false,
      cityActive: false,
      provinceList:[],
      cityList: [],
      classDisabled: true,
      options: [],
      list: [],
      states:[],
      value:[],
      loading: false,
      searchWord:[],
      states:["北京","上海","广州","南京","杭州","深圳"]
    };
  },
  created(){
    api.getProvinceList().then(res => {
      let newProvince = res.data.data.map((ele,index)=>{
        return ele.provinceName
      })
      this.provinceList = newProvince;
    })
  },
  mounted(){
    //下拉搜索框去匹配states里面的数据
    this.list = this.states.map(item => {
        return {label:item};
      });
  },
  methods: {
    changeProvince(item) {
      this.province = item;
      this.classDisabled = false;
      api.getProvinceList().then(res => {
      let newCity = res.data.data.filter((ele,index)=>{
        return ele.provinceName === this.province ;
      })
      let newCityList = newCity[0].cityInfoList.map(ele => {
        return ele.name;
      })
      this.cityList = newCityList
    })
    },
    changeCity(item) {
      this.city = item;
      //请求改变vuex里面的数据并跳转路由
      this.$store.commit("setPosition", item);
      this.$router.push({ name: "Index" });
    },
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      if (this.province !== "省份") {
        this.cityActive = flag;
        if (flag) {
          this.provinceActive = false;
        }
      }
    },
    remoteMethod(query){
      if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>