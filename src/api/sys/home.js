import axios from '@/config/httpConfig'

// 获取数据
export function dataView() {
    return axios.get('/user/count')
}

// 获取图表数据
export function dataView2() {
    return axios.get('/user/count')
}
