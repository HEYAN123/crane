// https://github.com/YvetteLau/Blog/issues/7

function myNew(func) {
    // 创建一个新对象
    let target = {};
    // 原型链接 实例的__proto__指向构造函数的prototype
    target.__proto__ = func.prototype;
    // this指向这个新对象
    let res = func.call(target);
    // 如果函数没有返回其他对象，那么new表达式中的函数调用后会返回这个新对象
    if(typeof res === 'object' || typeof res === 'function') {
        return res;
    }
    return target;
}