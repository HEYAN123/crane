// 参考资料：
// https://www.jianshu.com/p/c633a22f9e8c
// https://www.jianshu.com/p/327e38aec874
// https://www.jianshu.com/p/43de678e918a
// https://yuchengkai.cn/docs/frontend/#promise-%E5%AE%9E%E7%8E%B0
// https://www.cnblogs.com/XieJunBao/p/9156134.html

// promise 是异步编程管理的一种方式，有三种状态：
// pending:正在进行中
// fulfilled:已经成功
// rejected:已经失败
// 状态只能从pending演变为fulfilled或者rejected，不可逆
// promise的构造函数是同步执行的，then是异步执行的
// then 方法都会返回一个promise
// then可以链式调用

// promise 用法：

// new Promise((resolve, rejected) => {
//     if(condition) {
//         resolve();
//     } else {
//         rejected();
//     }
// })

// 同步的构造函数，参数是个执行器
function Promise(fn) {
    // 保存当前作用域的this
    var _this = this;
    _this.data = null;
    _this.state = 'pending';
    // 这两个栈为的是兼容异步的状态改变,并支持then的多次调用
    // 成功回调栈
    _this.successAllCallbacks = [];
    // 失败回调栈
    _this.failAllCallbacks=[];
    // 定义成功方法，成功时候循环执行完成功栈中的所有回调，setTimeout 实现异步执行
    _this.resolve = function(data) {
        if(data instanceof Promise) return data.then(_this.resolve, _this.reject);
        setTimeout(()=>{
        // 判断状态再执行，为了实现状态转换的不可逆
        // console.log(_this.state);
        if(_this.state === 'pending') {
            _this.state = 'resolved';
            _this.data = data;
            _this.successAllCallbacks.forEach((callback)=>{
                callback();
            });
        }});
    }
    // 定义失败方法，失败时候执行完失败栈中的所有回调
    _this.reject = function(err) {
        setTimeout(()=>{
            if(_this.state === 'pending') {
            _this.data = err;
            _this.state = 'rejected';
            _this.failAllCallbacks.forEach((callback)=>{
                callback();
            })
        }});
    }
    // 为了实现 promise实例化时就会执行 的效果
    try {
        fn(_this.resolve, _this.reject);
      } catch (e) {
        _this.reject(e);
      }
}

// 在原型上定义then方法，将成功回调和失败回调压入栈中。
Promise.prototype.then = function (onResolved, onRejected) {
    var _this = this;
    var promise2;
    // 处理传入then中的两个回调
    if(typeof onResolved === 'function') {
        onResolved = onResolved;
    } else {
        onResolved = (value)=>value;
    }
    if(typeof onRejected === 'function') {
        onRejected = onRejected;
    } else {
        onRejected = (value)=>{throw value};
    }

    if(_this.state==='resolved') {
        return (promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onResolved(_this.data);
                    resolution(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
        }));
    }

    if(_this.state === 'rejected') {
        return (promise2 = new Promise(function (resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onRejected(_this.data);
                    resolution(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
        }));
    }

    if(_this.state === 'pending') {
        return (promise2 = new Promise(function (resolve, reject) {
            _this.successAllCallbacks.push(function() {
                try {
                    var x = onResolved(_this.data);
                    resolution(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
            _this.failAllCallbacks.push(function() {
                try {
                    var x = onRejected(_this.data);
                    resolution(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
        }));
    }
}

// 封装then过程操作
// promise2 then返回的promise对象；x then方法中回调完得到的结果；resolve新promise的resolve方法；reject同理
function resolution(promise2, x, resolve, reject) {
    // x.then(value=>{return x})
    if(promise2 === x) {
        return reject(new TypeError('发生循环引用！'));
    }
    // 如果x为promise，状态为pending
    if(x instanceof Promise) {
        if(x.state === 'pending') {
            x.then(function (value) {
                resolution(promise2, value, resolve, reject);
            },reject);
        } else {
            x.then(resolve, reject);
        }
        return;
    }
    let called = false;
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if(typeof then === 'function') {
                then.call(x, y=>{
                    if(called) return;
                    called = true;
                    resolution(promise2, y, resolve, reject);
                },e=>{
                    if(called) return;
                    called = true;
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// 生成promise实例
// var test = new Promise((resolve,reject)=>{
//     // 异步操作
//     setTimeout(function() {
//         var data = {
//             code: 0,
//             data: 'hello promise'
//         };
//         if(data.code == 0) {
//             // promise在新建的时候就会执行
//             console.log('在新建时候执行(推迟了1秒)', data.data);
//             resolve(data.data);
//         } else {
//             reject('promise出错！');
//         }
//     }, 1000);
// })

// var then = test.then((value)=>{
//     console.log('test', value);
// },(err)=>{
//     console.log('test',err);
// }).then(()=>{
//     console.log('nextthen')
// });


// 通常我们会把promise包在一个函数中，在需要的时候再去调用而不是一新建就调用

// function fn() {
//     return new Promise((resolve,rejected)=>{
//         // 异步操作
//         setTimeout(function() {
//             var data = {
//                 code: 0,
//                 data: 'hello promise'
//             };
//             if(data.code == 0) {
//                 console.log('只有fn被调用时才会被执行', data.data);
//                 resolve(data.data);
//             } else {
//                 rejected(err);
//             }
//         }, 1000);
//     })
// }

// // // fn返回了一个promise，因此可以用then执行成功/失败的回调
// var promise = fn();
// promise.then(value=>{
//     console.log('success!', value);
// },err=>{
//     console.log('error!', err);
// });
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}
// console.log('同步的主线程');
Promise.deferred = function() {
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = Promise
} catch (e) {}