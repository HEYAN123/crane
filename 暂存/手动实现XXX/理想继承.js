// 父类构造方法
function Parent (name) {
    this.parent = name;
}

// 公共方法
Parent.prototype.say = function() {
    console.log('hello', this.parent);
}

// 子方法
function Child(name, parentName) {
    // 构造函数继承（私有化）
    Parent.call(this, parentName);
    this.child = name;
}

// 子类构造函数的原型指向父类原型的副本，如此互不影响
Child.prototype = Object.create(Parent.prototype);

// 子类构造函数是自身
Child.prototype.constructor = Child;

