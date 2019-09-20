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

