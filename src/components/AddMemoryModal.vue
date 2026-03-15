<template>
  <div class="overlay">
    <div class="modal">
      <h1>Add New Memory</h1>

      <input type="file" accept="image/*" @change="addMemory" class="file-input" />

      <input
        type="text"
        placeholder="Memory description"
        v-model="description"
        class="text-input"
      />

      <button @click="submitMemory" class="submit-btn">Add Memory</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const description = ref('')
const selectedFile = ref<File | null>(null)
const addMemory = (event: Event) => {
  const input = event.target as HTMLInputElement
  selectedFile.value = input.files?.[0] || null
}
const emit = defineEmits(['memoryAdded'])

const submitMemory = () => {
  if (!selectedFile.value) return

  const reader = new FileReader()

  reader.onload = () => {
    const newMemory = {
      image: reader.result as string,
      description: description.value,
    }

    // get existing memories
    const stored = localStorage.getItem('memories')
    const memories = stored ? JSON.parse(stored) : []

    // add new memory
    memories.push(newMemory)

    // save back to localStorage
    localStorage.setItem('memories', JSON.stringify(memories))

    // emit to parent component
    emit('memoryAdded', newMemory)

    // reset inputs
    selectedFile.value = null
    description.value = ''
  }

  reader.readAsDataURL(selectedFile.value)
}
</script>
<style scoped>
/* Background overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal card */
.modal {
  background: white;
  padding: 30px 35px;
  border-radius: 16px;
  width: 350px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
  animation: popIn 0.25s ease;
}

h1 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}

/* Inputs */
.text-input,
.file-input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
}

.text-input:focus {
  outline: none;
  border-color: #ff6fa5;
}

/* Button */
.submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  background: #ff6fa5;
  color: white;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background: #ff4c92;
  transform: translateY(-1px);
}

/* Modal animation */
@keyframes popIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
