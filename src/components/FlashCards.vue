<template>
  <div class="flashCard">
    <vue-flip
      v-for="(memory, index) in memories"
      :key="index"
      :active-click="true"
      width="200px"
      height="200px"
    >
      <template #front>
        <img :src="memory.image" class="logo" />
      </template>

      <template #back>
        <img :src="memory.image" class="logo" style="opacity: 0.5" />
        <p class="back-text">{{ memory.description }}</p>
      </template>
    </vue-flip>

    <!-- Memory Modal -->
    <AddMemoryModal v-if="showModal" @memoryAdded="onMemoryAdded" />
  </div>

  <button @click="addMemory">Add Memory</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueFlip } from 'vue-flip'
import AddMemoryModal from './AddMemoryModal.vue'

interface Memory {
  image: string
  description: string
}

const memories = ref<Memory[]>([])
const showModal = ref(false)

const addMemory = () => {
  showModal.value = true
}

// Load memories from localStorage on mount
onMounted(() => {
  const stored = localStorage.getItem('memories')
  if (stored) {
    memories.value = JSON.parse(stored)
  }
})

const onMemoryAdded = (memory: { image: string; description: string }) => {
  memories.value.push(memory)
  // Save to localStorage
  localStorage.setItem('memories', JSON.stringify(memories.value))
  showModal.value = false
}
</script>

<style scoped>
.flashCard {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.logo {
  display: block;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
