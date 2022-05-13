export function validateAccount(rule, value, callback, test, test1, test2) {
    if (!(checkPhone("+86" + value) || checkEmail(value))) {
        value || callback(new Error("账号不能为空"))
        callback(new Error("手机/邮箱 格式错误"))
    }
    callback()
}

export function validatePassword(rule, value, callback) {
    if (!checkPassword(value)) {
        value || callback(new Error("密码不能为空"))
        callback(new Error("密码需同时包含字母和数字，至少 8 个字符"))
    }
    callback()
}

export function validatePhone(rule, value, callback) {
    if (!checkPhone("+86" + value)) {
        value || callback(new Error("手机号不能为空"))
        callback(new Error("手机号格式错误"))
    }
    callback()
}

export function validateCode(rule, value, callback) {
    if (!checkCode(value)) {
        value || callback(new Error("验证码不能为空"))
        callback(new Error("验证码为6位数字"))
    }
    callback()
}

export function validateEmail(rule, value, callback) {
    if (!checkEmail(value)) {
        value || callback(new Error("邮箱不能为空"))
        callback(new Error("邮箱格式错误"))
    }
    callback()
}

function checkCode(value) {
    return value.match("^[0-9]{6}$")
}

function checkPhone(value) {
    return value.match("^\\+[1-9]?[0-9]{7,14}$")
}

function checkEmail(value) {
    return value.match("^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
}

function checkPassword(value) {
    return value.match("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$")
}