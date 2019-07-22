function Foo() {
    getName = function () { console.log(1); };
    return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}

//请写出以下输出结果：
Foo.getName(); // 2 全局环境中定义了名为‘Foo.getName’的函数，执行该函数
getName(); // 4 理由同上
Foo().getName(); // 1 执行Foo()，首先里面没用var定以getName，此时默认重新定义了全局变量getName，原getName被改变，然后返回了this，this此时指向window，于是全局环境中的getName打印1
getName(); // 1 全局环境中的getName已经在上一个函数执行时被改为function () { console.log(1); }
new Foo.getName(); // 前面的new不产生作用，执行全局的Foo.getName函数
new Foo().getName(); // 生成一个function Foo的实例，
new new Foo().getName();