import Movie from "./movie.js"

const template = 
`<div class = "data-container">
    <Movie v-for="item in numbers" :key="item.id" :data="item"/>
</div>    
`

export default {
    template,
    components:{
        Movie
    },
    props:{
        numbers:{
            type:Array,
            default:()=>[]
        }
    }
}