<template>
  <RecordComp
    button-icon="pi-times"
    button-title="Отменить создание"
    inputs-classes="bg-primary-50! animate-fadein"
    @clickButton="cancelCreating"
    @submitValidRecord="onSubmit"
  />
</template>

<script setup lang="ts">
import RecordComp from "./template/RecordComp.vue";
import { useRecordsStore } from "@/models/useRecordsStore";
import { type UserRaw } from "@/models/recordsInterface";
import { type FormSubmitEvent } from "@primevue/forms";

const recordsStore = useRecordsStore();

const emit = defineEmits<{ cancelCreating: [] }>();

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    recordsStore.addRecord(e.values as UserRaw);
    e.reset();
  }
};

const cancelCreating = () => {
  emit("cancelCreating");
};
</script>

<style scoped></style>
