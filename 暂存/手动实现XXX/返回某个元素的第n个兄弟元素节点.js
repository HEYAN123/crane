// n为正，返回后面的兄弟节点，为负，返回前面的，为0，返回自己

function retSibling(elem, n) {
    while(elem && n) {
        if(n > 0) {
            if(elem.nextElementSibling) {
                elem = elem.nextElementSibling;
            } else {
                for(elem = elem.nextSibling; elem && elem.nodeType != 1; elem = elem.nextSibling);
            }
            
            n --;
        } else {
            if(elem.previousElementSibling) {
                elem = elem.previousElementSibling;
            } else {
                for(elem = elem.previousSibling; elem && elem.nodeType != 1; elem = elem.previousSibling);
            }
            n ++;
        }
    }
    return elem;
}