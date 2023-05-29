import axios from '@/config/httpConfig'

// 获取用户列表
export function getUserList() {
    return axios.get('/user/list')
}