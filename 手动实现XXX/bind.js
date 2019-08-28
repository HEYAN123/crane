// https://github.com/YvetteLau/Blog/issues/7
// 一个函数被call或者apply时候会被直接调用，
// 但bind会创建一个新的函数，
// 当这个新函数被调用时，bind的第一个参数将作为他运行时候的this，
// 之后的一系列参数会在传递的实参前传入作为它的参数
// 函数中的return除非返回的是个对象，否则通过new返回的是个this，指向空对象，空对象原型指向原函数的prototype。

Function.prototype.bind = function(context) {
    // 检查xxx.bind中xxx是否是正确的函数类型
    if(typeof this !== 'function') {
        throw new TypeError("not a function");
    }
    // 要执行的函数放到self里
    let self = this;
    // 取到后面的参数列表
    let args = [...arguments].slice(1);
    // 创建一个空对象并将这个空对象的原型指向函数的原型
    function fn() {};
    fn.prototype = this.prototype;
    // 构建新函数的参数和调用时传入的参数的拼接
    let bound = function() {
        // args是bind调用时候传入的参数，arguments是创建的新函数调用时传入的参数
        let res = [...args, ...arguments];
        // this是个fn吗？是的话context就是this（bound），不是的话就绑定到上一层的this对象，如果上一层对象为空的话指向全局
        context = this instanceof fn ? this : context || window;
        return self.apply(context, res);
    }
    // bound.prototype = Object.create(this.prototype)
    bound.prototype = new fn();
    return bound;
}


var name = 'jack';
function person(age, job, gender) {
    console.log(this.name, age, job, gender);
}

var test = {
    name: 'hello'
}

// person.bind(test, 12, 'doctor')返回新函数，('female')调用函数
let result = person.bind(test, 12, 'doctor')('female');