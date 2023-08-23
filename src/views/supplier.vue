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
      <Button icon="md-add" @click="IsClickAddBtn()">新增</Button>
      <Button icon="md-trash">刪除</Button>
    </Space>

    <Table :columns="columns" :data="data"></Table>
    <Page class="page" :total="100" show-total show-sizer show-elevator />

    <Modal
      v-model="modalIsShow"
      :title="modalTitle"
      @on-ok="btnClickOk"
      @on-visible-change="modalVisibleChange"
      :loading="modalLoading"
      :width="768"
    >
      <div class="modal-content">
        <div>
          <label style="width: 50px">供應商</label>
          <Input />
        </div>
        <div>
          <Space>
            <label style="width: 50px">統一編號</label>
            <Input />
          </Space>
          <Space>
            <label style="width: 50px">電子郵件</label>
            <Input />
          </Space>
        </div>
        <div>
          <label style="width: 50px">供應商地址1</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">供應商地址2</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">負責人</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">負責人電話1</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">負責人電話2</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">聯絡人</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">聯絡人電話1</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">聯絡人電話2</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">其他聯絡方式1</label>
          <Input />
        </div>
        <div>
          <label style="width: 50px">其他聯絡方式2</label>
          <Input />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Input, Card, Button, Table, Page, Modal, Space } from 'view-ui-plus';

// const msg = ref<string>('123');
// console.log(msg.value);

const modalIsShow = ref(false);
const modalLoading = ref(true);
const modalTitle = ref('');
const modalIsAdd = ref(true);

function IsClickAddBtn() {
  if (modalIsAdd.value) {
    console.log('1');
    modalTitle.value = '新增';
  } else {
    modalTitle.value = '編輯';
  }
  modalIsShow.value = true;
}

const modalVisibleChange = (showStatus: boolean) => {
  if (!showStatus) {
    console.log('關閉時清除資料');
  }
};

function btnClickOk() {
  console.log('新增資料到後端');
  modalLoading.value = false; //關閉視窗
}

const columns = ref([
  {
    type: 'expand',
    width: 50,
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Address',
    key: 'address',
  },
]);

const data = ref([
  {
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park',
    job: 'Data engineer',
    interest: 'badminton',
    birthday: '1991-05-14',
    book: 'Steve Jobs',
    movie: 'The Prestige',
    music: 'I Cry',
  },
  {
    name: 'Jim Green',
    age: 25,
    address: 'London No. 1 Lake Park',
    job: 'Data Scientist',
    interest: 'volleyball',
    birthday: '1989-03-18',
    book: 'My Struggle',
    movie: 'Roman Holiday',
    music: 'My Heart Will Go On',
  },
]);
</script>

<style lang="scss" scoped>
.modal-content {
  gap: 8px;
}
.modal-content div {
  display: flex;
  margin: 4px;
}
.modal-content label {
  display: flex;
  justify-content: center; //水平置中
  align-items: center; //垂直置中
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
