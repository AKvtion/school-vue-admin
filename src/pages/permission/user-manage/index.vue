<!--
 * @Descripttion: 越努力越幸运
 * @version:0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-16 09:32:29
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-06-04 11:27:02
-->
<template lang="html">
<el-card class="box-card">
    <div class="search-bar">
        <el-form :inline="true" :model="searchData" class="fl">
            <el-input style="display: none;"></el-input>
            <el-form-item label="登录名称">
        <el-input v-model="searchData.username" placeholder="登录名称" @keyup.enter.native="onSearch()"></el-input>
        </el-form-item>
        </el-form>
    <div class="fl">
        <el-button type="text" @click="handleReset">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
    </div>
    </div>
    <div  class="tools-bar">
    <el-button type="success" icon="el-icon-plus" size="small" @click="addData">新增用户</el-button>
    </div>
    <div>
    <el-table
        v-loading.body="tableLoading"
        ref="singleTable"
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column
            type="index"
            width="60">
        </el-table-column>
        <el-table-column
            prop="status"
            label="停用/启用"
            align="center"
            min-width="100">
            <template slot-scope="scope">
        <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                active-text=""
                inactive-text=""
                @change="handleStatus(scope.row)">
            </el-switch>
        </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="登录名"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="roleList"
            :formatter="roleFormatter"
            min-width="180"
            label="权限">
        </el-table-column>
        <el-table-column
            prop="email"
            label="电子邮箱"
            width="200">
        </el-table-column>
    <el-table-column
        label="操作"
        fixed="right"
        width="190">
        <template slot-scope="scope">
    <div>
        <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
        >
        <el-button
            type="primary"
            size="mini"
            @click="handleResetPwd(scope.$index, scope.row)"
            >重置密码</el-button
        >
        <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="del(scope.row)"
            v-if="arr.indexOf('user.del') > -1"
        ></el-button>
    </div>
</template>
        </el-table-column>
    </el-table>
    <div class="pagination-bar">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecord">
        </el-pagination>
    </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="onDialogClose()"
    >
            <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="80px">
                <el-form-item
                    label="用户名"
                    prop="username"
                >
                    <el-input
                        v-model="dataForm.username"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色选择" prop="type">
                    <el-select v-model="dataForm.type" placeholder="请选择角色">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="教师用户" value="1"></el-option>
                        <el-option label="学生用户" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="用户角色">
                    <el-select v-model="dataForm.tempRoleIds" multiple placeholder="请选择" style="width: 100%;">
                        <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.type"
                            prop="type">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item
                    label="密码"
                    prop="password"
                >
                    <el-input
                        type="password"
                        v-model="dataForm.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="电子邮箱"
                    prop="email"
                >
                <el-input
                        v-model="dataForm.email"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="submitForm('dataForm')">立即创建</el-button> -->
            <el-button type="success" @click="onDialogSubmit('dataForm')" v-if="dialogTitle=='修改用户信息'">保存</el-button>
            <el-button type="primary" @click="onDialogSubmit('dataForm')" v-else>立即创建</el-button>
        </div>
    </el-dialog>
</el-card>
</template>
<script>
import { getUserList, addUser, delUser } from '@/api/sys/usermanage'
import moment from 'moment'
import modules from '@/store/modules'
export default {
    data() {
        return {
            arr: [],
            totalRecord: 0,
            pageSize: 10,
            tableLoading: false,
            dialogVisible: false,
            dialogTitle: '新增用户',
            roles: [
                {
                    id: 1,
                    roleName: '超级管理员',
                    type: '0'
                },
                {
                    id: 2,
                    roleName: '教师用户',
                    type: '1'
                },
                {
                    id: 3,
                    roleName: '学生用户',
                    type: '2'
                }
            ],
            defaultTreeProps: {
                children: 'childPermList',
                label: 'permissionName'
            },
            rules: {
                username: [ { required: true, message: '登录名不能为空', trigger: 'blur' },
                    { min: 1, max: 10, message: '登录名长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [ { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '登录名长度在 1 到 20 个字符', trigger: 'blur'
                    }
                ],
                email: [ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur, change' }
                ],
                type: [
                    { required: true, message: '请选择用户角色', trigger: 'change' }
                ]
            },
            searchData: {
                username: ''
            },
            dataForm: {
                id: '',
                username: '',
                password: '',
                type: '',
                email: ''
                // tempRoleIds: [],
                // roleIds: '',
            },
            tableData: []
        }
    },
    created() {
        this.initList()
    },
    methods: {
        async initList() {
            const data = await getUserList()
            this.arr = modules.permission.state.psl
            this.tableData = data
        },
        handleStatus(row) {},
        statusFormat(row, column, cellValue) {
            return { 0: '停用', 1: '启用' }[cellValue] || ''
        },
        onDialogClose() {
            this.dataForm.tempRoleIds = []
            this.$refs.dataForm.resetFields()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.onSearch()
        },
        handleCurrentChange(val) {
            this.onSearch({ pageNumber: val })
        },
        handleReset() {
            this.searchData = {
                username: ''
            }
            this.onSearch()
        },
        onSearch({ pageNumber = 1 } = {}) {},
        toDateTime(row, column, cellValue) {
            return cellValue
                ? moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
                : ''
        },
        roleFormatter(row, column, cellValue) {
            let result = []
            if (
                typeof row.erpMemberRoles === 'object' &&
                row.erpMemberRoles.length > 0
            ) {
                for (let item of row.erpMemberRoles) {
                    result.push(item.description)
                }
            }
            return result.join('，')
        },
        handleChangeStatus(index, row) {},
        handleResetPwd(index, row) {
            this.$confirm('确认重置该用户的登录密码？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {})
        },
        handleEdit(index, row) {
            this.dialogVisible = true
            this.dialogTitle = '修改用户信息'
            this.dataForm.tempRoleIds = []
            for (let x of Object.keys(this.dataForm)) {
                if (
                    x === 'tempRoleIds' &&
                    typeof row.roleList === 'object' &&
                    row.roleList.length > 0
                ) {
                    for (let item of row.roleList) {
                        this.dataForm.tempRoleIds.push(item.id)
                    }
                } else {
                    this.dataForm[x] = row[x]
                }
            }
        },
        onDialogSubmit(dataForm) {
            console.log('dataForm :>> ', this.dataForm)
            this.$refs[ dataForm ].validate((valid) => {
                if (valid) {
                    addUser(this.dataForm).then((res) => {
                        console.log('this.dataFrom :>> ', res)
                        console.log('addUser :>> ', this.dataForm)
                        this.initList()
                        this.dialogVisible = false
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        })
                    })
                }
            })
        },
        sure() {
            // if (this.state) {
            addUser(this.dataForm).then((res) => {
                console.log('addUser :>> ', this.dataForm)
                this.initList()
                this.dialogVisible = false
                this.$message({
                    message: '新增成功',
                    type: 'success'
                })
            })
            // } else {
            // }
        },
        del(row) {
            console.log(row)
            this.$alert('你确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                    delUser(row.id).then((res) => {
                        this.initList()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    })
                }
            })
        },
        addData() {
            this.dataForm = {
                id: '',
                username: '',
                password: '',
                tempRoleIds: [],
                type: '',
                email: ''
            }
            this.dialogTitle = '新增用户'
            this.state = true
            this.dialogVisible = true
        },
        editData() {
            this.dialogTitle = '修改用户'
            this.state = false
            this.dialogVisible = true
        }
    }
}
</script>

<style lang="scss">
.fr {
    float: right;
}
.fl {
    float: left;
}
.search-bar {
    overflow: hidden;
}
.tools-bar {
    margin-bottom: 20px;
}
</style>
