# JS函数在算法中

## parseInt()

- 将一个数转化为整数。

### 场景

- 我们常见 一个数/10 用以取去掉末尾一位数后的结果，比如取18中的1，js中18/10结果是小数1.8，故需要加一层取整：parseInt(18/10)=1

---

## slice()

- 从已有的数组中返回选定的元素

```javascript
arrayObject.slice(start,end);
//  返回一个新数组，包含从start到end（不包括该元素）的元素
// 不会修改数组，而是返回一个子数组
```

---

## concat()

- 用于连接两个或多个数组
- 不会改变现有的数组，而是仅仅返回被连接数组的一个副本

```javascript
arrayObject.concat(arr1, arr2);
```

## charAt()

- 取一个字符串中第某个的字母

```javascript
var str = 'hello';
var index = str.charAt(1); // e
```

---

## Math.max()

- 取两数大者

```javascript
var max = Math.max(1,2) // 2
```

---

## Math.min()

- 取两数小者

```javascript
var max = Math.min(1,2) // 1
```

---

## Math.pow(x, y)幂运算

- 表示x的y次幂

---

## 异或运算

- 可以得到两个二进制数无进位相加的结果

a^a=0

a^0=a

a^b^a=a^a^b=0^b=b

---

## 按位与运算

- 可以得到两个二进制数的相加时候的进位

```bash
    1 1 0 1
&   1 0 1 1
--------------
    1 0 0 1
```

---

## 位移运算

- <<：二进制下每位左移
- \>>：二进制下每位右移

---

## 取整

- ⌊x⌋：地板函数，或取整函数，表示小于 x 的最大整数； js中就是parseInt(x)
- ⌈x⌉：天花板函数，表示大于 x 的最小整数。 js中可以用parseInt(x)+1取到

---

## charCodeAt()

- 将字母转换为ASCII码，可以用来计算两个字母之间相隔多少.
- 'B'.charCodeAt()-'A'.charCodeAt() = 1

---

## String.fromCharCode(num)

- 将ascii码转换为字符

---

## ++/--

- a++：后自加，先引用a的值，然后对a加1
- ++a：前自加，先对a+1，然后引用其值
