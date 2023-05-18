/*
 * @Descripttion: 越努力越幸运
 * @version: 0.1
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-05-18 10:18:33
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-05-18 10:18:46
 */
// 用户名匹配
export function nameRule(rule, value, callback) {
    //  请输入4-10位昵称
    let reg = /(^[a-zA-Z0-9]{4,10}$)/;
    if (value === '') {
        callback(new Error('请输入用户名'));
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位用户名'));
    } else {
        callback();
    }
}

// 密码正则匹配
export function passRule(rule, value, callback) {
    //   6-12位密码需要包含大小写字母和数字以及特殊符号 /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    let pass = /^\d+$/ 
    if (value === '') {
        callback(new Error('请输入密码'));
    } else if (!pass.test(value)) {
        callback(new Error('6-12位密码需要包含大小写字母和数字及特殊符号'));
    } else {
        callback();
    }
}