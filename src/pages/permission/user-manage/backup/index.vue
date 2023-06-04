<!--
 * @Descripttion: 越努力越幸运
 * @version:0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-16 09:32:29
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-06-03 11:28:13
-->
<template>
    <div class="public">
        <!-- 查询、重置 -->
        <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            size="small"
        >
            <el-form-item label="用户">
                <el-input
                    v-model="formInline.name"
                    placeholder="请输入用户名查询"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="find" round>查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="addData" round
                    >新增</el-button
                >
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="reset" round>重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 1: 1-10 2: 11-20 slice((当前页数 - 1)*每页条数, 当前页数*当前条数)-->
        <!-- <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%"> -->
        <el-table :data="compData" border style="width: 100%">
            <el-table-column label="序号" width="50px" align="center">
                <template slot-scope="scope">
                    {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="id" label="序号" align="center">
          </el-table-column> -->
            <el-table-column
            prop="username"
            label="用户名"
            align="center">
            </el-table-column>
            <el-table-column
                prop="password"
                width="200px"
                label="密码"
                align="center"
            >
            </el-table-column>
            <el-table-column
              prop="roleList"
              :formatter="roleFormatter"
              min-width="210"
              label="角色">
            </el-table-column>
            <el-table-column
                prop="email"
                width="250px"
                label="电子邮箱"
                align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- 编辑按钮 -->
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-edit"
                        @click="edit(scope.row)"
                        v-if="arr.indexOf('class.update') > -1"
                    ></el-button>
                    <!-- 删除按钮 -->
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="del(scope.row)"
                        v-if="arr.indexOf('class.del') > -1"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗 -->
        <el-dialog
            :title="state ? '添加用户信息' : '修改用户信息'"
            :visible.sync="dialogFormVisible"
            width="900px"
        >
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item
                    label="用户"
                    :label-width="formLabelWidth"
                    prop="username"
                >
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    :label-width="formLabelWidth"
                    prop="password"
                >
                    <el-input
                        type="password"
                        v-model="form.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="电子邮箱"
                    :label-width="formLabelWidth"
                    prop="email"
                >
                    <el-input
                        v-model="form.email"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfo('form')">取 消</el-button>
                <el-button type="primary" @click="sure('form')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <!-- 底部分页 :page-size="pageSize" -->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[5, 10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>
<script>
import { getUserList, addUser } from '@/api/permission'

import modules from '@/store/modules'
export default {
    data() {
        return {
            arr: [],
            records: [],
            tableData: [],
            currentPage: 1, // 当前页数
            pageSize: 10, // 每页显示条数
            total: 0, // 总条数
            form: {
                id: '',
                username: '',
                password: '',
                type: '',
                email: ''
            },
            formInline: {
                name: ''
            },
            formLabelWidth: '80px',
            rules: {
                username: [{ required: true, message: '请输入用户' }],
                password: [{ required: true, message: '请输入密码' }],
                email: [{ required: true, message: '请输入邮箱' }]
            },
            state: true,
            dialogFormVisible: false
        }
    },
    created() {
        this.getData()
    },
    computed: {
        compData() {
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            )
        }
    },
    methods: {
        edit(row) {
            console.log(row)
            this.form = { ...row }
            this.state = false
            this.dialogFormVisible = true
        },
        closeInfo(form) {
            console.log(form)
            this.$refs[form].resetFields()
            this.dialogFormVisible = false
        },
        find() {
            console.log(this.formInline)
            this.getDataOne(this.formInline)
        },
        reset() {
            console.log(this.formInline)
            this.formInline = {}
            this.getData(this.formInline)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.currentPage = 1
            this.pageSize = val
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
        },
        getDataOne(params) {
            // getDataOne (params).then((res) => {
            //     if (res.data.code === 200) {
            //         console.log('res.data.data :>> ', res.data.data)
            //         this.tableData = res.data.data.data
            //         this.total = res.data.data.data.total
            //     }
            // })
        },
        getData(params) {
            console.log('state :>> ', modules.permission.state.psl)
            this.arr = modules.permission.state.psl
            console.log('arr :>> ', this.arr)
            getUserList(params).then((res) => {
                console.log('getUserList :>> ', res)
                this.tableData = res.records
                this.total = res.total
                this.currentPage = res.current
                this.pageSize = res.size
                this.$message({
                    message: '查询成功',
                    type: 'success'
                })
            })
        },
        sure(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if (this.state) {
                        addUser(this.form).then((res) => {
                            console.log('addUser :>> ', res)
                            this.getData()
                            this.dialogFormVisible = false
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                        })
                    } else {
                        console.log('this.updateClassListForm :>> ', this.form)
                        // updateClassList(this.form).then((res) => {
                        //     this.getData()
                        //     this.dialogFormVisible = false
                        //     this.$message({
                        //         message: '修改成功',
                        //         type: 'success'
                        //     })
                        // })
                    }
                }
            })
        },
        del(row) {
            console.log(row)
            this.$alert('你确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                    delClassList(row.id).then((res) => {
                        this.getData()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    })
                }
            })
        },
        addData() {
            this.form = {
                name: '',
                grade: '',
                major: ''
            }
            this.state = true
            this.dialogFormVisible = true
        }
    }
}
</script>
<style lang="scss">
.public {
    .demo-form-inline,
    .el-form-item {
        text-align: left;
    }
    .el-pagination {
        text-align: left;
        margin-top: 20px;
    }
}
</style>
