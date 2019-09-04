# js题目合集

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
