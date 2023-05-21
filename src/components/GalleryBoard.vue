<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { galleryStore } from '../store/galleryStore'
import PreviewCard from './PreviewCard.vue'
import DialogCard from './DialogCard.vue'
import PaginationButton from './PaginationButton.vue'

const dialog = ref(false)
const previewPhoto = ref('')
const period = ref(0)
const elementsOnPage = ref(20)

const pending = computed(() => galleryStore.state.pending)
const limit = computed(() => galleryStore.state.photos.length)
const disabledPrev = computed(() => period.value === 0)
const disabledNext = computed(
  () => period.value + elementsOnPage.value === limit.value
)
const sortedPhotos = computed(() =>
  galleryStore.getters.getSortedPhotos.slice(
    0 + period.value,
    elementsOnPage.value + period.value
  )
)

const handleDownload = async (url) => {
  try {
    const { data } = await axios.get(url, {
      responseType: 'blob',
    })
    const link = URL.createObjectURL(data)
    Object.assign(document.createElement('a'), {
      href: link,
      download: 'image.jpg',
    }).click()
    URL.revokeObjectURL(link)
  } catch (error) {
    console.error('Download Error: ', error)
  }
}

const handleOpenDialog = (url) => {
  dialog.value = true
  previewPhoto.value = url
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  })
}

const changePage = (callback) => {
  scrollToTop()
  callback()
}

onMounted(() => {
  galleryStore.dispatch('fetchPhotos')
})
</script>

<template>
  <v-container class="py-0">
    <v-row class="my-6" justify="center">
      <h2>Picsum Gallery</h2>
    </v-row>
    <v-row>
      <v-row v-if="pending" class="my-6" justify="center">
        <h2>Loading...</h2>
      </v-row>
      <v-col
        v-else
        v-for="photo in sortedPhotos"
        :key="photo.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <preview-card
          :id="photo.id"
          :url="photo.download_url"
          @open-dialog="(url) => handleOpenDialog(url)"
          @download="(url) => handleDownload(url)"
        />
      </v-col>
    </v-row>
    <v-row v-if="!pending" class="my-6" justify="center">
      <pagination-button
        text="Prev"
        :disabled="disabledPrev"
        @handle-click="changePage(() => (period -= elementsOnPage))"
      />
      <pagination-button
        text="Next"
        :disabled="disabledNext"
        @handle-click="changePage(() => (period += elementsOnPage))"
      />
    </v-row>
    <dialog-card
      :dialog="dialog"
      :url="previewPhoto"
      @close-dialog="(e) => (dialog = e)"
      @download="(url) => handleDownload(url)"
    />
  </v-container>
</template>
