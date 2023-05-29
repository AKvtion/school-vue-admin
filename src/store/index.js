/*
 * @Descripttion: 越努力越幸运
 * @version: 0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-16 09:32:29
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-05-25 16:43:27
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import modules from './modules'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
})
