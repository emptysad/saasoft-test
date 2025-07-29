<template>
  <FormField>
    <InputGroup>
      <InputText :class="inputsClasses" :type="show ? 'text' : 'password'" />
      <InputGroupAddon>
        <Button :class="inputsClasses" @click="show = !show" text class="h-full">
          <i class="pi" :class="show ? 'pi-eye-slash' : 'pi-eye'"></i>
        </Button>
      </InputGroupAddon>
    </InputGroup>
  </FormField>
</template>

<script setup lang="ts">
// Этот компонент появился, потому что оригинальный компонент Password в Primevue в последних версиях сломан

import { FormField } from "@primevue/forms";
import { Button, InputGroup, InputGroupAddon, InputText } from "primevue";
import { ref } from "vue";
const show = ref(false);
const props = defineProps<{ inputsClasses?: string }>();
</script>

<style scoped></style>
