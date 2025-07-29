<template>
  <div></div>
  <div class="container mx-auto flex flex-col gap-5 mt-5">
    <header class="flex items-center gap-5">
      <h1 class="font-bold text-xl">Учётные записи</h1>
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
      </TableComp>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Message } from "primevue";
import TableComp from "./components/table/TableComp.vue";
import { ref } from "vue";

</script>

<style scoped></style>
