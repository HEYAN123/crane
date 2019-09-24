// https://github.com/YvetteLau/Blog/issues/7

// new动作四部曲
// 1 创建一个新对象
// 2 原型链接
// 3 this指向这个新对象并调用
// 4 返回调用结果或者新对象


function myNew(fn) {
    var target = {};
    target.__proto__ = fn.prototype;
    var res = fn.call(target);
    if(typeof res === 'object' || typeof res === 'function') {
        return res;
    }
    return target;
}
