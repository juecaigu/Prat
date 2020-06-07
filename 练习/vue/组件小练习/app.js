const template =`
    <div class = "header">
        <div class = "nav">
            <router-link to="/">首页</router-link>
            <router-link to="/movie">电影页</router-link>
        </div>
        <router-view></router-view>
    </div>
`

export default {
    template,
}
