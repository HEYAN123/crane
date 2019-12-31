# hooks

- react框架下组件的编写常见有两种方式：

1. class语法：属于es6的类语法糖

    ```js
    class Hello extends React.component {
        render() {
            return (
                <div>hello world</div>
            )
        }
    }
    ```

2. function语法：纯函数编写方式

    ```js
    function Hello() {
        return (
            <div>hello world</div>
        )
    }
    ```

- 两种写法的区别：

