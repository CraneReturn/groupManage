<template>
  <div>
    <div class="el-proper">
        <ul  class="avator-menu">
        <li  class="el-dropdown-menu__item" role="menuitem">
            <div data-v-bb6cd2d0="">个人中心</div>
        </li>

        <li  class="el-dropdown-menu__item" role="menuitem">
            <div data-v-bb6cd2d0="">退出系统</div>
        </li>
    </ul>
    </div>

  </div>
</template>

<script setup>

</script>
<style lang="less">
.el-proper{

    z-index: 2008;
    position: absolute;
    right: 0;
    .avator-menu{

        outline: black;
        background-color: #ffffff;
        border: black;
        border-radius:5px;
        box-shadow: none;
        left: 0;
        list-style: none;
        margin: 0;
        padding: 5px 0;
        position: relative;
        top: 0;
        // z-index: ;
        .el-dropdown-menu__item{
            align-items: center;
            color: black;
            cursor: pointer;
            display: flex;
            font-size: 14px;
            line-height: 22px;
            list-style: none;
            margin: 0;
            outline: none;
            padding: 5px 16px;
            white-space: nowrap;
        }
}
}

</style>