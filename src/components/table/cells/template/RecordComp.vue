<template>
  <Form
    ref="form"
    class="contents"
    @submit="onSubmit"
    :resolver
    v-slot="$form"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    :initialValues
  >
    <div class="flex items-center">
      <Textarea
        name="tag"
        :class="inputsClasses"
        @keypress.prevent.enter="emitSubmit"
        rows="1"
        :maxlength="50"
        auto-resize
        fluid
      />
    </div>

    <FormField
      class="flex items-center justify-center"
      :validate-on-value-update="true"
      :validate-on-blur="false"
    >
      <Select
        name="type"
        :class="inputsClasses"
        :options="typesOptions as any"
        option-value="type"
        option-label="title"
        fluid
      />
    </FormField>

    <div class="flex items-center" :class="{ 'col-span-2': $form.type?.value == 'ldap' }">
      <InputText
        name="login"
        :class="inputsClasses"
        @keypress.prevent.enter="emitSubmit"
        :invalid="$form.username?.invalid"
        :maxlength="100"
        fluid
      />
    </div>

    <div class="flex items-center" :hidden="$form.type?.value == 'ldap'">
      <PasswordComp
        name="password"
        class="grow"
        @keypress.enter.prevent="emitSubmit"
        :invalid="$form.password?.invalid"
        :feedback="false"
        :maxlength="100"
        :inputsClasses
        toggle-mask
        fluid
      />
    </div>

    <div class="flex items-center justify-center">
      <Button
        class="aspect-square! text-red-400! border-red-400! hover:bg-red-400/10!"
        @click="handleClick"
        :title="buttonTitle"
        outlined
      >
        <i class="pi" :class="buttonIcon"></i>
      </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { Button, InputText, Select, Textarea } from "primevue";
import { typesOptions, type UserRaw } from "@/models/recordsInterface";
import { Form, FormField, type FormResolverOptions, type FormSubmitEvent } from "@primevue/forms";
import PasswordComp from "@/components/ui/PasswordComp.vue";
const form = useTemplateRef<HTMLFormElement>("form");

interface Emits {
  clickButton: [];
  submitValidRecord: [value: FormSubmitEvent];
}

interface Props {
  initValues?: UserRaw;
  buttonIcon: string;
  buttonTitle?: string;
  inputsClasses?: string;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const initialValues = ref<UserRaw>(
  props.initValues || {
    tag: "",
    type: "local",
    login: "",
    password: "",
  },
);

const resolver = ({ values }: FormResolverOptions) => {
  const errors: Record<keyof UserRaw, any[]> = {
    tag: [],
    type: [],
    login: [],
    password: [],
  };

  if (typeof values.login != "string" || values.login == "") {
    errors.login.push({ type: "required", message: "Login is required" });
  }

  if (values.type == "local" && values.password == "") {
    errors.password.push({ type: "required", message: "Password is required" });
  }

  form.value?.submit();
  return { values, errors };
};

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    emit("submitValidRecord", e);
  }
};

const handleClick = () => {
  emit("clickButton");
};

const emitSubmit = () => {
  form.value?.submit();
};
</script>

<style scoped></style>
