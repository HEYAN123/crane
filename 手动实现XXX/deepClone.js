function deepClone(obj) {
    if(obj === null)  return null;
    if(obj instanceof RegExp) return new RegExp(obj);
    if(ibj instanceof Date) return new Date(obj);
    if(typeof obj !== 'object') {
        // 如果是基本类型，直接返回
        return obj;
    }
    // 执行对象的构造函数，生成一个新的同类型空对象
    let t = new obj.constructor();
    for(let k in obj) {
        t[k] = deepClone(obj[k]);
    }
    return t;

}