import axios from '@/config/httpConfig'

// 获取用户列表
export function getUserList() {
    return axios.get('/user/list')
}
// 新增用户角色
export function addUser(data) {
    return axios.post('/user', data)
}

// 删除用户角色
export function delUser(id) {
    return axios.del(`/user?id=${id}`)
}