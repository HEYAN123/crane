// promise 是异步编程管理的一种方式，有三种状态：
// pending:正在进行中
// fulfilled:已经成功
// rejected:已经失败
// 状态只能从pending演变为fulfilled或者rejected，不可逆
// promise的构造函数是同步执行的，then是异步执行的

// promise 用法：

// new Promise((resolve, rejected) => {
//     if(condition) {
//         resolve();
//     } else {
//         rejected();
//     }
// })

// 同步的构造函数，参数fn返回的仍是一个promise
function Promise(fn) {
    var value = null,
    // 成功回调栈
    successAllCallbacks = [],
    // 失败回调栈
    failAllCallbacks=[];
    // 定义then方法，将成功回调和失败回调压入栈中
    this.then = function(fulfilled, rejected) {
        successAllCallbacks.push(fulfilled);
        failAllCallbacks.push(rejected);
    }
    // 定义成功方法，成功时候循环执行完成功栈中的所有回调
    function resolve(value) {
        successAllCallbacks.forEach((callback)=>{
            callback(value);
        })
    }
    // 定义失败方法，失败时候执行完失败栈中的所有回调
    function rejected(value) {
        failAllCallbacks.forEach((callback)=>{
            callback(value);
        })
    }

    fn(resolve, rejected);
}

// function fn(num) {
//     return new Promise((resolve, rejected)=>{
//         setTimeout(()=>{
//             resolve(num);
//         }, 1000)
//     })
// }
// 生成promise实例
var test = new Promise((resolve,rejected)=>{
    // 异步操作
    setTimeout(function() {
        var condition = true;
        var data = {
            code: 0,
            data: 'hello promise'
        };
        if(data.code == 0) {
            // promise在新建的时候就会执行
            console.log('在新建时候执行(推迟了1秒)', data.data);
            resolve(data.data);
        } else {
            rejected(err);
        }
    }, 1000);
})

// 通常我们会把promise包在一个函数中，在需要的时候再去调用而不是一新建就调用

function fn() {
    return new Promise((resolve,rejected)=>{
        // 异步操作
        setTimeout(function() {
            var condition = true;
            var data = {
                code: 0,
                data: 'hello promise'
            };
            if(data.code == 0) {
                // promise在新建的时候就会执行
                console.log('在新建时候执行(推迟了1秒)', data.data);
                resolve(data.data);
            } else {
                rejected(err);
            }
        }, 1000);
    })
}
// then方法里的两个回调，分别是resolve的回调函数和rejected回调函数
// test.then(value=>{
//     console.log('success!', value);
// },err=>{
//     console.log('error!', err);
// })

console.log('同步的主线程');