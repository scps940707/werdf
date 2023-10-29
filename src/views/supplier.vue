<template>
  <div>
    <Card>
      <!-- <div style="display: flex"> -->
      <div class="condition-block">
        <Space>
          <span>供應商</span>
          <Input v-model="searchCondition.supplier" style="width: 360px" />
        </Space>
        <Space>
          <label>統一編號</label>
          <Input
            v-model="searchCondition.unifiedBusinessNo"
            style="width: 180px"
        /></Space>
        <Space>
          <label>地址</label>
          <Input v-model="searchCondition.address" style="width: 520px" />
        </Space>
        <Space>
          <label>電子郵件</label>
          <Input v-model="searchCondition.email" style="width: 260px" />
        </Space>
        <Space>
          <label>負責人／聯絡人</label>
          <Input v-model="searchCondition.name" style="width: 120px" />
        </Space>
        <Space>
          <label>負責人電話／聯絡人電話</label>
          <Input v-model="searchCondition.phone" style="width: 120px" />
        </Space>
      </div>
      <div class="div-search">
        <Button @click="btnSearch" icon="md-search">查詢</Button>
        <Button @click="btnReset" icon="md-backspace">重設</Button>
      </div>
      <!-- </div> -->
    </Card>

    <Space class="div-add-trash">
      <Button icon="md-add" @click="isClickAddBtn(true)">新增</Button>
      <Button icon="md-trash" @click="btnDelectClick">刪除</Button>
    </Space>

    <Table
      :columns="columns"
      :data="data"
      @on-select="checkboxSelect"
      @on-select-cancel="checkboxCancel"
      @on-select-all-cancel="selectAllCancel"
      @on-select-all="selectAll"
    >
      <template #action="{ index }">
        <Button
          icon="md-create"
          type="primary"
          @click="isClickAddBtn(false, index)"
        ></Button>
      </template>
    </Table>
    <Page
      class="page"
      :model-value="searchCondition.page"
      :total="total"
      :page-size="searchCondition.pageSize"
      @on-change="onChange"
      @on-page-size-change="onPageSizeChange"
      @on-prev="onPrev"
      @on-next="onNext"
      show-total
      show-sizer
      show-elevator
    />

    <supplierModal
      v-model:is-show="isShow"
      :isAdd="modalIsAdd"
      :rowData="rowData"
    />
  </div>
</template>

<script setup lang="ts">
import expandRow from '@/views/supplierTabelRow.vue';
import { SearchCondition } from '@/types/supplier.ts';
import supplierModal from '@/views/supplierModal.vue';
import { getPagination, deleteSuppliers } from '@/apis/supplier-api.ts';
import { ref, reactive, onMounted, h } from 'vue';
import { Input, Card, Button, Table, Page, Space, Modal } from 'view-ui-plus';

const isShow = ref(false); // modal是否為顯示
const modalIsAdd = ref(true); // true時modal為新增 false時modal為編輯
const data = ref([]);
let selectedDataId: string[] = [];
const searchCondition = reactive(new SearchCondition());
const total = ref(0);
const columns = [
  {
    type: 'selection',
    width: 60,
    align: 'center',
  },
  {
    type: 'expand',
    width: 50,
    render: (h, row) => {
      //console.log(row);
      return h(expandRow, row);
    },
  },
  // {
  //   title: '供應商',
  //   key: 'id',
  // },
  {
    title: '供應商',
    key: 'supplier',
  },
  {
    title: '統一編號',
    key: 'unifiedBusinessNo',
  },
  {
    title: '負責人',
    key: 'head',
  },
  {
    title: '負責人電話',
    key: 'headPhone1',
    render: (h, params: object) => {
      const rowData = params.row;
      if (rowData.headPhone1 == '') {
        return rowData.headPhone2;
      } else {
        return rowData.headPhone1;
      }
    },
  },
  {
    title: '聯絡人',
    key: 'contactPerson',
  },
  {
    title: '聯絡人電話',
    key: 'contactPersonPhone1',
    render: (h, params: object) => {
      const rowData = params.row;
      if (rowData.contactPersonPhone1 == '') {
        return rowData.contactPersonPhone2;
      } else {
        return rowData.contactPersonPhone1;
      }
    },
  },
  {
    title: '備註',
    key: 'remark',
  },
  {
    title: '功能',
    slot: 'action',
  },
];
let rowData: object = {};

onMounted(async () => {
  getPaginationData();
});

//查詢
function btnSearch() {
  getPaginationData();
}

//重置查詢條件
function btnReset() {
  searchCondition.supplier = '';
  searchCondition.unifiedBusinessNo = '';
  searchCondition.address = '';
  searchCondition.name = '';
  searchCondition.email = '';
  searchCondition.phone = '';
}

//下一頁
function onNext(nextPage: number) {
  searchCondition.page = nextPage;
  getPaginationData();
}

//上一頁
function onPrev(prevPage: number) {
  searchCondition.page = prevPage;
  getPaginationData();
}

//每頁筆數變更
function onPageSizeChange(pageSize: number) {
  searchCondition.pageSize = pageSize;
  getPaginationData();
}

//頁碼變更
function onChange(page: number) {
  searchCondition.page = page;
  getPaginationData();
}

async function getPaginationData() {
  let result = await getPagination(searchCondition);
  data.value = result.data.suppliers;
  total.value = result.data.total;
}

//核取方塊選擇時
function checkboxSelect(selection: object, row: object) {
  //添加核取方塊所選ID
  selectedDataId.push(row.id);
}

//核取方塊取消選取時
function checkboxCancel(selection: object, row: object) {
  //移除核取方塊取消選取的ID
  let cancelIndex = selectedDataId.indexOf(row.id);
  selectedDataId.splice(cancelIndex, 1);
}

//刪除
function btnDelectClick() {
  if (selectedDataId.length == 0) {
    printMessage('warning', '請勾選欲刪除資料');
  } else {
    Modal.confirm({
      title: '是否刪除?',
      content: '目前選取共 ' + selectedDataId.length + ' 筆',
      onOk: async () => {
        await deleteSuppliers(selectedDataId)
          .then((response) => {
            printMessage('success', '刪除成功');
          })
          .catch((error) => {
            printMessage('warning', '刪除失敗');
          });
      },
      onCancel: () => {
        console.log('caancel');
      },
    });
  }
}

//點擊新增或修改按鈕
function isClickAddBtn(isAdd: boolean, index?: number) {
  if (index != undefined) {
    rowData = data.value[index];
  }

  isShow.value = true;
  modalIsAdd.value = isAdd;
}

//核取方快全取消
function selectAllCancel() {
  selectedDataId = [];
}

//核取方快全選
function selectAll(selection: any[]) {
  selection.forEach(function (item) {
    selectedDataId.push(item.id);
  });
}

//訊息
function printMessage(type: string, content: string) {
  let modalObject = {
    title: '訊息提示',
    content: content,
  };

  switch (type) {
    case 'info':
      Modal.info(modalObject);
      break;
    case 'success':
      Modal.success(modalObject);
      break;
    case 'warning':
      Modal.warning(modalObject);
      break;
    case 'error':
      Modal.error(modalObject);
      break;
  }
}
</script>

<style lang="scss" scoped>
:deep(.ivu-card-body) {
  display: flex;
}
.div-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}

.condition-block {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.div-add-trash {
  display: flex;
  justify-content: flex-end;
  margin: 8px 0px;
}

.page {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
</style>
