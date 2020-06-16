
// 重复出现的key组装成数组
// 中文需要解码
// 未指定值的key约定为true


// 如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。
// 此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。
function parseParam(url) {
    // 截取？后面的字符串
    const paramStr = /.+\?(.+)$/.exec(url)[1];
    const paramArr = paramStr.split('&');
    let paramObj = {};
    paramArr.forEach(param=>{
        // 处理键值对形式的param
        if(/=/.test(param)) {
            let [key, val] = param.split('=');
            val = decodeURIComponent(val); // 解码
            // 判断是否转为数字 \d匹配数字
            val = /^\d+$/.test(val) ? parseFloat(val) : val;
            if(paramObj.hasOwnProperty(key)) {
                paramObj[key] = [].concat(paramObj[key], val);
            } else {
                paramObj[key] = val;
            }
        } else {
            paramObj[param] = true;
        }
    })
    return paramObj;
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url);