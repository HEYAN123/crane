---
layout: post
title:  JS之decorator
date:   2020-06-23
categories: tech
tags: JavaScript
---

* content
{:toc}


- 装饰器，decorator，是一种与class相关的函数的写法，用来注释或修改类和类方法。

- 作用：

1. 增加代码可读性，表达代码意图
2. 方便修改或增加类功能

- 装饰器装饰类，为类添加静态属性或实例属性

```js
function decorator(prop1, prop2) {
    return (target) => {
        target.active = prop1; // 静态属性
        target.prototype.show = prop2; // 实例属性
    }
}

@decorator(true, false)
class a {
    ...
}
```

- 装饰器装饰类的属性：修改属性的属性描述符对象

```js
// decorator函数
function decorate(target, name, descriptor) {
    ...
    return descriptor;
}

class a {
    ...
    @decorate
    a = true;

}
```
