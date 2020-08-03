---
layout: post
title:  JS基础问答合集
date:   2020-06-23
categories: tech
tags: JavaScript
---

* content
{:toc}


- 题目来源：<https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md>

## 1. 输出是什么？

```javascript
function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'Lydia'
  let age = 21
}

sayHi()
```

### 答案

```javascript
undefined
VM38:3 Uncaught ReferenceError: Cannot access 'age' before initialization
    at sayHi (<anonymous>:3:15)
    at <anonymous>:8:1
```

### 解析

- var声明变量会发生变量提升。也就是var name这一部分被提升到当前作用域的顶部并且被初始化为undefined，但是赋值操作='Lydia'没有提升，还在console.log语句后面，所以声明但未赋值的变量打印出来就是undefined
- let/const声明的变量不会发生变量提升。一个let/const变量在声明之前是无法访问到的，这叫“暂时性死区”，所以在let age之前访问它时会抛出ReferenceError错误。

---

## 2. 输出是什么 ？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
```

### 答案

```javascript
3
3
3
0
1
2
```

### 解析

- 使用var声明的i是一个全局变量，for循环的执行在执行栈中先执行，setTimeout里打印的回调函数被放到事件队列中，for循环执行完之后i这个全局变量已经自增为3，再执行事件队列里的打印程序时就会输出3次“3”
- 使用let声明的i是一个局部变量，每次循环回调函数记住的是该次循环的作用域块里的i值，所以打印出来的是三个不同的值。

---

## 3. 输出什么？

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()
```

### 答案

```javascript
20
NaN
```

### 解析

- 这里考察的是常规函数和箭头函数this的绑定机制。diameter是一个常规函数，perimeter是一个箭头函数。
- 常规函数this绑定于谁调用它，于是绑定在shape这个对象上，radius为10。
- 箭头函数this绑定于它上层作用域中的this，这里就是window，全局作用域中不存在radius，所以计算得出NaN。

---

## 4. 输出什么？

```javascript
+true;
!"Lydia";
```

### 答案

```javascript;
1
false
```

### 解析

- 运算符+作用于true会将true转化为数字类型，true对应1
- !会将字符串先转化为对应布尔值然后取反。非空字符串对应true，取反则为false。

---

## 5. 哪个是无效的？

```javascript
const bird = {
  size: 'small'
}

const mouse = {
  name: 'Mickey',
  small: true
}

A: mouse.bird.size
B: mouse[bird.size]
C: mouse[bird["size"]]
D: All of them are valid
```

### 答案

```javascript
A
```

### 解析

- []语法寻找属性时[]内部可以有字符串，运算，变量，然后会先得出[]内的结果然后在对象上依据这个结果寻找属性。而点语法只会从对象上寻找名为点后面字符串的属性， “mouse.bird”意为mouse上找名为bird的属性，自然是没有的。

---

## 6. 输出是什么？

```javascript
let c = { greeting: 'Hey!' }
let d

d = c
c.greeting = 'Hello'
console.log(d.greeting)
```

### 答案

```javascript
Hello
```

### 解析

- c是一个指针指向对象{ greeting: 'Hey!' }的存储地址，当d=c时d也成为了一个指针，与c共同指向该对象，当c.greeting = 'Hello'修改对象里的内容时，d指向这个对象，自然里面的内容也是已经变了的。

---

## 7. 输出什么？

```javascript
let a = 3
let b = new Number(3)
let c = 3

console.log(a == b)
console.log(a === b)
console.log(b === c)
```

### 答案

```javascript
true false false
```

### 解析

- new Number(3)将基础类型number包装为一个Number对象，类型变成object
- ==判断会发生类型转换数字对象转化为基础类型，3等于3，true
- ===严格判断不会发生类型转换，基础类型不等于对象类型，所以===返回false

---

## 8. 输出什么？

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: 'purple' })
freddie.colorChange('orange')
```

### 答案

```javascript
TypeError
```

### 解析

- static关键字表明该方法是一个静态方法，静态方法不会被实例继承，而只可以通过类调用，如果在实例上调用就会报TypeError错误，并且类上调用时this指向该类。

---

## 9. 输出什么？

```javascript
let greeting
ggg = {}
console.log(ggg)
```

### 答案

```javascript
{}
```

### 解析

- 当不使用声明关键字，为一个未声明的变量赋值的时候，默认声明了一个全局变量并赋值、所以上式相当于global.ggg={}

---

## 10. 当我们这么做时会发生什么？

```javascript
function bark() {
  console.log('Woof!')
}

bark.animal = 'dog'
```

### 答案

正常运行

### 解析

- 函数是一个对象，这么做相当于给一个对象增加属性，是完全可以的。

---

## 11. 输出什么？

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());
```

### 答案

```javascript
TypeError
```

### 解析

- 上式中添加的方法挂在了构造函数对象上而不是挂在原型上被实例继承，实例并不能继承构造函数身上挂的对象，所以member实例上没有该方法。

---

## 12. 输出什么？

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')

console.log(lydia)
console.log(sarah)
```

### 答案

```javascript
Person {firstName: "Lydia", lastName: "Hallie"}
undefined
```

### 解析

- 使用new关键字会创建一个新的空对象，然后this指向这个空对象并且执行构造函数
- 不使用new关键字时相当于在全局环境里执行这个函数，this指向全局环境，相当于在全局环境里增加了两个变量，分别是firstName和lastName，而sarah本身声明后被赋值了没有返回值的Person函数的返回值，即undefined

---

## 13. 事件传播的三个阶段是什么？

### 答案

捕获阶段-目标阶段-冒泡阶段

---

## 14. 所有的对象都有原型吗？

### 答案

否

### 解析

- 除了基本对象（最终的原型对象），所有对象都有原型

---

## 15. 输出什么？

```javascript
function sum(a, b) {
  return a + b
}

sum(1, '2')
```

### 答案

```javascript
"12"
```

### 解析

- 1和'2'分别是数字类型和字符串类型，类型不相同进行和运算时会发生类型转换，这里将数字类型转换为字符串类型然后拼接。

---

## 16. 输出什么？

```javascript
let number = 0
console.log(number++)
console.log(++number)
console.log(number)
```

### 答案

```javascript
0 2 2
```

### 解析

- number++:先得到number的值，然后进行number = number+1
- ++number:先number = number+1，然后取number的值

---

## 17. 输出什么？

```javascript
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`
```

### 答案

```javascript
["", " is ", " years old"]
'Lydia'
21
```

### 解析

- 使用模板字面量，第一个参数获取到的是由模板字面量中变量分割开来的几个字符串组成的数组，其他参数依次是模板中的变量的值。

---

## 18. 输出什么？

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!')
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.')
  } else {
    console.log(`Hmm.. You don't have an age I guess`)
  }
}

checkAge({ age: 18 })
```

### 答案

```javascript
Hmm.. You don't have an age I guess
```

### 解析

- 比较两个对象是否相等时会比较两个引用是否指向同一块内存地址，这里传递参数进去的对象地址和被比较的参照对象不在同一个内存地址里，也就是说是两个对象，所以判定为不等。

---

## 19. 输出什么？

```javascript
function getAge(...args) {
  console.log(typeof args)
}

getAge(21)
```

### 答案

```javascript
"object"
```

### 解析

- 传递进去的参数被一个类数组所承接，本质上是一个对象

---

## 20. 输出什么？

```javascript
function getAge() {
  'use strict'
  age = 21
  console.log(age)
}

getAge()
```

### 答案

```javascript
ReferenceError
```

### 解析

- 严格模式下禁止对一个未声明的变量进行赋值，所以这里会抛出引用错误。

---

## 21. 输出什么？

```javascript
const sum = eval('10*10+5')
```

### 答案

105

### 解析

- eval会将传进去的字符串当做js代码来解析执行

---

## 22. cool_secret可访问多长时间？

```javascript
sessionStorage.setItem('cool_secret', 123)
```

### 答案

- 可以活到用户关掉标签页时候

### 解析

- 关掉teb标签页时候sessionStorage存储的数据才会被删除

---

## 23. 输出什么？

```javascript
var num = 8
var num = 10
console.log(num)
```

### 答案

10

### 解析

- 使用var重复声明变量时变量将保存最新的那个值，而let/const不行，重复声明会抛错

---

## 24. 输出什么？

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)
```

### 答案

true true false true

### 解析

- 所有对象的键（不包括Symbol）在底层都是字符串，对于集合set则不然

---

## 25. 输出什么？

```javascript
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

### 答案

{ a: 'three', b: 'two' }

### 解析

- 重复声明一个对象的键键的位置保持第一次出现的顺序，值保持最后一次的赋值。

---

## 26. Javascript全局执行上下文为你做了两件事

### 答案

- 全局对象和this关键字

---

## 27. 输出什么？

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
```

### 答案

1 2 4

### 解析

- continue会中断本次循环体，立即执行下一轮循环

---

## 28. 输出什么？

```javascript
String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()
```

### 答案

'Just give Lydia pizza already!

### 解析

- 该方法被绑到了字符串这一类的原型上，被所有实例所共享

---

## 29. 输出什么？

```javascript
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])
```

### 答案

456

### 解析

- 对象的键只有字符串类型，所以如果有其他的类型的值充当键使用时会被转化为字符串类型，这里的b，c都被转化为“[object object]”，是同一个，重复赋值会更新值。

---

## 30. 输出什么？

```javascript
const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'))
const baz = () => console.log('Third')

bar()
foo()
baz()
```

### 答案

First Third Second

### 解析

- 回调函数被放到事件队列，执行栈中推入了foo，baz，执行完执行栈中的程序后才会调用事件队列中的程序。

---

## 31. 当点击按钮时，event.target是什么？

```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
```

### 答案

button

### 解析

- 事件最深处即是目标阶段，是真正的target

---

## 32. 点击该段落时，日志输出的是什么？

```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
```

### 答案

p div

### 解析

- 默认情况下事件处理程序在冒泡阶段执行，从里到外。

---

## 33. 输出什么？

```javascript
const person = { name: 'Lydia' }

function sayHi(age) {
  console.log(`${this.name} is ${age}`)
}

sayHi.call(person, 21)
sayHi.bind(person, 21)
```

### 答案

Lydia is 21 function

### 解析

- call：绑定this为第一个参数并且执行
- bind：只绑定this但是不执行，返回一个函数的副本

---

## 34. 输出什么？

```javascript
function sayHi() {
  return (() => 0)()
}

typeof sayHi()
```

### 答案

number

### 解析

- 立即执行函数会当时立即执行，返回了0 是个number

---

## 35. 下面哪些值是false？

```javascript
0
new Number(0)
('')
(' ')
new Boolean(false)
undefined
```

### 答案

0, '', undefined

### 解析

- 0 undefined null 空字符串 false NaN是false

---

## 36. 输出什么？

```javascript
console.log(typeof typeof 1)
```

### 答案

string

### 解析

- typeof 1返回“number”，是个字符串

---

## 37. 输出什么？

```javascript
const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers)
```

### 答案

[1, 2, 3, empty × 7, 11]

### 解析

- 未赋值的变成empty

---

## 38. 输出什么？

```javascript
(() => {
  let x, y
  try {
    throw new Error()
  } catch (x) {
    (x = 1), (y = 2)
    console.log(x)
  }
  console.log(x)
  console.log(y)
})()
```

### 答案

1 undefined 2

### 解析

- catch创造了块级作用域并捕捉了x，其内部给x，y赋值后外面的x并未得到值，而y相当于未声明直接赋值，也就是给全局变量赋值，得到2

---

## 39. js中的一切都是？

### 答案

基本类型和对象

---

## 40. 输出什么？

```javascript
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur)
  },
  [1, 2]
)
```

### 答案

[1,2,0,1,2,3]

### 解析

- reduce是收敛函数，第一个参数是收敛用的函数，第二个参数被当做首次调用函数时候的acc值，acc表示前一个，cur表示数组后一个，返回的值被当做acc继续循环操作数组元素。

---

## 41. 输出什么？

```javascript
!!null
!!''
!!1
```

### 答案

false false true

### 解析

- null为false，两次取反为false；''为false，同理；1为true，两次取反还为true

---

## 42. setInterval 方法的返回值是什么？

### 答案

- 返回一个唯一的编号（id）表示这个定时器，取消定时器时可以使用。

---

## 43. 输出什么？

```javascript
[...'Lydia']
```

### 答案

["L", "y", "d", "i", "a"]

### 解析

- 扩展运算符的使用

---

## 44. 输出什么？

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```

### 答案

10 20

### 解析

- 生成器函数每次next会执行一个yield语句。

---

## 45. 返回值是什么？

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

### 答案

two

### 解析

- race方法会完成第一个首先完成的promise即终止，这里secondPromise首先完成，所以只打印处two

---

## 46. 输出什么？

```javascript
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);
```

### 答案

[{ name: "Lydia" }]

### 解析

- person指针指向对象{ name: "Lydia" }
- 然后members[0]作为一个指针也指向此对象
person赋值为null的时候即断开了person指针与原对象之间的关联，但不影响数组。

---

## 47. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
};

for (const item in person) {
  console.log(item);
}
```

### 答案

"name", "age"

### 解析

- for...in循环迭代的是对象的键值

---

## 48. 输出什么？

```javascript
console.log(3 + 4 + "5");
```

### 答案

“75”

### 解析

- 从左到右运算，3+4得7，数字与字符串相加会都转为字符串进行字符串拼接，得到“75”

## 49. num的值是什么？

```javascript
const num = parseInt("7*6", 10);
```

### 答案

7

### 解析

- 第一个参数是要解析为数字的内容，当遇到不合法字符时停止解析；第二个参数是指按多少进制来解析，这里是10进制

---

## 50. 输出什么？

```javascript
[1, 2, 3].map(num => {
  if (typeof num === "number") return;
  return num * 2;
});
```

### 答案

[undefined, undefined, undefined]

### 解析

- map函数创建新数组并将函数的返回值插入数组。当函数没有返回值时默认返回undefined

---

## 51. 输出什么？

```javascript
function getInfo(member, year) {
  member.name = "Lydia";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);
```

### 答案

{ name: "Lydia" }, "1997"

### 解析

- 普通参数是值传递，对象是引用传递，birthYear只是在getInfo函数内部值复制了一份，然后在函数作用域里被改为1998，外部的值独立于它，仍是1997，而person则是此指针指向的对象内部值被改变，所以在外部也被改变了。

## 52. 输出什么？

```javascript
function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error!", e);
  }
}

sayHi();
```

### 答案

Oh no an error！Hello world!

### 解析

- throw语句抛出自定义错误，try语句执行到抛错的地方会终止，跳到catch中，错误被捕捉处理。

---

## 53. 输出什么？

```javascript
function Car() {
  this.make = "Lamborghini";
  return { make: "Maserati" };
}

const myCar = new Car();
console.log(myCar.make);
```

### 答案

"Maserati"

### 解析

- 使用构造函数和new关键字创建对象时，如果返回值没有或者不是对象则返回是一个绑定了构造函数内this的一个对象，如果有返回对象则是此对象。

---

## 54. 输出什么？

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

### 答案

undefined

### 解析

- 上面的运算式可以分解为 y=10;let x = y; x定义于立即执行函数的块级作用域里，而y未声明直接赋值默认定义为一个全局变量，所以在全局变量可以取到y，但是并不能取到x

---

## 55. 输出什么？

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

### 答案

"Woof I am Mara", TypeError

### 解析

- 头一次调用会根据原型链找到该函数并执行，第二次调用前删除了原型上的该方法，直接执行时抛错

---

## 56. 输出什么？

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
```

### 答案

Set(4) {1, 2, 3, 4}

### 解析

- Set类型是一个类数组对象，其中不会有重复值

---

## 57. 输出什么？

```javascript
// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
```

### 答案

Error

### 解析

- ES6语法的模块化都是只读引入，只有导出模块本身才能修改它的值

---

## 58. 输出什么？

```javascript
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

### 答案

false true

### 解析

- delete返回一个表示删除成功与否的布尔值，而通过var，const，let关键字声明的变量无法用delete删除，delete可以删除对象属性，这里的age未声明直接赋值相当于声明全局变量的一个属性并赋值，是可以删除的。

---

## 59. 输出什么？

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

### 答案

1

### 解析

- 解构赋值时候按顺序一个变量对应一个元素

---

## 60. 输出什么？

```javascript
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```

### 答案

{ admin: true, name: "Lydia", age: 21 }

### 解析

- 扩展运算符的用法。