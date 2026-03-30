<template>
  <div class="flashCard">
    <vue-flip
      v-for="memory in memories"
      :key="memory.publicId"
      :active-click="true"
      width="300px"
      height="300px"
      class="card"
    >
      <!-- FRONT -->
      <template #front>
        <div class="image-container">
          <AdvancedImage :cldImg="cld.image(memory.publicId)" class="logo" />
          <!-- <button class="delete-btn" @click.stop="deleteMemoryItem(memory.publicId)">✕</button> -->
        </div>
      </template>

      <!-- BACK -->
      <template #back>
        <AdvancedImage :cldImg="cld.image(memory.publicId)" class="logo dimmed" />
        <p class="back-text title">{{ memory.description }}</p>
      </template>
    </vue-flip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueFlip } from 'vue-flip'
import { cld } from '@/cloudinary'
import { AdvancedImage } from '@cloudinary/vue'
import { type Memory } from '@/memories'
import { getMemories } from '@/db'

const memories = ref<Memory[]>([])

onMounted(async () => {
  memories.value = await getMemories()
})
</script>

<style scoped>
.flashCard {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 24px;
  padding: 30px;
  justify-content: center;
  align-items: flex-start;
}

@media (max-width: 700px) {
  .flashCard {
    flex-direction: column;
    align-items: center;
  }
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 16px;
}

.dimmed {
  opacity: 0.6;
  filter: blur(1px);
}

.back-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #fff;
  word-wrap: break-word;
  background: rgba(0, 0, 0, 0.55);
  text-align: center;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
  pointer-events: auto;
}
.image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 16px;
  top: 0;
  left: 0;
}
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 16px;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: red;
  transform: scale(1.1);
}

.title {
  position: absolute;
  top: -14px;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 6px;
}
</style>
