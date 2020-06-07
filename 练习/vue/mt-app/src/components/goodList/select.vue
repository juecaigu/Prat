<template>
    <!-- 筛选列表 -->
    <div class = "m-product-select">
        <dl class = "tab"> 
            <dt>
                {{ selectData }}
                <i class="el-icon-caret-bottom"></i>
            </dt>
            <dd>
                <dl>
                     <dt class = "select-title">{{ name }}</dt>
                    <span v-for="(item,index) in list" :key="index"
                        @click="changeName(item.name)"    
                    >
                        {{ item.name }}
                    </span>
                </dl>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    props:["name","list"],
    data(){
        return {
            selectData:this.name,
        }
    },
    methods:{
        changeName(item){
            this.selectData = item;
        }
    }
}
</script>