<template>
  <div class="container mx-auto flex flex-col gap-5 mt-5">
    <header class="flex items-center gap-5">
      <h1 class="font-bold text-xl">Учётные записи</h1>
      <CreateButton v-model="isCreatingRecord" />
    </header>

    <main>
      <Message severity="secondary">
        <template #icon>
          <i class="pi pi-question-circle text-2xl!"></i>
        </template>
        <span>
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </span>
      </Message>

      <TableComp class="mt-5">
        <ExistingRecordComp
          v-for="(record, i) in recordsStore.records"
          :key="record.uuid"
          :index="i"
        >
        </ExistingRecordComp>
        <CreateRecordComp
          v-if="isCreatingRecord"
          @cancel-creating="isCreatingRecord = false"
        ></CreateRecordComp>
      </TableComp>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Message } from "primevue";
import TableComp from "./components/table/TableComp.vue";
import ExistingRecordComp from "./components/table/cells/ExistingRecordComp.vue";
import CreateRecordComp from "./components/table/cells/CreateRecordComp.vue";
import CreateButton from "./components/ui/CreateButton.vue";
import { useRecordsStore } from "./models/useRecordsStore";
import { ref } from "vue";

const recordsStore = useRecordsStore();
const isCreatingRecord = ref(false);
</script>

<style scoped></style>
