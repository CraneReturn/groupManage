<template>
  <div>
    <div>
      <form data-v-6f2b9b53="" class="el-form  el-form--inline v-form">
    <div data-v-6f2b9b53="" class="el-form-item el-form-item--default is-no-asterisk asterisk-left">
        <div class="el-form-item__label-wrap">
            <label id="el-id-4586-62" for="el-id-4586-74" class="el-form-item__label" style="width: auto;">小组信息管理</label></div>
            <div class="el-form-item__content">
                <div data-v-6f2b9b53="" class="el-input el-input--default el-input--suffix" style="width: 100%;">
                    <!-- input --><!-- prepend slot --><!--v-if-->
                     <div class="el-input__wrapper" tabindex="-1">
                        <!-- prefix slot --><!--v-if-->
                        <input class="el-input__inner" type="text" autocomplete="off" tabindex="0" placeholder="请输入" id="el-id-4586-74"><!-- suffix slot --><!--v-if--></div><!-- append slot --><!--v-if--></div></div></div><div data-v-6f2b9b53="" class="el-form-item el-form-item--default is-no-asterisk asterisk-left" role="group" aria-labelledby="el-id-4586-63" slots="[object Object]"><div id="el-id-4586-63" class="el-form-item__label" style="width: 0px;">
                            <span data-v-6f2b9b53="">&nbsp;</span></div>
                            <div class="el-form-item__content"><div data-v-6f2b9b53="">
                                <button aria-disabled="false" type="button" class="el-button el-button--primary el-button--default v-button color-#fff" darker="false" style="--el-button-bg-color: #409eff; --el-button-text-color: #fff; --el-button-border-color: #409eff; --el-button-hover-bg-color: rgb(121, 187, 255); --el-button-hover-text-color: #fff; --el-button-hover-border-color: rgb(121, 187, 255); --el-button-active-bg-color: rgb(55, 130, 208); --el-button-active-border-color: rgb(55, 130, 208);"><i class="el-icon"><i data-v-9dae935e="" class="el-icon v-icon" style="font-size: 16px; --2ea6d154: undefined;">
                                <div data-v-9dae935e="" class="vi-epSearch iconify" style="font-size: 16px;"></div></i>
                            </i><span class="">查询</span>
                        </button>
                        <button aria-disabled="false" type="button" class="el-button el-button--default el-button--default is-plain v-button color-#fff" darker="false">
                            <i class="el-icon"><i data-v-9dae935e="" class="el-icon v-icon" style="font-size: 16px; --2ea6d154: undefined;">
                                <div data-v-9dae935e="" class="vi-ep:refresh-right iconify" style="font-size: 16px;">

                                </div>
                            </i>
                        </i>
                        <span class="">重置</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
    <div class="mb-10px">
      <button aria-disabled="false" type="button" class="el-button el-button--primary el-button--default v-button color-#fff" darker="false" style="--el-button-bg-color: #409eff; --el-button-text-color: #fff; --el-button-border-color: #409eff; --el-button-hover-bg-color: rgb(121, 187, 255); --el-button-hover-text-color: #fff; --el-button-hover-border-color: rgb(121, 187, 255); --el-button-active-bg-color: rgb(55, 130, 208); --el-button-active-border-color: rgb(55, 130, 208);">
        <!--v-if-->
        <span class="">新增</span>
      </button>
      <button aria-disabled="false" type="button" class="el-button el-button--danger el-button--default v-button color-#fff" darker="false">
        <!--v-if-->
        <span class="">删除</span>
      </button>
    </div>
    </div>
    <div>
    <MyTable
      ref="tableRef"
      :page="tableData.page"
      :isSelect="true"
      :rowKey="'id'"
      @changeSize="(size) => changeSize(size)"
      @changePage="(page) => changePage(page)"
      :header="header"
      :tableData="
        tableData.data.slice(
          (tableData.page.pageIndex - 1) * tableData.page.pageSize,
          tableData.page.pageIndex * tableData.page.pageSize
        )
      "
      @onSelectTap="changeSelectTap"
      @onSelectAll="changeSelectAll"
    >
      <template v-slot:sex="scope">
        {{ scope.row.sex == "0" ? "男" : "女" }}
      </template>
      <template v-slot:operation="scope">
        <el-button @click="handelCheck(scope.row)"   type="success">查看</el-button>
        <el-button @click="handelEdit(scope.row)"  type="primary">编辑</el-button>
        <el-button @click="handelDel(scope.row)"   type="danger">删除</el-button>
      </template>
    </MyTable>
    </div>
    <div>
   
  </div>
  <div>
    <Dialog :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles">
    </Dialog>
  </div>
  </div>
 
</template>

<script lang="ts" setup>
import MyTable from "./components/myTable.vue";
import Dialog from "./components/Dialog.vue";


import { ref, reactive, onMounted } from "vue";
const tableRef = ref();
// 表头
const header = reactive([
  {
    label: "姓名",
    prop: "name",
  },
  {
    label: "性别",
    prop: "sex",
    isCustom: true,
  },
  {
    label: "年龄",
    prop: "age",
  },
  {
    label: "操作",
    prop: "operation",
    isCustom: true,
    fixed: "right",
    align: "center",
    width: 300,
  },
]);
// 表格数据
const tableData = reactive({
  data: [],
  searchForm: {},
  page: {
    pageIndex: 1,
    pageSize: 10,
    total: 500,
  },
});
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false);
const dialogInfo = ref({ name: '', sex: '', age: '' });
const handelDel = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
};
// 编辑按钮
const handelEdit = (val) => {
  console.log("编辑");
};
  const handelCheck = (info) => {
    console.log(info);
    this.dialogVisible = true;
    this.dialogInfo = info
  };

  const dialogVisibles=(v)=>{
      this.dialogVisible = v
      console.log(v)
  }

onMounted(() => {
  //模拟请求数据
  setTimeout(() => {
      //随机生成一些表格数据
    for (let i = 0; i < 500; i++) {
      let obj = {
        id:i,
        name: `c${i + 1}`,
        sex: parseInt(String(Math.random() * 2)),
        age: Math.round(Math.random() * 100),
      };
      tableData.data.push(obj);
    }
  }, 1500);
});

</script>
<style lang="less" scoped>

.el-form {
    --el-form-label-font-size: 14px;
    --el-form-inline-content-width: 220px;
    .el-form-item {
      display: inline-flex;
      margin-right: 32px;
      vertical-align: middle;
    }
      .el-form--inline{
      display: inline-flex;
      margin-right: 32px;
      vertical-align: middle;
      .el-form-item__label-wrap {
        display: flex;
        
      .el-form-item--default {
        .el-form-item__label {
          height: 32px;
          line-height: 32px;
      }
      }

      }
      }
      .el-form--inline .el-form-item {
          display: inline-flex;
          margin-right: 32px;
          vertical-align: middle;
      .el-form-item--default{
        .el-form-item__label {
          height: 32px;
          line-height: 32px;
      }
      } 
      .el-form-item__content {
    align-items: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    font-size: var(--font-size);
    line-height: 32px;
    min-width: 0;
    position: relative;
}
      }
       .el-form-item--default {
          --font-size: 14px;
          --el-form-label-font-size: var(--font-size);
          margin-bottom: 18px;
      }
}
</style>
