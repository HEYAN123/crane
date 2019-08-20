// call的讲究：
// 将函数设为传输参数的属性
// 指定this到函数并传入给定参数执行函数
// 如果不传参数或者参数为null。默认指向window或者global

Function.prototype.call = function(context) {
    // 如果没有指定this或者指定了false的值，那么默认指向全局对象
    if(!context) {
        context = typeof window === 'undefined' ? global : window;
    }
    // 传入的对象的fn属性指向当前函数实例，也就是把要执行的函数绑定了this到传入的对象身上
    context.fn = this;
    // 取传入的参数列表
    let args = [...arguments].slice(1);
    // 执行函数的结果
    let result = context.fn(...args);
    // 执行完之后把传入的对象身上增加的fn属性再删掉，复原。
    delete context.fn;
    // 返回结果
    return result;
}


var foo = {
    name: 'hello'
}

var name = 'hh';

function bar(job, age) {
    console.log(this.name);
    console.log(job, age);
}

// 在函数原型链上找到Function.prototype.call
bar.call(foo, 'programmer', 20);
bar.call(null, 'doctor', 22);