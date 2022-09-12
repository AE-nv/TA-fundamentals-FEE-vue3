<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  btnText: string;
  label: string;
}>();

const emit = defineEmits(["text"]);
const text = ref<string>();
const addResponse = () => {
  emit("text", text.value);
  text.value = "";
};
</script>
<template>
  <v-textarea auto-grow v-model="text" :label="props.label"></v-textarea>
  <v-btn @click="addResponse" :disabled="!text">{{ props.btnText }}</v-btn>
</template>
<style lang="scss"></style>
