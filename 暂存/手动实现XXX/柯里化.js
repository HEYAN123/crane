// 函数柯里化是指这样一种技术：
// 把接受多个参数的函数变换成接收一个参数的函数，
// 并且返回【接收剩余其他参数然后返回结果】的函数

function curry(fn, args = []) {
    return function() {
        let rest = [...args, ...arguments];
        if(rest.length <fn.length) return curry.call(this, fn, rest);
        else return fn.apply(this, rest);
    }
}

function sum(a,b,c) {
    return a+b+c;
}

var currySum = curry(sum);

console.log(currySum(1)(2)(3));
console.log(currySum(1)(2, 3));
