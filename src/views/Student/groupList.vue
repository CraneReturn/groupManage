<template>
  <div class="groupMain">
    <div class="search">
      <div class="form">
        <input class="form__field" placeholder="小组名称" />
        <button type="button" class="btn btn--primary btn--inside">搜索</button>
      </div>
    </div>
    <div class="group-max">
      <div class="group-list">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="小组" width="200" />
          <el-table-column prop="name" label="简介" />
          <el-table-column prop="address" label="地址" width="400" />
          <el-table-column label="操作" width="120">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)"
              >
                申请
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="group-page">
        <el-pagination background layout="prev, pager, next" :total="50" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tableData = [
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "未来",
    name: "11111",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style lang="scss" scoped>
.groupMain{
  width: 100%;
  background-color: #fff;
  height: 100vh;
  padding-top: 100px;
}
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn {
    display: inline-block;
    background: transparent;
    color: inherit;
    font: inherit;
    border: 0;
    outline: 0;
    padding: 0;
    transition: all 200ms ease-in;
    cursor: pointer;

    &--primary {
      background: #7f8ff4;
      color: #fff;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      padding: 12px 36px;

      &:hover {
        background: darken(#7f8ff4, 4%);
      }

      &:active {
        background: #7f8ff4;
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
      }
    }

    &--inside {
      margin-left: -96px;
    }
  }

  .form {
    &__field {
      width: 360px;
      background: #fff;
      color: #a3a3a3;
      font: inherit;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
      border: 0;
      outline: 0;
      padding: 22px 18px;
    }
  }
}

.group-max {
  width: 1000px;
  margin: auto;
  padding-top: 20px;
  .group-page {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
    ::v-deep .el-pagination .el-pager li.is-active {
      background-color: #aab3ee; /* 激活页码按钮背景色 */
    }
  }
}
</style>
