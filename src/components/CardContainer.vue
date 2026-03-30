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
  <div class="flashCardContainer">
    <div class="flashCardContainer__button">
      <button class="add-memory-btn" @click="showModal = true">Add Memory</button>
    </div>
    <div class="flashCardContainer__cards">
      <FlashCards />
    </div>
  </div>
  <AddMemoryModal v-if="showModal" @memoryAdded="onMemoryAdded" @close="showModal = false" />
</template>

<style scoped>
.flashCardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flashCardContainer__button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
}
.flashCardContainer__cards {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  padding: 16px 0;
}

.add-memory-btn {
  padding: 12px 28px;
  background: linear-gradient(90deg, #ff7eb3 0%, #ff758c 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 117, 140, 0.15);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
  margin-bottom: 16px;
}
.add-memory-btn:hover {
  background: linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%);
  transform: translateY(-2px) scale(1.04);
}
</style>
