// apply的第二个参数是数组或者类数组

Function.prototype.apply = function(context, rest) {
    if(!context) {
        context = typeof window === 'undefined' ? global : window;
    }
    context.fn = this;
    let result;
    if(rest === undefined || rest === null) {
        result = context.fn(rest);
    } else if(typeof rest === 'object') {
        result = context.fn(...rest);
    }
    delete context.fn;
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
bar.apply(foo, ['programmer', 20]);
bar.apply(null, ['doctor', 22]);