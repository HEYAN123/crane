// 为了使老浏览器支持定时器函数传递三个及以上参数，并且第三个之后的参数都将作为回调函数的参数执行

// 在全局中立即执行

(function() {
    setTimeout(function(arg1) {
        // 如果能取到第三个参数test，那就证明不需要polyfill，直接返回
        if(arg1 === 'test') {
            return;
        }
        // 存储环境中setTimeout引用
        var __nativeST__ = window.setTimeout;
        // 修改window.setTimeout
        window.setTimeout = function(vCallback, nDelay) {
            // 取到第三个及之后的参数
            var aArgs = Array.prototype.slice.call(arguments, 2);
            // 按预期正确执行
            return __nativeST__(vCallback instanceof Function ? function() {
                vCallback.apply(null, aArgs);
            }: vCallback, nDelay);
        }


    }, 0, 'test'); //立即执行

    var interval = setInterval(function(arg1) {
        clearInterval(interval);
        if (arg1 === 'test') {
          // feature test is passed, no need for polyfill
          return;
        }
        var __nativeSI__ = window.setInterval;
        window.setInterval = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
          var aArgs = Array.prototype.slice.call(arguments, 2);
          return __nativeSI__(vCallback instanceof Function ? function() {
            vCallback.apply(null, aArgs);
          } : vCallback, nDelay);
        };
      }, 0, 'test');
}())