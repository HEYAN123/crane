# Vue

## 生命周期

```bash
            new Vue()
                |
            初始化 事件与生命周期
                |
            beforeCreate 组件刚被创建，属性未初始化
                |
            通过依赖注入导入依赖项
                |
            created 组件创建完成，属性绑定，DOM未建立
                |
            是否有el属性？ ------否------等待手动调用vm.$mount(el)绑定
                |是                         |
            是否有template属性？--------------
                |
    ---------------------------
    |是                        |否
 模板编译             将整个#appDOM对象作为模板编译
    |                          |
    ----------------------------
                |
            beforeMount 挂载，替换真实el之前
                |
            创建 vm.$el并用它替换el
                |
                            -----数据变化----beforeUpdate---------
            mounted 已经替换 -                                   |
                            --------updated--虚拟DOM更新并patch---
                |
            vm.$destroy()被调用
                |
            beforeDestory 组件被销毁之前
                |
            卸载观察者，监听器和子组件
                |
                销毁
                |
            destroyed
```
