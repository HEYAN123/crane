# react

## 常见概念

### 生命周期

- React生命周期分为三大状态：初始化阶段，更新阶段，销毁阶段：

![avatar](../../../static/react.PNG)

### state

- 一个组件自身的数据模型，组件可以把自身需要的数据保存到自身的state上使用。是否拥有state也决定了此组件的类型：状态组件/无状态组件。
- 是否为某数据设置state可根据以下四条规则判断：
    1. 通过props从父组件获取的数据不需要设置state
    2. 在整个生命周期中都保持不变的数据不需要设置state
    3. 可通过其他state或props计算得到不需要state
    4. 不会在render方法中使用不需要state

### 受控组件

- 受控：表单里的值受控于组件state
- 特指表单组件，用户输入的值被绑在state上，触发onChange事件时更新state，state的值是表单组件的value。

### 非受控组件

- dom里的value不与state捆绑，用表单的ref属性操作dom和属性值

## 组件传值

### 父传子

- 通过props传递

### 子传父

- 通过回调函数传递

### 平级传

1. 设置共同的父组件然后按子传父->父传子传递
2. context+高阶组件

```javascript
// 伪代码：
// context.js
import React from 'react';
export const myContext = React.createContext({
    switch: true;
})

// 父组件 控制context内的值
import React, { Component } from "react";
import { myContext } from "context.js";
class Parent extends Component {
    state = {
        switch: false;
    }

    render() {
        const { switch } = this.state;
        return (
            <myContext.Provider value={switch}>

            </myContext.Provider>
        )
    }
}

// addSwitch.js 高阶组件输出函数
import React, { Component } from "react";
import { myContext } from "context.js";

export function addSwitch(Item) {
    return class extends Component {
        static contextType = myContext;
        render() {
            return (
                <Item
                {...this.props}
                switch={this.context.switch}
                >
                </Item>
            )
        }
    }
}


// 子组件A
import React, { Component } from "react";
import { addSwitch} from "addSwitch.js";

class ChildA extends Component {
    state = {
        switch: this.props.switch
    }

}

export default addSwitch(ChildA);

```

3. redux
4. hooks
