<template>
  <div>
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
        <FormItem label="供應商" prop="supplierName">
          <Input v-model="supplier.supplierName"></Input>
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
import { ref, reactive, watch, defineEmits } from 'vue';
import { Input, Modal, Form, FormItem, Button } from 'view-ui-plus';
import { Supplier } from '@/types/supplier.ts';
import {
  add as addSuppler,
  update as updataSupplier,
} from '@/apis/supplier-api.ts';

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdd: Boolean,
  rowData: Object,
});

const formRef = ref();
const modalIsShow = ref(props.isShow); // modal是否為顯示
const modalTitle = ref(''); // modal標題
const modalIsAdd = ref(true); // true時modal為新增 false時modal為編輯
let supplier = reactive(new Supplier());
const ruleValidate = {
  supplierName: [
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
const emit = defineEmits(['update:isShow']);

watch(
  () => props.isShow,
  (newIsShow) => {
    modalIsShow.value = newIsShow;
    modalIsAdd.value = props.isAdd;
    if (props.isAdd) {
      modalTitle.value = '新增';
    } else {
      modalTitle.value = '編輯';
      let rowData = props.rowData;
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
      supplier.supplierName = rowData.supplierName;
      supplier.unifiedBusinessNo = rowData.unifiedBusinessNo;
      supplier.updater = rowData.updater;
    }
  }
);
watch(
  () => modalIsShow.value,
  () => {
    // console.log(newModalIsShow);
    emit('update:isShow', modalIsShow.value);
  }
);

//新增或編輯送出
async function btnClickOk() {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (modalIsAdd.value) {
        //新增
        await addSuppler(supplier)
          .then(() => {
            modalIsShow.value = false;
            printMessage('success', '新增成功');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              let errorMessage = modalErrorFormat(error.response.data.errors);
              printMessage('error', errorMessage); //.net
              //printMessage('error', error.response.data);//.java
            } else {
              console.error('Error:', error);
            }
          });
      } else {
        //編輯
        await updataSupplier(supplier)
          .then(() => {
            modalIsShow.value = false;
            printMessage('success', '編輯成功');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              let errorMessage = modalErrorFormat(error.response.data.errors);
              printMessage('error', errorMessage); //.net
              //printMessage('error', error.response.data);//java
            } else {
              console.error('Error:', error);
            }
          });
      }
    }
  });
}

function modelCancel() {
  modalIsShow.value = false; //新增編輯完後 關閉視窗
}

//關閉model時清除資料
function modalVisibleChange(showStatus: boolean) {
  if (!showStatus) {
    formRef.value.resetFields();
  }
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

//後端modal回傳驗證錯誤訊息格式化
function modalErrorFormat(errors: any) {
  let errorsKeyLen = Object.keys(errors).length;
  let output = '';
  let currentIndex = 0;
  for (const key in errors) {
    currentIndex++;
    if (Object.hasOwnProperty.call(errors, key)) {
      output += errors[key][0];
      if (currentIndex != errorsKeyLen) {
        output += '，';
      }
    }
  }
  return output;
}
</script>
