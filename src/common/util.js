/**
 * Created by songyingchun on 2017/7/25 0025.
 */
export default {
    // 方法extend将参数defaults和参数opt合并，并且支持多个参数合并。如果最后一个参数为布尔true，支持深度拷贝。参数defaults为默认对象, 参数opt是被合并对象。
    extend: function (target, src) {
        var args = Array.prototype.slice.call(arguments),
            len = args.length,
            deep, applyParam = [target];

        if (len === 1) {
            return target;
        }
        // 如果最后的参数是布尔值，则从参数数组args中删除。设置为数组applyParam的第三个元素
        if (typeof (deep = args[len - 1]) === 'boolean') {
            args.pop();
            applyParam[2] = deep;
        }
        // 参数数组args删除目标对象，此时args中剩下只有源对象(被合并的对象)，获取源对象的个数
        args.shift();
        len = args.length;

        if (len > 1) {       // 如果源对象个数大于1, 遍历args，将源对象设置为数组applyParam的第二个元素，再次调用this.extend(target, src, deep);
            for (var i = 0; i < len; i++) {
                applyParam[1] = args[i];
                this.extend.apply(null, applyParam);
            }
        } else {
            for (var key in src) {           // 遍历源对象src, 检测它的自定义属性key。如果deep为true，表示支持拷贝对象最底层的属性值，并且key值为对象，调用this.extend(target, src, deep)方法。否则将源对象属性/值深度拷贝到目标对象上。
                if (src.hasOwnProperty(key)) {
                    if (deep === true && Object.prototype.toString.call(src[key]) === '[object Object]') {
                        this.extend(target, src[key], true);
                    } else {
                        target[key] = src[key];
                    }
                }
            }
        }
        return target;
    },

    parseUrl: function (url) {
        if (url.indexOf("?") < 0) {
            return {};
        }
        url = url.substr(url.indexOf("?") + 1);

        if (!url) {
            return {};
        }

        var list = url.split(/&|#/),
            item, prop = {};

        for (var i = 0, l = list.length; i < l; i++) {

            item = list[i].split('=');
            prop[item[0]] = item[1];
        }

        return prop;
    },

    getUrlParam: function (url, key) {
        return this.parseUrl(url)[key];
    },

    setUrlParams: function (url, key, value) {
        var hasSymbol, origin = url, prop = {},
            symbol = '?';

        hasSymbol = ~url.indexOf('?');

        if (hasSymbol) {
            url = url.match(/(.+?)\?/)[1];
        }

        if (typeof key === 'string') {
            prop[key] = value;
        }

        if (typeof key === 'object') {
            prop = key;
        }

        if (Object.prototype.toString.call(prop) === '[object Object]') {

            target = this.parseUrl(origin);

            prop = this.extend(target, prop);

            for (var i in prop) {
                if (prop.hasOwnProperty(i)) {
                    hasSymbol = ~url.indexOf('?');

                    if (hasSymbol) {
                        symbol = '&';
                    }

                    url += symbol + i + '=' + prop[i];
                }
            }
        }

        return url;
    },

    checkUrlParam: function (str) {
        return window.location.href.indexOf(str) > -1;
    },

    checkConnect: function () {
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {type: 'unknown'};
        var type_text = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'none'];

        if (typeof(connection.type) == "number") {
            connection.type_text = type_text[connection.type];
        } else {
            connection.type_text = connection.type;
        }
        if (typeof(connection.bandwidth) == "number") {
            if (connection.bandwidth > 10) {
                connection.type = 'wifi';
            } else if (connection.bandwidth > 2) {
                connection.type = '3g';
            } else if (connection.bandwidth > 0) {
                connection.type = '2g';
            } else if (connection.bandwidth == 0) {
                connection.type = 'none';
            } else {
                connection.type = 'unknown';
            }
        }
        return connection.type;
    },

    regexp: {
        phone: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
        password: /^[a-zA-Z0-9_]{6,15}$/,
        company: /^[\u4e00-\u9fa5]{1,19}$/,
    },

    setCookie: function (name,value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();
    },

    getCookie: function (name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) {
            return arr[2];
        }else {
            return null;
        }
    },

    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    },

    loadDataTime: 750,

    timeout: 10000,

    tips: {
        readProtocol: '请阅读《搜石网用户注册协议》',
        loginSuccess: '登录成功',
        submitSuccess: '提交成功',
        submitFail: '提交失败',
        emptyUserName: '请输入用户名',
        emptyContact: '请输入联系人',
        emptyPhone: '请输入手机号',
        emptyPassword: '请输入密码',
        emptyCode: '请输入验证码',
        emptyCompanyName: '请输入公司名',
        emptyName: '请输入姓名',
        emptyStreet: '请输入街道',
        emptyOldPassword: '请输入原密码',
        emptyNewPassword: '请输入新密码',
        correctPhone: '请输入正确的手机号',
        atLeastSixPhoneNumber: '密码至少6位字符',
        comprisePassword: '密码由字母，数字，下划线组成',
        differentPassword: '两次输入密码不一致',
        errorPhoneOrUserName: '用户名或密码错误',
        errorConnect: '网络或者服务出错，请稍后再试',
        loadingFail: '没有网络，加载失败',
        unLoginUser: '请先登录',
        deleteSuccess: '删除成功',
        selectProvince: '请选择省份',
        selectCity: '请选择地级市',
        please: '功能暂未开放，敬请期待',
        templateNumber: '请填写样板数量',
        uploadPicOrWriteTemplate: '请上传图片或填写品种',
        chooseAddress: '请选择收货地址'
    }
}