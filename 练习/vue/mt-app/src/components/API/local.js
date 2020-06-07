import axios from "axios"
let api = {
    getGoodsList(){
        return axios.get("http://localhost:8080/data/goodList.json")
    },
    getFavorite(){
        return axios.get("http://localhost:8080/data/favorite.json")
    }
}
export default api;