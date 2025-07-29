<template>
  <RecordComp
    button-icon="pi-trash"
    button-title="Удалить запись"
    :init-values="rawRecord"
    inputs-classes="animate-fadein"
    @clickButton="deleteRecord"
    @submitValidRecord="onSubmit"
  />
</template>

<script setup lang="ts">
import { type UserRaw } from "@/models/recordsInterface";
import { useRecordsStore } from "@/models/useRecordsStore";
import { type FormSubmitEvent } from "@primevue/forms";
import RecordComp from "./template/RecordComp.vue";
const recordsStore = useRecordsStore();

const { index } = defineProps<{ index: number }>();

const rawRecord = recordsStore.getRawRecordByIndex(index);

const deleteRecord = () => {
  recordsStore.deleteRecord(index);
};

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    recordsStore.changeRecord(index, e.values as UserRaw);
  }
};
</script>

<style scoped></style>
