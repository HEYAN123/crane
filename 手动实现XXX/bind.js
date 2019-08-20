// https://github.com/YvetteLau/Blog/issues/7
// 一个函数被call或者apply时候会被直接调用，
// 但bind会创建一个新的函数，
// 当这个新函数被调用时，bind的第一个参数将作为他运行时候的this，
// 之后的一系列参数会在传递的实参前传入作为它的参数

Function.prototype.bind = function(context) {
    // 检查xxx.bind中xxx是否是正确的函数类型
    if(typeof this !== 'function') {
        throw new TypeError("not a function");
    }
    // 要执行的函数放到self里
    let self = this;
    // 取到后面的参数列表
    let args = [...arguments].slice(1);
    function fn() {};
    fn.prototype = this.prototype;
    // 构建新函数的参数和调用时传入的参数的拼接
    let bound = function() {
        // args是bind调用时候传入的参数，arguments是创建的新函数调用时传入的参数
        let res = [...args, ...arguments];
        context = this instanceof fn ? this : context || this;
        return self.apply(context, res);
    }
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