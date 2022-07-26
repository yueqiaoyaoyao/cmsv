import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 5000
})

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.headers['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5MzUyODhiZTg1MzQ0ZGY1OTg0ZTA3NWU5NjA1ZDdiZCIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY1ODgzODgzNSwiZXhwIjoxNjU4ODQyNDM1fQ.adSUgwO2QNiAUg5zPEVjNqoTRFW-pjYDDhi0XjZybas'
    let token;
    token =  localStorage.getItem('token')
    if(token != null || token === ""){
        config.headers['token'] = token
    }
    return config
}, error => {
    return Promise.error(error)
})

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request


