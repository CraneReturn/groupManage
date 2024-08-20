<!-- 信息详情页 -->
<template>
  <div class="messageInfo">
    <!-- 发送方 -->
    <!-- 详细信息 -->
    <!-- 教师处理 -->
    <div class="senderInfo">
      <p>发送方：{{ sender }}</p>
    </div>

    <div class="details">
        <p>详细信息：</p>
      <pre>
            {{ detail }}
        </pre
      >
    </div>
    <div class="userOprate">
      <el-button type="danger">删除信息</el-button>
      <el-button>去处理</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
const sender = "lxy";
const detail = `React ------- 用于构建用户界面的JavaScript库/一个将数据渲染为HTML视图的开源JavaScript库

React历史
【经典水时长/水字数】

由Facebook开发，且开源

起初由Facebook的软件工程师 Jordan Walke 创建 【膜拜 React 祖师爷】
于2011年部署于 Facebook的 newsfeed
在2012年部署于 Instagram
2013年5月开源
. . . . . .【这里应该加句：我们的故事还在继续...】

为什么要学 React
【生活所迫】

原生JavaScript操作DOM繁琐、效率低（DOM-API操作UI）
使用JavaScript直接操作DOM，浏览器会进行大量的重绘重排
原生JavaScript没有组件化编码方案，代码复用率低
【我JUBAO，老师你上vue也是这么说的】

React特点
【经典喝水案例，典典典典典典典典典典典典典典典典典典典】

采用组件化模式、声明式编程，提高开发效率及组件复用率
在React Native中可以使用React语法进行移动端开发【出现了，家人们】
使用虚拟DOM+优秀的diffing算法，尽量减少与真实DOM的交互【基操勿六】
————————————————

                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/2202_75675550/article/details/138038242`;
</script>
<style lang="scss">
    .messageInfo{
        margin-top: 20px;
    }
    .senderInfo{
        background-color: var(--jjext-color-layout-icon-outline);
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
        font-size: 16px;
        p{
            font-weight: bold;
        }
    }
    .details{
        padding: 20px;
        background-color: #f9f8f8;
        p{
            font-size: 14px;
            font-weight: 600;
        }
        pre{
            min-height: 200px;
        }
    }
    .userOprate{
        margin: 20px;
        display: flex;
        justify-content: end;
    }
</style>
