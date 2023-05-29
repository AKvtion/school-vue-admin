<!--
 * @Descripttion: 越努力越幸运
 * @version: 0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-16 09:32:29
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-05-29 16:43:36
-->
<template>
    <div class="demo-image__placeholder">
        <div class="block">
            <div>
                <el-row :gutter="10">
                    <el-col :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="grid-content bg-purple">
                            <el-image :src="src">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                    </el-col>
                    <el-col :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="grid-content bg-purple-light">
                            <div class="data-view">
                                <el-card>
                                    <div id="main"></div>
                                </el-card>
                                <el-card>
                                    <div id="main2"></div>
                                </el-card>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-row
                    :gutter="10"
                    style="padding: 20px,margin: 30px;margin: bottom 2px;"
                >
                    <el-col :sm="8" :md="8" :lg="8">
                        <div class="grid-content bg-purple">
                            <h2>智慧校园后台平台</h2>
                            <p>
                                <b>当前版本:</b> <span>v{{ version }}</span>
                            </p>
                            <p>
                                <el-tag type="danger">&yen;免费开源</el-tag>
                            </p>
                            <p>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    icon="el-icon-cloudy"
                                    plain
                                    @click="goTarget('#')"
                                    >访问Github</el-button
                                >
                            </p>
                        </div>
                    </el-col>
                    <el-col
                        :sm="8"
                        :md="8"
                        :lg="8"
                        :xl="8"
                        style="text-align: center"
                    >
                        <div class="grid-content bg-purple-light">
                            <el-row>
                                <el-col :sm="12" :md="12">
                                    <h2 style="text-align: center">技术选型</h2>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :sm="6" :md="6">
                                    <ul>
                                        <h4>后端技术</h4>
                                        <br />
                                        <hr />
                                        <li>SpringBoot</li>
                                        <li>Sa-token</li>
                                        <li>Mybatis-PLus</li>
                                        <li>Mysql</li>
                                        <li>Hutool</li>
                                    </ul>
                                </el-col>
                                <el-col :sm="6" :md="6">
                                    <ul>
                                        <h4>前端技术</h4>
                                        <br />
                                        <hr />
                                        <li>Vue</li>
                                        <li>Vuex</li>
                                        <li>Element-ui</li>
                                        <li>Axios</li>
                                        <li>Echarts</li>
                                    </ul>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :sm="8" :md="8" :lg="8" :xl="8">
                        <div class="grid-content bg-purple">
                            <el-row>
                                <el-col :sm="12" :md="12">
                                    <h2 style="text-align: center">联系信息</h2>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :sm="12" :md="12">
                                    <p>
                                        <i class="el-icon-s-promotion"></i>
                                        官网：<el-link
                                            href="http://fauchard.top"
                                            target="_blank"
                                            >http://fauchard.top</el-link
                                        >
                                    </p>
                                    <p>
                                        <i class="el-icon-s-flag"></i>
                                        邮箱：<el-link
                                            href="ifauchard@163.com"
                                            target="_blank"
                                            >ifauchard@163.com</el-link
                                        >
                                    </p>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { dataView, dataView2 } from '@/api/sys/home'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            // 版本号
            version: '1.0.0',
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
    },
    created() {
        // 压力图表的绘制
        dataView().then(res => {
            if (res.data.code === 200) {
                let result = 20
                this.draw(result)
            }
        }).catch(err => {
            throw err
        })

        // 玫瑰花图表的绘制
        dataView2().then(res => {
            if (res.data.code === 200) {
                // let result = res.data.data.series
                let result = 20
                this.draw2(result)
            }
        }).catch(err => {
            throw err
        })
    },

    methods: {
        goTarget(href) {
            window.open(href, '_blank')
        },
        draw(result) {
            console.log('result :>> ', result)
            let chartDom = document.getElementById('main')
            let myChart = echarts.init(chartDom)
            let option = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: '数量',
                        type: 'gauge',
                        progress: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value}'
                        },
                        data: [
                            {
                                // value: result.value,
                                value: 20,
                                name: '统计用户数量'
                            }
                        ]
                    }
                ]
            }
            myChart.setOption(option)
        },
        draw2(result) {
            console.log('result', result.value)
            let chartDom2 = document.getElementById('main2')
            let myChart2 = echarts.init(chartDom2)
            let option = {
                title: {
                    text: '统计每个班级的数量',
                    subtext: 'Fake Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: '数量',
                        type: 'pie',
                        radius: [70, 140],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: [{ value: 40, name: '计算机科学' },
                            { value: 38, name: '软件工程' },
                            { value: 32, name: '物联网' }
                        ]
                    }
                ]
            }

            result.forEach((item) => {
                option.series[0].data.push({
                    name: item.name,
                    value: item.value
                })
            })
            myChart2.setOption(option)
        }
    }
}
</script>

<style scoped>
.grid-content {
    border: 1px solid #ccc; /* 添加边框 */
    text-align: center; /* 文字居中 */
    margin-bottom: 20px; /* 设置间隔 */
    padding: 10px; /* 设置内边距 */
}
ul {
    border: 1px solid #ccc; /* 增加边框 */
    padding: 10px; /* 设置内边距 */
    margin: 10px;
}

.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.el-card {
    width: 50%;
}
#main {
    height: 500px;
}
#main2 {
    height: 500px;
}
</style>
