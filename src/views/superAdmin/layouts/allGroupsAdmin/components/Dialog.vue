<template>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" :before-close="cancelDialog" >
      <el-form class="form">
        <el-form-item label="姓名 : ">
          <p>{{dialogInfo.name}}</p>
        </el-form-item>
        <el-form-item label="性别 : ">
          <p>{{dialogInfo.sex}}</p>
        </el-form-item>
        <el-form-item label="年龄 : ">
          <p>{{dialogInfo.age}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="cancelDialog">确 定</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElButton } from 'element-plus';
    interface DialogInfo {
      name: string;
      sex: string;
      age: string;
    }
  export default defineComponent({
  name:'Dialog',
  components: { ElDialog, ElForm, ElFormItem, ElButton },
    //父组件 传 过来的 值
  props:{
    dialogVisible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    dialogInfo: {
      type: Object as PropType<DialogInfo>,
      default: () => ({
        name: '',
        sex: '',
        age: '',
      }),
    },
  },
  setup(props, { emit }) {
    const dialogVisible = ref(props.dialogVisible);

    watch(() => props.dialogVisible, (newVal) => {
      dialogVisible.value = newVal;
    });

    const cancelDialog = () => {
      emit('update:dialogVisible', false);
    };

    return {
      dialogVisible,
      cancelDialog,
    };
  },
  });
  </script>
  <style lang='scss' scoped>
  .form{
      background: #eee;
      padding: 0 10px;
  }
  .dialog-footer{
      text-align: center;
  }
  </style>