// Object.create() 方法创建一个新对象使用现有的对象来提供新创建的对象的原型。


function create(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}