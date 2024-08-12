<template >
  <div style="padding: 1%;margin-top: 3%;">
    <div>
    <form data-v-6f2b9b53="" class="el-form  el-form--inline v-form">
    <div data-v-6f2b9b53="" class="el-form-item el-form-item--default is-no-asterisk asterisk-left">
        <div class="el-form-item__label-wrap">
            <label id="el-id-4586-62" for="el-id-4586-74" class="el-form-item__label" style="width: auto;">教师信息管理</label></div>
            <div class="el-form-item__content">
                <div data-v-6f2b9b53="" class="el-input el-input--default el-input--suffix" style="width: 100%;">
                    <!-- input --><!-- prepend slot --><!--v-if-->
                     <div class="el-input__wrapper" tabindex="-1">
                        <!-- prefix slot --><!--v-if-->
                        <input class="el-input__inner" type="text" autocomplete="off" tabindex="0" placeholder="请输入" id="el-id-4586-74"><!-- suffix slot --><!--v-if--></div><!-- append slot --><!--v-if--></div></div></div><div data-v-6f2b9b53="" class="el-form-item el-form-item--default is-no-asterisk asterisk-left" role="group" aria-labelledby="el-id-4586-63" slots="[object Object]"><div id="el-id-4586-63" class="el-form-item__label" style="width: 0px;">
                            <span data-v-6f2b9b53="">&nbsp;</span></div>
                            <div class="el-form-item__content"><div data-v-6f2b9b53="">
                              <el-button type="primary">
                                  <el-icon style="vertical-align: middle">
                                    <Search />
                                  </el-icon>
                                  <span style="vertical-align: middle"> Search </span>
                              </el-button>
                              <el-button type="default">
                                  <el-icon style="vertical-align: middle">
                                    <RefreshRight />
                                  </el-icon>
                                  <span style="vertical-align: middle"> 重置 </span>
                              </el-button>   
                
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
    <div class="home">
    <el-table :data="tableData()" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="名字" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    <div class="example-pagination-block">
      <!-- <div class="example-demonstration">分页</div> -->
      <el-pagination
        background
        layout="prev, pager, next ,total,sizes"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
     </div>
   </div>

  </div>

</template>
 
<script lang="ts" setup>
import { defineComponent, reactive, toRefs,ref,onMounted } from "vue";
import { getTea } from '@/api/admin.ts';
import {
  Search,
  RefreshRight
} from "@element-plus/icons-vue";

  components: {},

   const teachers=ref([]);
   const fetchTeachers=async()=>{
    try{
      const response=await getTea(1,1,1,1);
      teachers.value=response.data;//根据接口返回的数据结构进行调整
      console.log('教师数据列表:',teachers.value);
      
    }catch(error){
      console.error('Error fetching teachers:',error);
      
    }
   }

    //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
    const allTableData = [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];
    //表格用到的参数
    const state = reactive({
      page: 1,
      limit: 10,
      total: allTableData.length,
    });
    //前端限制分页（tableData为当前展示页表格）
    const tableData = () => {
      return allTableData.filter(
        (item, index) =>
          index <= state.page * state.limit &&
          index > state.limit * (state.page - 1)
      );
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
    };
    onMounted(()=>{
      fetchTeachers();
    })
    return {
      teachers,
      fetchTeachers,
      allTableData,
      tableData,
      handleCurrentChange,
      handleSizeChange,
      ...toRefs(state),
    };
  }
</script>

<style lang="less">

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
