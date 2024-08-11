<template>
  <div class="grades">
    <div class="top">
      <button v-for="index in 10">{{ number++ }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const number = ref(2019);
</script>
<style lang="scss"></style>
