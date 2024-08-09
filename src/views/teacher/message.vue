<template>
  <div class="meaasge">
    <h3>消息</h3>
    <!-- 待处理 -->
    <!-- 已完成 -->
    <!-- 批量操作 -->
    <div class="oprate">
      <div class="userOprate">
        <button>待处理</button>
        <button>已完成</button>
      </div>
      <div class="moreOprate">
        <button>批量操作</button>
      </div>
    </div>
    <div class="messageMain">
      <el-scrollbar height="440px">
        <div class="messageIndex" v-for="index in 11">
          <div class="info">
            <p class="content">
              这是一条普通的消息内容，请随意把它这是一条普通的消息内容，请随意把它这是一条普通的消息内容，请随意把它这是一条普通的消息内容，请随意把它这是一条普通的消息内容，请随意把它
            </p>
            <p class="date">2024-01-35</p>
          </div>
          <el-button type="primary">查看详情</el-button>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.oprate {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
    transition-duration: 0.25s;
  }
}
.messageMain {
  margin-top: 20px;
}
:deep(.el-scrollbar__view) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-right: 20px;
}
.messageIndex {
  display: flex;
  padding: 10px;
  align-items: center;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  gap: 15px;
  transition-duration: 0.25s;
  .date {
    color: #ccc;
    font-size: 14px;
    margin-top: 10px;
  }
  .content {
    width: 95%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.messageIndex:hover {
  box-shadow: 1px 2px 15px #ebebeb;
}
</style>
