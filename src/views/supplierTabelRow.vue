<template>
  <div>
    <table>
      <tr>
        <th>負責人電話 1</th>
        <td>{{ data.headPhone1 }}</td>
        <th>負責人電話 2</th>
        <td>{{ data.headPhone2 }}</td>
      </tr>
      <tr>
        <th>聯絡人電話 1</th>
        <td>{{ data.contactPersonPhone1 }}</td>
        <th>聯絡人電話 2</th>
        <td>{{ data.contactPersonPhone2 }}</td>
      </tr>
      <tr>
        <th>電子郵件</th>
        <td colspan="3">
          {{ data.email }}
        </td>
      </tr>
      <tr>
        <th>供應商地址 1</th>
        <td colspan="3">{{ data.address1 }}</td>
      </tr>
      <tr>
        <th>供應商地址 2</th>
        <td colspan="3">{{ data.address2 }}</td>
      </tr>
      <tr>
        <th>其他聯絡方式 1</th>
        <td colspan="3">{{ data.otherContact1 }}</td>
      </tr>
      <tr>
        <th>其他聯絡方式 2</th>
        <td colspan="3">{{ data.otherContact2 }}</td>
      </tr>
      <tr>
        <th>備註</th>
        <td colspan="3">{{ data.remark }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  row: Object,
});

const data = props.row;
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}

table tr th {
  width: 150px;
  //background-color: red;
}
</style>
