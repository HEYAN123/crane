var str = 'get-element-by-id';

var change = function(str) {
    // 把-x替换为X
    return str.replace(/-\w/g, function(x) {
        return x.slice(1).toUpperCase();
    });
}