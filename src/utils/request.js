import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 5000
})

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    config.headers['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlNmVjM2E1ZmVmNTA0ZTZlYTgzMzhmOGM0ZjI1ZWM5MSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY1ODgyMTgzOCwiZXhwIjoxNjU4ODI1NDM4fQ.V-woP4NLyWCTjkXR1QYBW2wPWnL5utJ-4GMbumRqlFg';
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


