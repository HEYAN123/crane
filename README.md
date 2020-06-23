# Crane

## 启动

```bash
npm serve
```

## TODO

- 图标替换

## 路径

_posts 博客内容
_pages 其他需要生成的网页，如About页
_layouts 网页排版模板
_includes 被模板包含的HTML片段，可在_config.yml中修改位置，使用include xxx.html语法引用
assets 辅助资源 css布局 js脚本 图片等
_data 动态数据
_sites 最终生成的静态网页
_config.yml 网站的一些配置信息
index.html 网站的入口

## 思路

- 左侧索引永远对应于右侧内容，右侧内容根据左侧索引进行排版


致谢
====================================
+ 感谢[Less官网](http://lesscss.cn/)的样式，本Jekyll框架的样式都是基于Less官网的样式直接拷贝过来的。只是重构了JS，并且加入了Jekyll语法而已。
+ 感谢[Github](https://github.com/)提供的代码维护和发布平台
+ 感谢[Jekyll](https://jekyllrb.com/)团队做出如此优秀的产品
+ 感谢[Solar](https://github.com/mattvh/solar-theme-jekyll)的原作者[Matt Harzewski](http://www.webmaster-source.com/)，在`2014.11`-`2016.09`的两年间，我的博客选用了此样式模版


使用
====================================

下载
------------------------------------

使用git从[LessOrMore](https://github.com/luoyan35714/LessOrMore.git)主页下载项目

``` bash
git clone https://github.com/luoyan35714/LessOrMore.git
```

配置
------------------------------------

`LessOrMore`项目需要配置的只有一个文件`_config.yml`，打开之后按照如下进行配置。

> 特别注意`baseurl`的配置。如果是`***.github.io`项目，不修改为空''的话，会导致JS,CSS等静态资源无法找到的错误

``` bash
name: 博客名称
email: 邮箱地址
author: 作者名
url: 个人网站
# baseurl修改为项目名，如果项目是'***.github.io'，则设置为空''
baseurl: "/crane"
resume_site: 个人简历网站
github: github地址
github_username: github用户名称
# 请到百度统计官网[https://tongji.baidu.com/](https://tongji.baidu.com/)申请自己的网站ID并在此处替换，否则将无法正常统计访问量
baidu_analysis: 94be4b0f9fc5d94cc0d0415ea6761ae9
# 请到revolvermaps [http://www.revolvermaps.com/?target=setupgl](http://www.revolvermaps.com/?target=setupgl)申请自己的网站ID并在此处替换，否则将无法正常统计访问量
revolvermaps: 5ytn1ssq6za
```

如何写文章
------------------------------------

在`LessOrMore/_posts`目录下新建一个文件，可以创建文件夹并在文件夹中添加文件，方便维护。在新建文件中粘贴如下信息，并修改以下的`titile`,`date`,`categories`,`tag`的相关信息，添加`* content {:toc}`为目录相关信息，在进行正文书写前需要在目录和正文之间输入至少2行空行。然后按照正常的Markdown语法书写正文。

``` bash
---
layout: post
#标题配置
title:  标题
#时间配置
date:   2016-08-27 01:08:00 +0800
#大类配置
categories: document
#小类配置
tag: 教程
---

* content
{:toc}


我是正文。我是正文。我是正文。我是正文。我是正文。我是正文。
```

执行
------------------------------------

``` bash
jekyll server
```

效果
------------------------------------
打开浏览器并输入URL`http://localhost:4000/`,回车。


为什么重复造轮子
====================================

很明显，我在重复造轮子。在13年接触到GIT，14年末接触到Jekyll，然后搭建了自己的博客，当时是选用了[JekyllThemes](http://jekyllthemes.org/)上的[Solar](https://github.com/mattvh/solar-theme-jekyll)主题，一直到现在。不过中间一直感觉页面风格还是偏暗，阅读不方便。并且有一些小的细节做的不是很好。在页面的跨平台浏览上有一些瑕疵。并且不区分一级标题和二级标题，导致没有重点强调。诸如此类，用了2年，用的越多，越发吃力，中间就一直在寻找新的能够让我一眼认定的主题。

虽然设计好看的主题很多。但是真正适合拿来做博客的却不多。中间一直没有找到合适的主题。直到有一天看到Less官网的主题之后，豁然觉得这就是我的博客想要的样子。简单而又不平凡。所以就决定了要把博客迁移到这个主题，然后拿了两天晚上来把这个主题做出来。

重复造了轮子，但是这个是迄今为止自己觉得最适合我的博客的轮子，所以是值得的！

关于作者
====================================

热爱开源，热爱折腾的Java程序猿。更多个人信息和联系方式可以参照[我的简介](http://www.hifreud.com/Resume.io/)。

写在最后
====================================

如果你也像我一样在寻觅一个简洁的博客主题。不妨试下LessOrMore。

之前此处是有打赏功能的，不过最近在整理自己，发现打赏功能偏离了我写这个Jekyll主题的初衷，所以删除了打赏功能。

非常感谢之前打赏过的朋友们！！