<template>
  <div>
    <Menu>
      <MenuItem name="supplier" to="supplier">進貨商管理</MenuItem>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuItem } from 'view-ui-plus';
</script>

<style lang="scss" scoped>
.ivu-menu-item {
  font-size: 18px;
}
</style>
