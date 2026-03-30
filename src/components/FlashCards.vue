<template>
  <div class="flashCard">
    <vue-flip
      v-for="memory in memories"
      :key="memory.publicId"
      :active-click="true"
      width="200px"
      height="200px"
    >
      <!-- FRONT -->
      <template #front>
        <AdvancedImage :cldImg="cld.image(memory.publicId)" class="logo" />
      </template>

      <!-- BACK -->
      <template #back>
        <AdvancedImage :cldImg="cld.image(memory.publicId)" class="logo dimmed" />
        <p class="back-text">{{ memory.description }}</p>
      </template>
    </vue-flip>

    <AddMemoryModal v-if="showModal" @memoryAdded="onMemoryAdded" @close="showModal = false" />
  </div>

  <button @click="showModal = true">Add Memory</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueFlip } from 'vue-flip'
import AddMemoryModal from './AddMemoryModal.vue'
import { cld } from '@/cloudinary'
import { AdvancedImage } from '@cloudinary/vue'
import { getMemories } from '@/db'

interface Memory {
  publicId: string
  description: string
}

const memories = ref<Memory[]>([])
const showModal = ref(false)

const loadMemories = async () => {
  memories.value = await getMemories()
}

onMounted(loadMemories)

const onMemoryAdded = async () => {
  await loadMemories() // 🔥 sync with Firestore
}
</script>

<style scoped>
.flashCard {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.dimmed {
  opacity: 0.5;
}

.back-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  color: #333;
}
</style>
