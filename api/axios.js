import axios from 'axios'
import config from '../config'

//在node中，有全局变量process表示的是当前的node进程。
//process.env包含着关于系统环境的信息，但是process.env中并不存在NODE_ENV这个东西。

//NODE_ENV是一个用户自定义的变量，在webpack中它的用途是判断生产环境或开发环境。
const baseUrl = process.env.NODE_ENV === 'devlopment' ? config.baseUrl.dev : config.baseUrl.pro;

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    interceptors(instance) {
        instance.interceptors.request.use(function(config) {
            // 在发送请求之前做些什么
            return config;
        }, function(error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function(response) {
            // 对响应数据做点什么
            // console.log(response);

            return response;
        }, function(error) {
            // 对响应错误做点什么
            console.log(error);

            return Promise.reject(error);
        });

    }
    request(options) {
        const instance = axios.create();
        options = {...this.getInsideConfig(), ...options }
        this.interceptors(instance);
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)