<template>
  <div>
    <!-- <colgroup>
        <col style="width: 15%" />
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: 55%" />
      </colgroup> -->
    <table class="table" style="width: 100%">
      <tr>
        <td>電子郵件</td>
        <td colspan="3">
          {{ data.email }}
        </td>
      </tr>
      <tr class="twoData">
        <td>負責人電話 2</td>
        <td>{{ data.headPhone2 }}</td>
        <td>供應商地址 1</td>
        <td>{{ data.address1 }}</td>
      </tr>
      <tr>
        <td>聯絡人電話 2</td>
        <td>{{ data.contactPersonPhone2 }}</td>
        <td>供應商地址2</td>
        <td>{{ data.address2 }}</td>
      </tr>
      <tr>
        <td>其他聯絡方式 1</td>
        <td colspan="3">{{ data.otherContact1 }}</td>
      </tr>
      <tr>
        <td>其他聯絡方式 2</td>
        <td colspan="3">{{ data.otherContact2 }}</td>
      </tr>
      <tr>
        <td>備註</td>
        <td colspan="3">{{ data.remark }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { Space } from 'view-ui-plus';

const props = defineProps({
  row: Object,
});

const data = props.row;
</script>
<style>
.table tr td:nth-child(odd) {
  width: 150px;
  background-color: red;
}
</style>
