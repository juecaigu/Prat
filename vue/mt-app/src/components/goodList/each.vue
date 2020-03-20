<template>
  <!-- 每个产品的列表 -->
  <div>
    <dl class="s-item">
      <dt>
        <img :src="meta.frontImg" alt="图片" />
      </dt>
      <dd>
        <h3>
          <router-link :to="{name:'productDetail'}">{{ meta.title }}</router-link>
        </h3>
        <p>
          <el-rate
            v-model="meta.avgScore"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
            <span>{{ pingji }}</span>
            <span class="s-item-comment-total">{{meta.allCommentNum}}人评论</span>
        </p>
        <p>
           <span class="s-item-addr">{{meta.address}}</span>
        </p>
        <p>
            <span class="s-item-price">
              人均￥{{meta.avgPrice}}
          </span>
        </p>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: ["meta"],
  data() {
    return {
      value: null
    };
  },
  computed:{
      pingji(){
          const score = this.meta.score
          switch(true){
              case score > 4.5 : return "很好"
              break;
              case score > 4 : return "好"
              break;
              case score > 3.5 : return "不错"
              break;
              case score > 3 : return "一般"
              break;
              default : return "差"
          }
      }
  },
};
</script>