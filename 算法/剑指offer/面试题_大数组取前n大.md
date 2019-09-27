# 大数组取前n大

## 题目

- 从上万乃至上亿个书中，找出前n个最大的数

## 解析

```javascript

function findMax(arr, start, end, n) {
    var mid = parseInt((start + end) / 2);
    var i = start, j = end;
    while(i < j) {
        while(i <= mid && arr[i] < arr[mid]) i++;
        while(j >= mid && arr[j] > arr[mid]) j--;
        swap(arr[i], arr[j]);
    }

    if(end - i + 1 == n) {
        return;
    } else if(end - i + 1 > n) {
        findMax(arr, i, end, n);
    } else {
        findMax(arr, start, i, n-(end-i+1));
    }
}

function swap(a, b) {
    var temp = a;
    a = b;
    b = temp;
}

```
