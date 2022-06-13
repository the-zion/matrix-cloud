export function validateAccount(rule, value, callback) {
    if (!(checkPhone(value) || checkEmail(value))) {
        value || callback(new Error("账号不能为空"))
        callback(new Error("手机/邮箱 格式错误"))
    }
    callback()
}

export function validatePassword(rule, value, callback) {
    if (!checkPassword(value)) {
        value || callback(new Error("密码不能为空"))
        callback(new Error("至少1个大写字母，1个小写字母和1个数字，长度 8-20"))
    }
    callback()
}

export function validatePhone(rule, value, callback) {
    if (!checkPhone(value)) {
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

export function checkPhone(value) {
    return value.match("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$")
}

export function checkCode(value) {
    return value.match("^[0-9]{6}$")
}

export function checkEmail(value) {
    return value.match("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*")
}

export function checkPassword(value) {
    return value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\s\\S]{8,16}$")
}