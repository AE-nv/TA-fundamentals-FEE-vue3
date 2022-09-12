<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  enabled: boolean;
}>();

const emit = defineEmits(["filesAdded"]);

const fileInput = ref(null);

const openFileSelection = () => {
  if (!props.enabled || !fileInput.value) {
    return;
  }
  (fileInput.value as unknown as HTMLElement).click();
};

const onDragOver = (e: DragEvent) => {
  if (!props.enabled) {
    return;
  }
  e.preventDefault();
};

const onDrop = (e: DragEvent) => {
  if (!props.enabled) {
    return;
  }
  e.preventDefault();
  if (e && e.dataTransfer && e.dataTransfer.files) {
    const files = e.dataTransfer.files;
    const result: File[] = [];
    for (let i = 0; i < files.length; i++) {
      result.push(files.item(i) as File);
    }
    emit("filesAdded", result);
  }
};

const onFileChanged = (e: any) => {
  const files: FileList = e.target.files;
  const result: File[] = [];
  for (let i = 0; i < files.length; i++) {
    result.push(files.item(i) as File);
  }
  emit("filesAdded", result);
};
</script>

<template>
  <div
    class="dropzone"
    v-on:click="openFileSelection"
    v-on:dragover="onDragOver"
    v-on:drop="onDrop"
    v-bind:class="{ disabled: !enabled }"
  >
    <div>Add files</div>
    <input
      ref="fileInput"
      class="file-input"
      type="file"
      multiple
      v-on:change="onFileChanged"
    />
  </div>
</template>

<style lang="scss" scoped>
.dropzone {
  position: relative;
  border: 3px dashed #42b983;
  color: #42b983;
  font: bold 24px/200px arial;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}

.hightlight {
  background-color: #b3dbc9;
}

.disabled {
  border: 3px dashed grey;
  color: grey;
}

.file-input {
  display: none;
}
</style>
