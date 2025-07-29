<template>
  <Button
    outlined
    class="text-black! border-surface-300! aspect-square! rounded-sm!"
    @click="isCreatingRecord = !isCreatingRecord"
  >
    <i
      class="pi pi-plus text-sm! transition-[rotate] duration-150"
      :class="{ 'rotate-45': isCreatingRecord }"
    ></i>
  </Button>
</template>

<script setup lang="ts">
import { Button } from "primevue";

const isCreatingRecord = defineModel<boolean>();
</script>

<style scoped></style>
