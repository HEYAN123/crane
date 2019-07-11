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
