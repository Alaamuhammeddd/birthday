<script setup lang="ts">
import FlashCards from './FlashCards.vue'
import AddMemoryModal from './AddMemoryModal.vue'
import { ref, onMounted } from 'vue'
import { getMemories } from '@/db'
// import { deleteMemory } from '@/db'
import { type Memory } from '@/memories'

const showModal = ref(false)

const memories = ref<Memory[]>([])

const loadMemories = async () => {
  memories.value = await getMemories()
}
onMounted(loadMemories)
const onMemoryAdded = async () => {
  await loadMemories() // 🔥 sync with Firestore
}
</script>

<template>
  <button @click="showModal = true">Add Memory</button>

  <div class="flashCardContainer">
    <FlashCards />
  </div>
  <AddMemoryModal v-if="showModal" @memoryAdded="onMemoryAdded" @close="showModal = false" />
</template>

<style scoped>
.flashCardContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
