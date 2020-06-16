// 方法一

function flatten(arr) {
    return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

// 方法二

function flatten(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
}

// 方法三

function flatten(arr) {
    var res = [];
    arr.map(item=>{
        if(Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}

// 控制打平层数
function flatten(arr, index) {
    var res = [];
    arr.map(item=>{
        if(Array.isArray(item) && --index>=0) {
            res = res.concat(flatten(item, index));
        } else {
            res.push(item);
        }
    });
    return res;
}

// 方法四

[].concat(...[1,2,[3,4]]);// 只能打平两层

function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}