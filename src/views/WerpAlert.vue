<template>
  <div>
    <Modal v-model="modalIsShow" :title="props.title" :width="650">
      <div>{{ props.content }}</div>
      <template #footer>
        <Button @click="modelCancel">關閉</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from 'view-ui-plus';

const props = defineProps({
  type: String,
  title: String,
  content: String,
  isShow: Boolean,
});
const modalIsShow = ref(props.isShow);
const emit = defineEmits(['update:isShow']);

watch(
  () => props.isShow,
  (newIsShow) => {
    modalIsShow.value = newIsShow;
  }
);

watch(
  () => modalIsShow.value,
  () => {
    emit('update:isShow', modalIsShow.value);
  }
);

function modelCancel() {
  modalIsShow.value = false;
}
</script>
