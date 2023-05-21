<script setup>
defineProps({
  id: String,
  url: String,
  author: String,
})
</script>

<template>
  <v-card class="mx-auto rounded-lg card" variant="tonal">
    <v-img
      :src="`https://picsum.photos/id/${id}/540/400.webp`"
      aspect-ratio="1.35"
      cover
    ></v-img>
    <div class="navigation">
      <div class="navigation_btns">
        <v-icon @click="$emit('download', url)" icon="mdi-download"></v-icon>
        <v-icon @click="$emit('openDialog', url)" icon="mdi-magnify"></v-icon>
      </div>
      <div class="navigation_copy">
        <h4>{{ author }}</h4>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@use '../styles/components/Card.scss';
</style>
