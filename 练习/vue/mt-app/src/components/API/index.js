//添加方法，获取数据
import axios from "../../axios.js"

let api = {
    getSearchList(){
        return axios.get("/api/meituan/header/search.json")
    },
    getsearchHotWords(){
        return axios.get("/api/meituan/header/searchHotWords.json")
    },
    getNav(){
        return axios.get("/api/meituan/index/nav.json")
    },
    resultsByKeywords(){
        return axios.get("/api/meituan/index/resultsByKeywords.json")
    },
    getCityList(){
        return axios.get("/api/meituan/city/hot.json")
    },
    getProvinceList(){
        return axios.get("/api/meituan/city/province.json")
    },
    getRecentsList(){
        return axios.get("/api/meituan/city/recents.json")
    },
    getRecommend(){
        return axios.get("/api/meituan/list/recommend.json")
    },
    getClassify(){
        return axios.get("/api/meituan/list/classify.json")
    },
    getAreaList(){
        return axios.get("/api/meituan/list/areaList.json")
    },
    getDetail(){
        return axios.get("/api/meituan/product/detail.json")
    }
}

export default api;
