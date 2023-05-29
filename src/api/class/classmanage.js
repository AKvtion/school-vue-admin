/*
 * @Descripttion: 越努力越幸运
 * @version: 0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-25 15:26:52
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-05-25 18:16:48
 */
import axios from '@/config/httpConfig'

// 获取班级列表
export function getClassList() {
    return axios.get('/class')
}

// 新增班级
export function addClassList(data) {
    return axios.post('/class', data)
}

// 修改班级
export function updateClassList(data) {
    return axios.post('/class/update', data)
}

// 删除班级
export function delClassList(id) {
    return axios.del(`/class?id=${id}`)
}
