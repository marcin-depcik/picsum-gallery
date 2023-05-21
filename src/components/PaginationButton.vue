<script setup>
defineProps({
  text: String,
  disabled: Boolean,
})

const primeColor = '#6359e9'
</script>

<template>
  <v-btn
    class="mx-2"
    variant="outlined"
    @click="$emit('handleClick')"
    :disabled="disabled"
    :color="primeColor"
  >
    {{ text }}
  </v-btn>
</template>
