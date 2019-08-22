// children : 找某元素的所有子元素节点

Element.prototype.hasChildrenFn = function() {
    // 取到所有子结点
    var child = this.childNodes;
    // 结点长度
    var len = child.length;
    for(let i = 0; i < len; i ++) {
        if(child[i].nodeType == 1) {
            return true;
        }
    }
    return false;
}