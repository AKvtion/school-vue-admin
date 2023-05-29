/*
 * @Descripttion: 越努力越幸运
 * @version: 0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-16 09:32:29
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-05-28 16:00:54
 */
import Vue from 'vue'
import App from '@/App'
import store from '@/store/index'
import router from '@/router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import axios from './config/httpConfig'
import * as globalFilter from './filters/filters'
import '@/icons'

import echarts from 'echarts'

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

for (var key in globalFilter) {
    Vue.filter(key, globalFilter[key])
}

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (!store.state.UserToken) {
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})

router.afterEach((to, from, next) => {
    var routerList = to.matched
    store.commit('setCrumbList', routerList)
    store.commit('permission/SET_CURRENT_MENU', to.name)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
