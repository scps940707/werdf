<template>
  <div>
    <Card>
      <Space style="width: 100%">
        供應商
        <Input />
        統一編號
        <Input />
      </Space>
      <Space style="width: 100%">
        地址
        <Input />
        電子郵件
        <Input />
        <Button icon="md-search">查詢</Button>
        <Button icon="md-backspace">重設</Button>
      </Space>
      <Space style="width: 100%">
        負責人／聯絡人
        <Input />
        負責人電話／聯絡人電話
        <Input />
      </Space>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Input, Card, Space, Button } from 'view-ui-plus';
const msg = ref<string>('123');
console.log(msg.value);
</script>

<style lang="scss" scoped></style>
