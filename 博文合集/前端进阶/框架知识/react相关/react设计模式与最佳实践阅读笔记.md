# 《react设计模式与最佳实践》阅读笔记

## 第一章.react基础

### 1.1声明式编程

- react推行声明式编程范式

- 说到声明式编程，就一定会联想到命令式编程，这是两种不同的编程方式：命令式编程描述代码如何工作，而声明式编程则表达想要实现声明目的。

- 命令式编程：对程序运行的每一步作出具体的指示，重点在于过程逻辑按命令执行，而不关注于得到的结果

```js
// 这个例子中对于数组中的小写转换的循环是由我们编写循环代码去驱动循环的
const toLowerCase = input => {
    const output = [];
    for(let i = 0; i < input.length; i ++) {
        output.push(input[i].toLowerCase());
    }
    return output;
}
```

- 声明式编程：对程序只声明一个最终目标，重点在于得到的是什么，而弱化人对实现过程的具体认知

```js
// 这个例子中我们使用了一个map命令，程序就会自动执行循环并返回最终的结果
const toLowerCase = input => input.map(
    value => value.toLowerCase();
)
```

- 区别于命令式编程，声明式编程透明化了内部具体的实现步骤，对应于在react中的实现：将逻辑封装到组件内部，调用时候只引用该组件然后在JSX中声明使用——这就是react的声明式编程

```js
// 举例antd组件库中的button组件的使用，只是声明了我们想要什么样的按钮，具体实现不关心
import { Button } from 'antd';
...
<Button
    type="primary"
    icon="poweroff"
    loading={this.state.iconLoading}
    onClick={this.enterIconLoading}
>
    Click me!
</Button>
```

- 按笔者理解，声明式是接口：可能是对命令式编程（人为编程）封装后对外暴露的接口；也可能是机器底层的运作逻辑透明化后对用户暴露的方法

- 声明式编程的优点：代码职能分离分层，处于某一层上的编程能够更专注于本层的需求/业务开发
