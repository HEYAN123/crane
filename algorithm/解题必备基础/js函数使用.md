# JS函数在算法中

## parseInt()

- 将一个数转化为整数。

### 场景

- 我们常见 一个数/10 用以取去掉末尾一位数后的结果，比如取18中的1，js中18/10结果是小数1.8，故需要加一层取整：parseInt(18/10)=1

---

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

## 异或

a^a=0

a^0=a

a^b^a=a^a^b=0^b=b

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

## 位移运算

- <<：二进制下每位左移
- \>>：二进制下每位右移

## 按位与运算

```bash
    1 1 0 1
&   1 0 1 1
--------------
    1 0 0 1
```
