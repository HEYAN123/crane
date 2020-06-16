// jsonp原理：
// 动态生成一个script标签，其src由api。请求参数，callback函数名拼接而成，利用js标签没有跨域限制的特性实现跨域请求

const JSONP = function(url, data) {
    return new Promise((resolve, reject) => {
        // 如果url没有 ？，那就拼接 ？，有 ？ 证明已存在部分参数，直接接&
        let connect = url.indexOf('?') === -1 ? '?' : "&";
        // 回调函数的名字
        let cbName = `jsonp_${Date.now()}`;
        // 拼接回调函数
        url += `${connect}callback=${cbName}`;
        // 有请求参数的话再拼接上去
        if(data) {
            for(let k in data) {
                url += `&${k}=${data[k]}`;
            }
        }
        // 创建脚本标签
        let node = document.createElement('script');
        node.src = url;
        // 回调函数
        window[cbName] = res => {
            if(res.code === 200) {
                resolve(res);
            } else {
                reject('failed');
            }
            
            delete window[cbName];
            document.body.removeChild(node);
        }
        // 加载异常情况
        node.addEventListener('error', ()=>{
            delete window[cbName];
            document.body.removeChild(node);
            reject('资源加载失败');
        },false);

        // 结点添加到dom树中时开始请求
        document.body.appendChild(node);
    });
}