const template = `
<div class = "pageList">
    <span @click="changePage(1)" :class="{disabled:value === 1}">首页</span>
    <span @click="changePage(value - 1)" :class="{disabled:value === 1}">上一页</span>
    <span @click="changePage(item)" v-for="item in pageNumber" :class="{active : item === value }">{{ item }}</span>
    <span @click="changePage(value + 1)" :class="{disabled:value === totalPage}">下一页</span>
    <span @click="changePage(totalPage)" :class="{disabled:value === totalPage}">尾页</span>
    <i>{{ value }}</i>/
    <i>{{ totalPage }}</i>
</div>
`

export default{
    template,
    props:{
        value:{
            type:Number,
            default:1
        },
        totalNumber:{
            required:true,
            type:Number
        },
        pageSize:{
            default:10,
            type:Number,
        },
        paleNumber:{
            type:Number,
            default:5
        }
    },
    computed:{
        totalPage(){
            return Math.ceil(this.totalNumber / this.pageSize)
        },
        pageNumber(){
            let arr = [];
            let min = this.value - Math.floor(this.paleNumber / 2);
            let max = min + this.paleNumber - 1;
            if (min < 1){
                min = 1
            };
            if(max > this.totalPage){
                max = this.totalPage
            } 
            for(let i = min;i <= max ; i++ ){
                arr.push(i);
            };
            return arr
        },
    },
    methods:{
        changePage(newPage){
            if(newPage < 1 ){
                newPage = 1;
            }else if(newPage > this.totalPage){
                newPage = this.totalPage
            }
            // this.value = newPage
            //触发事件,抛出去给监听器
            this.$emit("input",newPage)
        }
    }
}