import App from "./app.js"
import router from "./router.js"

new Vue({
    template:"<App />",
    components:{
        App,  
    },
    el:"#app",
    router,
})