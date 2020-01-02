# class

<!-- https://es6.ruanyifeng.com/#docs/class -->

- class语法是es6中新出的生成实例对象时候用到的一种语法糖。

- 对比传统实例构造和class语法：

```js
function Obj(x, y) {
    this.x = x;
    this.y = y;
}

Obj.prototype.say = function () {
    return 'hello' + x + y;
}

var myObj = new Obj('he', 'yan');
myObj.say();
```

```js
class Obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    say() {
        return 'hello' + x + y;
    }
}

var myObj = new Obj('he', 'yan');
myObj.say();
```

- 类的数据类型就是function，类的本身就指向类的原型的构造函数

- 类里面定义的所有方法（包括constructor）都最后被挂在了类的prototype上

- 类和块的内部默认运行严格模式

- 类不存在变量提升

- 类里的方法内部的this会指向实例

- 类内的static方法是静态方法只能通过类名调用，不会被实例继承

- 类的静态属性使用static声明并放在类首部

- 类内用#声明私有属性/方法
