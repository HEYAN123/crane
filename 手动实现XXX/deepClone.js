// 简单版
function deepClone(obj) {
    if(obj === null)  return null;
    if(obj instanceof RegExp) return new RegExp(obj);
    if(ibj instanceof Date) return new Date(obj);
    if(typeof obj !== 'object') {
        // 如果是基本类型，直接返回
        return obj;
    }
    // 执行对象的构造函数，生成一个新的同类型空对象
    let t = new obj.constructor();
    for(let k in obj) {
        t[k] = deepClone(obj[k]);
    }
    return t;
}

// 加强版

function deepClone(parent) {
    // 判断obj的类型是不是type
    const isType = (obj, type) => {
        if(typeof obj !== 'object') return false;
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch(type) {
            case "Array":
                flag = typeString === "[object Array]";
                break;
            case "Date":
                flag = typeString === "[object Date]";
                break;
            case "RegExp":
                flag = typeString === "[object RegExp]";
                break;
            default:
                flag = false;
        }
        return flag;
    }

    // 处理正则
    const getRegExp = re => {
        var flags = "";
        if(re.global) flags += "g";
        if(re.ignoreCase) flags += "i";
        if(re.multiline) flags += "m";
        return flags;
    }

    // 维护两个存储循环引用的数组
    const parents = [];
    const children = [];
    // 真正调用的克隆函数
    const main = parent => {
        if(parent === null) return null;
        if(typeof parent !== object) return parent;
        let child, proto;
        if(isType(parent, "Array")) {
            child = [];
        } else if(isType(parent, "RegExp")) {
            child = new RegExp(parent.source, getRegExp(parent));
            if(parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if(isType(parent, "Date")) {
            child = new Date(parent.getTime());
        } else {
            // 得到对象的原型
            proto = Object.getPrototypeOf(parent);
            // 根据原型创建对象
            child = Object.create(proto);
        }
        // 处理循环引用
        const index = parents.indexof(parent);
        if(index != -1) {
            return children[index];
        }
        parents.push(parent);
        children.push(child);
        for(let i in parent) {
            child[i] = main(parent[i]);
        }
        return child;
    };
    return main(parent);
}