<template>
  <div>
    <Card style="display: flex">
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
      <Button icon="md-add" @click="IsClickAddBtn(true)">新增</Button>
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
          @click="IsClickAddBtn(false, index)"
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

    <Modal
      v-model="modalIsShow"
      :model="supplier"
      :title="modalTitle"
      :width="650"
      @on-visible-change="modalVisibleChange"
    >
      <Form
        :label-width="110"
        :model="supplier"
        ref="formRef"
        :rules="ruleValidate"
        :show-message="true"
      >
        <FormItem label="供應商" prop="supplier">
          <Input v-model="supplier.supplier"></Input>
        </FormItem>
        <div style="display: flex">
          <FormItem label="統一編號" prop="unifiedBusinessNo">
            <Input v-model="supplier.unifiedBusinessNo"></Input>
          </FormItem>
          <FormItem label="電子郵件" prop="email">
            <Input v-model="supplier.email"></Input>
          </FormItem>
        </div>
        <FormItem label="供應商地址 1" prop="address1">
          <Input v-model="supplier.address1"></Input>
        </FormItem>
        <FormItem label="供應商地址 2" prop="address2">
          <Input v-model="supplier.address2"></Input>
        </FormItem>
        <FormItem label="負責人" prop="head">
          <Input v-model="supplier.head"></Input>
        </FormItem>
        <div style="display: flex">
          <FormItem label="負責人電話 1" prop="headPhone1" inline>
            <Input v-model="supplier.headPhone1"></Input>
          </FormItem>
          <FormItem label="負責人電話 2" prop="headPhone2" inline>
            <Input v-model="supplier.headPhone2"></Input>
          </FormItem>
        </div>
        <FormItem label="聯絡人" prop="contactPerson">
          <Input v-model="supplier.contactPerson"></Input>
        </FormItem>
        <div style="display: flex">
          <FormItem label="聯絡人電話 1" prop="contactPersonPhone1">
            <Input v-model="supplier.contactPersonPhone1"></Input>
          </FormItem>
          <FormItem label="聯絡人電話 2" prop="contactPersonPhone2">
            <Input v-model="supplier.contactPersonPhone2"></Input>
          </FormItem>
        </div>
        <FormItem label="其他聯絡方式 1" prop="otherContact1">
          <Input v-model="supplier.otherContact1"></Input>
        </FormItem>
        <FormItem label="其他聯絡方式 2" prop="otherContact2">
          <Input v-model="supplier.otherContact2"></Input>
        </FormItem>
        <FormItem label="備註" prop="remark">
          <Input v-model="supplier.remark"></Input>
        </FormItem>
      </Form>
      <template #footer>
        <Button @click="modelCancel">取消</Button>
        <Button type="primary" @click="btnClickOk">確定</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import expandRow from '@/views/supplierTabelRow.vue';
import { Supplier, SearchCondition } from '@/types/supplier.ts';
import {
  add as addSuppler,
  getPagination,
  updata as updataSupplier,
  deleteSuppliers,
} from '@/apis/supplier-api.ts';
import { ref, reactive, onMounted, h } from 'vue';
import {
  Input,
  Card,
  Button,
  Table,
  Page,
  Modal,
  Space,
  Form,
  FormItem,
  Email,
} from 'view-ui-plus';

// const msg = ref<string>('123');
// console.log(msg);

const modalIsShow = ref(false); // modal是否為顯示
const modalTitle = ref(''); // modal標題
const modalIsAdd = ref(true); // true時modal為新增 false時modal為編輯
const data = ref([]);
let selectedDataId: string[] = [];
const formRef = ref();
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
  {
    title: '供應商',
    key: 'id',
  },
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

let supplier = reactive(new Supplier());

const ruleValidate = {
  supplier: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { max: 30, message: '字數超出限制', trigger: 'blur' },
  ],
  unifiedBusinessNo: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { len: 8, message: '字數必須為 8 碼', trigger: 'blur' },
    {
      type: 'number',
      message: '必須是數字',
      trigger: 'blur',
      transform: (value: string) => Number(value),
    },
  ],
  email: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { type: 'email', message: '必須是信箱格式', trigger: 'blur' },
    { max: 50, message: '字數超出限制', trigger: 'change' },
  ],
  address1: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { max: 100, message: '字數超出限制', trigger: 'change' },
  ],
  address2: [{ max: 100, message: '字數超出限制', trigger: 'change' }],
  head: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { max: 20, message: '字數超出限制', trigger: 'change' },
  ],
  headPhone1: [
    { max: 20, message: '字數超出限制', trigger: 'change' },
    {
      type: 'number',
      message: '必須是數字',
      trigger: 'blur',
      transform: (value: string) => Number(value),
    },
  ],
  headPhone2: [
    { max: 20, message: '字數超出限制', trigger: 'blur' },
    {
      type: 'number',
      message: '必須是數字',
      trigger: 'blur',
      transform: (value: string) => Number(value),
    },
  ],
  contactPerson: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { max: 20, message: '字數超出限制', trigger: 'change' },
  ],
  contactPersonPhone1: [
    { required: true, message: '欄位不可為空', trigger: 'blur' },
    { max: 20, message: '字數超出限制', trigger: 'change' },
    {
      type: 'number',
      message: '必須是數字',
      trigger: 'blur',
      transform: (value: string) => Number(value),
    },
  ],
  contactPersonPhone2: [
    { max: 20, message: '字數超出限制', trigger: 'change' },
    {
      type: 'number',
      message: '必須是數字',
      trigger: 'blur',
      transform: (value: string) => Number(value),
    },
  ],
  otherContact1: [{ max: 100, message: '字數超出限制', trigger: 'change' }],
  otherContact2: [{ max: 100, message: '字數超出限制', trigger: 'change' }],
  remark: [{ max: 200, message: '字數超出限制', trigger: 'change' }],
};

onMounted(async () => {
  getPaginationData();
});

//查詢
function btnSearch() {
  console.log(searchCondition);

  getPaginationData();
}

//重置查詢條件
function btnReset() {
  searchCondition.supplier = '';
  searchCondition.unifiedBusinessNo = '';
  searchCondition.address = '';
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

function modelCancel() {
  modalIsShow.value = false; //新增編輯完後 關閉視窗
}

async function getPaginationData() {
  let result = await getPagination(searchCondition);
  data.value = result.data.suppliers;
  total.value = result.data.total;
  // console.log(result.data.suppliers);
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
async function btnDelectClick() {
  if (selectedDataId.length == 0) {
    //加入訊息
  } else {
    console.log(await deleteSuppliers(selectedDataId));
    getPaginationData();
  }
}

//點擊新增或修改按鈕
function IsClickAddBtn(isAdd: boolean, index?: number) {
  modalIsAdd.value = isAdd;
  if (modalIsAdd.value) {
    modalTitle.value = '新增';
  } else {
    modalTitle.value = '編輯';
    let rowData = data.value[index];
    supplier.id = rowData.id;
    supplier.address1 = rowData.address1;
    supplier.address2 = rowData.address2;
    supplier.contactPerson = rowData.contactPerson;
    supplier.contactPersonPhone1 = rowData.contactPersonPhone1;
    supplier.contactPersonPhone2 = rowData.contactPersonPhone2;
    supplier.creator = rowData.creator;
    supplier.email = rowData.email;
    supplier.head = rowData.head;
    supplier.headPhone1 = rowData.headPhone1;
    supplier.headPhone2 = rowData.headPhone2;
    supplier.id = rowData.id;
    supplier.otherContact1 = rowData.otherContact1;
    supplier.otherContact2 = rowData.otherContact2;
    supplier.remark = rowData.remark;
    supplier.supplier = rowData.supplier;
    supplier.unifiedBusinessNo = rowData.unifiedBusinessNo;
    supplier.updater = rowData.updater;
  }
  modalIsShow.value = true;
}

//關閉model時清除資料
function modalVisibleChange(showStatus: boolean) {
  if (!showStatus) {
    formRef.value.resetFields();
  }
}

//新增或編輯送出
function btnClickOk() {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (modalIsAdd.value) {
        //新增
        let test = await addSuppler(supplier);
        if (test.status == 200) {
          console.log('新增成功');
          modalIsShow.value = false;
        } else {
          console.log('新增失敗');
        }
      } else {
        //編輯
        let test = await updataSupplier(supplier);
        if (test.status == 200) {
          console.log('編輯成功');
          modalIsShow.value = false;
        } else {
          console.log('編輯失敗');
        }
      }
    }
  });

  //modalIsShow.value = false; //新增編輯完後 關閉視窗
}

//核取方快全取消
function selectAllCancel() {
  selectedDataId = [];
}

//核取方快全選
function selectAll(selection: any[]) {
  console.log(selection);

  selection.forEach(function (item) {
    selectedDataId.push(item.id);
  });
}
</script>

<style lang="scss" scoped>
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
