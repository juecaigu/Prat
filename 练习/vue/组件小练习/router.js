import Home from "./page/index.js"
import Movie from "./page/moviePage.js"
import MovieDetails from "./page/movieDetails.js"

//配置路由
const router = new VueRouter({
    routes:[
        {path:"/",component:Home},
        {path:"/movie",component:Movie},
        //设置动态路由，后面的id值会挂到$route.params中
        {path:"/movie/:id",component:MovieDetails}
    ],
    mode:"hash"
})

export default router;