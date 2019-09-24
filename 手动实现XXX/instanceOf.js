// 模拟instanceof方法


// 原理：找到R的原型对象，然后顺着L的原型链一直往上找，如果有跟R原型相等的，那就返回true，否则一直查找到null返回false

function instance_of(L, R) {
    var O = R.prototype;
    L = L.__proto__;
    while(true) {
        if(L === null) return false;
        if(O === L) return true;
        L = L.__proto__;
    }
}