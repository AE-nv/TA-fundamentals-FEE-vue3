<script setup lang="ts">
import NavigationComponent from "@/components/shared/NavigationComponent.vue";
import { googleApiService } from "@/services/GoogleApi.service";
import { reactive } from "vue";
import DropZoneComponent from "../shared/DropZoneComponent.vue";

const state = reactive<{ uploadedFiles: File[]; correctFiles: File[] }>({
  uploadedFiles: [],
  correctFiles: [],
});

const filesAdded = (files: File[]) => {
  files.forEach(async (file) => {
    state.uploadedFiles.push(file);
    const res = await googleApiService.detectLabels(file);
    const annotationDescriptions = res.responses[0].labelAnnotations.map(
      (_) => _.description
    );
    if (
      annotationDescriptions.includes("Chair") &&
      annotationDescriptions.includes("Red")
    ) {
      state.correctFiles.push(file);
    }
  });
};

const isFileCorrect = (file: File) =>
  state.correctFiles.map((_) => _.name).includes(file.name);

const isQuestComplete = () => !!state.correctFiles.length;
</script>

<template>
  <div>
    <navigation-component>
      <v-btn text @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn text @click="$router.go(-1)" :disabled="!isQuestComplete()"
        >Complete Quest</v-btn
      >
    </navigation-component>

    <div>
      <v-card>
        <v-container>
          <div>
            <h2 class="quest-header">Have a chair for me?<br /></h2>
            <div class="quest-info">
              <div>
                <p>My ideal chair has these characteristics:</p>
                <ul>
                  <li>Chair</li>
                  <li>Color: red</li>
                </ul>
              </div>
              <div class="quest-image">
                <v-img src="/Red_Chair.png"></v-img>
              </div>
            </div>
          </div>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <h3 class="quest-header">Add a picture of the chair you can offer</h3>

          <!--TODO 1: add the drop-zone element -->
          <DropZoneComponent :enabled="true" @filesAdded="filesAdded" />
          <!--TODO 2: show list of files that are uploaded -->
          <!--TODO 3: call function whenever a file is added that sends file to google api service -->
          <!--TODO 4: determine if result of google api contains required characteristics to complete quest -->
          <!--TODO 5: provide user feedback in the list of characteristics -->
          <v-card class="uploaded-files" v-if="state.uploadedFiles.length">
            <p>Files uploaded:</p>
            <ul>
              <li
                v-for="(uploadedFile, index) in state.uploadedFiles"
                :key="index"
                :class="
                  isFileCorrect(uploadedFile) ? 'correct-file' : 'wrong-file'
                "
              >
                {{ uploadedFile.name }}
              </li>
            </ul>
          </v-card>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.correct-file {
  color: green;
  font-weight: bold;
}

.wrong-file {
  color: red;
}
.quest-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
}

.quest-uploader {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.quest-image {
  width: 40%;
}

ul {
  list-style: disc;
}

.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}

// Define vars we'll be using
$brand-success: #5cb85c;
$loader-size: 7em;
$check-height: calc($loader-size/2);
$check-width: calc($check-height/2);
$check-left: calc($loader-size/6 + $loader-size/12);
$check-thickness: 6px;
$check-color: $brand-success;

.circle-loader {
  margin-bottom: calc($loader-size/2);
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-left-color: $check-color;
  animation: loader-spin 1.2s infinite linear;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: $loader-size;
  height: $loader-size;
}

.load-complete {
  -webkit-animation: none;
  animation: none;
  border-color: $check-color;
  transition: border 500ms ease-out;
}

.checkmark {
  display: none;

  &.draw:after {
    animation-duration: 800ms;
    animation-timing-function: ease;
    animation-name: checkmark;
    transform: scaleX(-1) rotate(135deg);
  }

  &:after {
    opacity: 1;
    height: $check-height;
    width: $check-width;
    transform-origin: left top;
    border-right: $check-thickness solid $check-color;
    border-top: $check-thickness solid $check-color;
    content: "";
    left: $check-left;
    top: $check-height;
    position: absolute;
  }
}

.uploaded-files {
  padding: 10px;
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: $check-width;
    opacity: 1;
  }
  40% {
    height: $check-height;
    width: $check-width;
    opacity: 1;
  }
  100% {
    height: $check-height;
    width: $check-width;
    opacity: 1;
  }
}
</style>
