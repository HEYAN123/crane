// 参考资料：
// https://www.jianshu.com/p/c633a22f9e8c
// https://www.jianshu.com/p/327e38aec874

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
    this.data = null;
    this.err = null;
    this.state = 'pending';
    // 这两个栈为的是兼容异步的状态改变
    // 成功回调栈
    this.successAllCallbacks = [];
    // 失败回调栈
    this.failAllCallbacks=[];
    // 定义成功方法，成功时候循环执行完成功栈中的所有回调
    function resolve(data) {
        // 判断状态再执行，为了实现状态转换的不可逆
        if(_this.state === 'pending') {
            _this.successAllCallbacks.forEach((callback)=>{
                callback(data);
            });
            _this.data = data;
            _this.state = 'resolved';
        }
    }
    // 定义失败方法，失败时候执行完失败栈中的所有回调
    function reject(err) {
        if(_this.state === 'pending') {
            _this.failAllCallbacks.forEach((callback)=>{
                callback(err);
            })
            _this.err = err;
            _this.state = 'rejected';
        }
    }
    // 为了实现 promise实例化时就会执行 的效果
    fn(resolve, reject);
}

// 在原型上定义then方法，将成功回调和失败回调压入栈中。
Promise.prototype.then = function(fulfilled, rejected) {
    if(this.state === 'pending') {
        // 如果传入了函数参数则执行，反之略过
        if(typeof fulfilled === 'function') {
            this.successAllCallbacks.push(fulfilled);
            this.failAllCallbacks.push(rejected);
        }
    }
    if(this.state === 'resolved') {
        fulfilled(this.data);
    }
    if(this.state === 'rejected') {
        rejected(this.err);
    }
    return new Promise((onFulfilled,onRejected)=>{
        // 封装一个成功时执行的函数
    let successFn = value => {
        try {
          if (!typeof fulfilled === 'function') {
            onFulfilled(value)
          } else {
            let res =  fulfilled(value);
            if (res instanceof Promise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilled, onRejected)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilled(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejected(err)
        }
      }
    //   -----------------------------
      // 封装一个失败时执行的函数
    let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
              let res = onRejected(error);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
}

// 此方法用来封装链式调用产生的结果。根据上一个then的返回值，返回新的promise2
function resolvePromise(promise2, x, resolve, reject) {
    // 如果x==promise2（循环引用），抛出错误
    if(promise2 === x) {
        reject(new TypeError('发生循环引用'));
    }
    // 如果是对象/函数，进一步处理
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 如果是个thenable对象
        try {
            let then = x.then;
            if(typeof then === 'function') {
                let y = then.call(x,(y)=>{
                    resolvePromise(promise2, y, resolve, reject)
                }, (r)=>{
                    reject(r);
                })
            } else {
                resolve(x);
            }
        } catch(e) {
            reject(e);
        }
    }
    // 如果是个普通值
    else {
        resolve(x);
    }
}



// 生成promise实例
var test = new Promise((resolve,reject)=>{
    console.log('新建promise时候同步执行');
    // 异步操作
    setTimeout(function() {
        var data = {
            code: 0,
            data: 'hello promise'
        };
        if(data.code == 0) {
            // promise在新建的时候就会执行
            console.log('在新建时候执行(推迟了1秒)', data.data);
            resolve(data.data);
        } else {
            reject(err);
        }
    }, 1000);
})
test.then((value)=>{
    console.log('test', value);
},(err)=>{
    console.log('test',err);
})

// 通常我们会把promise包在一个函数中，在需要的时候再去调用而不是一新建就调用

function fn() {
    return new Promise((resolve,rejected)=>{
        // 异步操作
        setTimeout(function() {
            var data = {
                code: 0,
                data: 'hello promise'
            };
            if(data.code == 0) {
                console.log('只有fn被调用时才会被执行', data.data);
                resolve(data.data);
            } else {
                rejected(err);
            }
        }, 1000);
    })
}

// // fn返回了一个promise，因此可以用then执行成功/失败的回调
var promise = fn();
promise.then(value=>{
    console.log('success!', value);
},err=>{
    console.log('error!', err);
});

console.log('同步的主线程');