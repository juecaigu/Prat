
import Pager from "../component/pager.js"
import MovieList from "../component/movieList.js"
// import moviesData from "./mockDatas.js"
import movieService from "../servise/movieService.js"
import IsLoding from "../component/loading.js"

export default {
    template:`<div>
        <MovieList :numbers="moviesData" />
        <Pager 
        :value="current" 
        :totalNumber="total" 
        :pageSize="pageSize" 
        @input="handleChange"
        />
        <IsLoding v-if="isLoading"/>
    </div>`,
    components:{
       Pager,
       MovieList,
       IsLoding,
    },
    mounted(){
        this.setMovie()
    },
    data(){
        return {
            moviesData:[],
            total:0,
            current:1,
            pageSize:5,
            isLoading:false
        }
    },
    computed:{
        pageMovies(){
            return this.moviesData.slice((this.current - 1)*this.pageSize,this.current * this.pageSize)
        }
    },
    methods:{
        setMovie(){
            this.isLoading = true;
            movieService.getMovies(this.current,this.pageSize).then(resp => {
                this.total = resp.total;
                this.moviesData = resp.datas;
                this.isLoading = false;
            }) 
        },
        handleChange(newPage){
            this.current = newPage;
            this.setMovie();
        }
    },
    
}
