import Movie from "../component/movie.js"
import movieService from "../servise/movieService.js"
import IsLoading from "../component/loading.js"

export default{
    template:
    `
        <div class = "data-container">
            <Movie v-if = "movie" :data="movie"/>
            <IsLoading v-show="isLoading" />
        </div>
    `,
    data(){
        return {
            movie:null,
            isLoading:false
        }
    },
    components:{
        Movie,
        IsLoading,
    },
    mounted(){
        this.isLoading = true;
        //获取id值，更改动态路由
        const id = this.$route.params.id;
        movieService.getMovie(id).then(resp => {
            this.movie = resp;
            console.log(resp)
            this.isLoading = false;
        })
    }
}