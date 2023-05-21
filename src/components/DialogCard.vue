<script setup>
defineProps({
  dialog: Boolean,
  url: String,
})
</script>

<template>
  <v-dialog
    class="dialog-card"
    :model-value="dialog"
    @update:modelValue="$emit('closeDialog', false)"
  >
    <v-card class="rounded-lg card">
      <v-img :src="url" aspect-ratio="1.35" cover></v-img>
      <div class="navigation">
        <div class="navigation_btns">
          <v-icon @click="$emit('download', url)" icon="mdi-download"></v-icon>
          <v-icon
            @click="$emit('closeDialog', false)"
            icon="mdi-close"
          ></v-icon>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@use '../styles/components/Card.scss';

.dialog-card {
  justify-content: center;
  max-width: 1024px;
}
</style>
