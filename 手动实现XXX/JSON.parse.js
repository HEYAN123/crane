// 将字符串转换为json对象
function parse(jsonString) {
    return eval('(' + jsonString + ')');
}

var json = '{"name": "hehe"}';

var jsonObj = parse(json);
console.log(jsonObj);