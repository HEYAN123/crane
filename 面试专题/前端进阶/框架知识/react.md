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


## diff

### 同层结点位置移动情况

同层结点如果只是交换位置的话只需要对这些结点进行位置移动即可

React优化策略：允许开发者对同一层级的同组子节点，添加唯一的key进行区分

进行diff差异化对比后，通过key发现新旧集合中的结点都是相同结点，因此无需进行结点的删除和创建，只需要将就集合中结点的位置进行移动，更新为新集合中结点的位置。此时React给出的diff结果为：只进行移动操作

### 如何运作

- lastIndex = Math.max(prevChild._mountIndex, lastIndex),表示访问过的结点在旧集合中最右的位置，初始化为0，后续不断更新为每个元素在旧集合中最右位置
- mountIndex：初始化为旧集合中的位置，后续更新为新集合中的位置nextIndex
- nextIndex：表示在新集合中的遍历指针位置

过程：

以新集合为遍历对象：

1. 判断第一个结点的旧集合位置是否小于lastIndex（初始化为0），如果是，进行移动操作，否，不移动（也就是意味着只有原位置靠前的结点进行插入操作，原位置靠后的不动）
2. 更新lastIndex为当前结点在旧集合中位置与lastIndex上一个值之间的较大者
3. 将当前结点的旧位置更新为新位置
4. 判断下一个，重复上面的操作

也就是说每个元素的位置标记值都会改为新集合中的值，但是真实是否移动取决于它的位置在旧集合中比lastIndex靠前（移动）还是靠后（不移动）

- 首先，对新集合中的结点进行循环遍历for(name in nextChildren)，通过唯一的key判断新旧集合中是否存在相同的结点if(prevChild === nextChild)，如果存在相同的结点，则进行移动操作，但在移动前需要将当前结点在旧集合中的位置（mountIndex）与lastIndex（上一个结点旧集合中最右的位置）进行比较if(child._mountIndex < lastIndex)，即如果上一个结点在旧集合中的最右位置大于当前结点在旧集合中的位置时就进行移动操作，否则不执行该操作。

- 这是一种顺序优化手段，lastIndex一直在更新，表示访问过的结点在旧集合中最右（最大）的位置。如果新集合中当前访问的结点比lastIndex大，说明当前访问结点在旧集合中比上一个结点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，既不执行移动操作，而只更新位置为新集合中的位置。只有当访问的结点比lastIndex小时，才需要进行移动操作。

当存在添加结点时直接添加到新集合中，不影响lastIndex值，存在删除结点时会在遍历完成后再遍历一遍旧集合发现不存在于新集合中的值而删除

```js
_updateChildren: function(nextNestedChildrenElements, transaction, context) {
    var prevChildren = this._renderChildren;
    var removedNodes = {};
    var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, removeNodes, transaction, context);

    // 如果不存在prevChildren和nextChildren则不做diff处理
    if(!nextChildren && !prevChildren) {
        return;
    }
    var updates = null;
    var name;
    // lastIndex是prevChildren中最后的索引，nextIndex是nextChildren中每个结点的索引
    var lastIndex = 0;
    var nextIndex = 0;
    var lastPlaceNode = null;
    // 遍历新集合
    for(name in nextChildren) {
        if(!nextChildren.hasOwnProperty(name)) {
            continue;
        }
        // 取到旧集合中对应的节点或者空
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        // 如果该节点存在于新旧集合，那么进入判断
        if(prevChild === nextChild) {
            // 移动结点
            updates = enqueue(
                updates,
                this.moveChild(prevChild._mountIndex, lastIndex)
            );
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            prevChild._mountIndex = nextIndex;
        } else {
            // ???
            if(prevChild) {
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                // 通过遍历removeNodes删除子节点prevChild
            }
            // 初始化并创建结点
            updates = enqueue(
                updates,
                this._mountChildAtIndex(nextChild, lastPlaceNode, nextIndex, transaction, context);
            );
        }
        nextIndex++;
        lastPlaceNode = ReactReconciler.getNativeNode(nextChild);
    }
    // 如果父节点不存在，则将其子结点全部移除
    for(name in removeNodes) {
        if(removedNodes.hasOwnProperty(name)) {
            updates,
            this._unmountChild(prevChildren[name], removedNodes[name])
        }
    }

    // 如果存在更新，则处理更新队列
    if(updates) {
        processQueue(this, updates);
    }
    this._renderChildren = nextChildren;
},

// 构造更新队列
function enqueue(queue, update) {
    // 如果有更新，将其存入queue
    if(update) {
        queue = queue || [];
        queue.push(update);
    }
    return queue;
},

// 处理更新队列里的更新
function processQueue(inst, updateQueue) {
    ReactComponentEnviroment.processChildrenUpdates(
        inst,
        updateQueue
    );
}

// 移动结点
moveChild: function(child,afterNode, toIndex, lastIndex) {
    if(child._mountIndex<lastIndex) {
        return makeMove(child,afterNode, toIndex);
    }
}

// 创建结点
createChild: function(child, afterNode, mountImage) {
    return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
},

// 删除结点

removeChild: function(child, node) {
    return makeRemove(child. node);
}

// 卸载已经渲染的子节点
_unmountChild: function(child, node) {
    var update = this.removeChild(child, node);
    child._mountIndex = null;
    return update;
}

// 通过提供的名称实例化子节点
_mountChildAtIndex: function(child, afterNode, index, transaction, context) {
    var mountImage = ReactReconciler.mountComponent(child, truansaction, this, this,_nativeContainerInfo, context);
    child._mountIndex = index;
    return this.createChild(child, afterNode, mountImage);
}

```