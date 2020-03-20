import axios from "axios";
//全局添加数据
axios.defaults.baseURL = "http://open.duyiedu.com"
//数据发送前要添加一下appkey等数据------拦截器
axios.interceptors.request.use(function(config){
    //数据请求之前添加appkey
    config.params = {
        ...config.params,
        appkey:"duyi1672_1580709751455"
    }
    return config;
},function(error){
    return Promise.reject(error);
})

export default axios
