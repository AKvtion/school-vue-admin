/*
 * @Descripttion: 越努力越幸运
 * @version: 0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-23 18:47:20
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-05-23 18:47:37
 */
import axios from '@/config/httpConfig'

// 获取角色列表
export function getRoleList() {
    return axios.get('/role/list')
}
