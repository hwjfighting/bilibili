import axios from 'axios'
import router from './src/router'
import Vue from 'vue'

//创建一个新的axios实例
const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})

//添加请求拦截器
http.interceptors.request.use(function(config) {
    // console.log(config) //ajax请求的一些具体信息

    if (localStorage.getItem('token') && localStorage.getItem('id')) {
        //如果本地存储了token 请求头中添加token 防止更改id获取到其他用户的信息
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config;
}, function(error) {

    return Promise.reject(error);
});


http.interceptors.response.use(function(response) {

    return response;
}, function(error) {
    if (error.response.status == 401 || error.response.status == 402) {
        router.push('/login')
        Vue.prototype.$msg.fail(error.response.data.message)
    }
    return Promise.reject(error);
});

export default http