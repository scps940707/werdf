<template>
  <div>
    <Card style="display: flex">
      <!-- <div style="display: flex"> -->
      <div class="condition-block">
        <Space>
          <span>供應商</span>
          <Input style="width: 360px" />
        </Space>
        <Space>
          <label>統一編號</label>
          <Input style="width: 180px" />
        </Space>
        <Space>
          <label>地址</label>
          <Input style="width: 520px" />
        </Space>
        <Space>
          <label>電子郵件</label>
          <Input style="width: 260px" />
        </Space>
        <Space>
          <label>負責人／聯絡人</label>
          <Input style="width: 120px" />
        </Space>
        <Space>
          <label>負責人電話／聯絡人電話</label>
          <Input style="width: 120px" />
        </Space>
      </div>
      <div class="div-search">
        <Button icon="md-search">查詢</Button>
        <Button icon="md-backspace">重設</Button>
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
    <Page class="page" :total="100" show-total show-sizer show-elevator />

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
        <!-- <FormItem>
          <Button type="primary">Signin</Button>
        </FormItem> -->
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
import {
  add as addSuppler,
  getAll,
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
} from 'view-ui-plus';

// const msg = ref<string>('123');
// console.log(msg);

const modalIsShow = ref(false); // modal是否為顯示
const modalTitle = ref(''); // modal標題
const modalIsAdd = ref(true); // true時modal為新增 false時modal為編輯
const data = ref([]);
let selectedDataId: string[] = [];
const formRef = ref();

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
  },
  {
    title: '聯絡人',
    key: 'contactPerson',
  },
  {
    title: '聯絡人電話',
    key: 'contactPersonPhone1',
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

const supplier = reactive({
  id: '',
  creator: '',
  updater: '',
  remark: '',
  isDeleted: false,
  supplier: '',
  unifiedBusinessNo: '',
  email: '',
  address1: '',
  address2: '',
  head: '',
  headPhone1: '',
  headPhone2: '',
  contactPerson: '',
  contactPersonPhone1: '',
  contactPersonPhone2: '',
  otherContact1: '',
  otherContact2: '',
});

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
  getInitData();
});

function modelCancel() {
  modalIsShow.value = false; //新增編輯完後 關閉視窗
}

async function getInitData() {
  let result = await getAll();
  //console.log(result.data);
  data.value = result.data;
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
    getInitData();
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
    //console.log(data.value[index].address1);
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

//全選反選
// function handleSelectAll(status: boolean) {
//   console.log(status);

//   this.$refs.selection.selectAll(status);
// }
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
