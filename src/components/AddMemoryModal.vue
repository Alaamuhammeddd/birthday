<template>
  <div class="overlay">
    <div class="modal">
      <h1>Add New Memory</h1>
      <input type="file" accept="image/*" @change="onFileChange" />
      <input type="text" v-model="description" placeholder="Memory description" />
      <button @click="submitMemory" :disabled="!selectedFile || uploading" class="add-memory-btn">
        {{ uploading ? 'Uploading...' : 'Add Memory' }}
      </button>
      <button @click="$emit('close')">Cancel</button>
      <div v-if="uploading" class="loading-overlay">
        <div class="spinner"></div>
        <span class="loading-text">Uploading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addMemory } from '@/db'
const selectedFile = ref<File | null>(null)
const description = ref('')
const uploading = ref(false)
const emit = defineEmits(['memoryAdded', 'close'])

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  selectedFile.value = input.files?.[0] || null
}

const submitMemory = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('upload_preset', 'memories_upload')

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/' +
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME +
        '/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    )

    const data = await res.json()
    const memory = {
      publicId: data.public_id,
      description: description.value,
    }

    await addMemory(memory)

    emit('memoryAdded', memory)

    selectedFile.value = null
    description.value = ''
    emit('close')
  } catch (err) {
    console.error('Upload failed:', err)
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 350px;
  text-align: center;
}
input[type='file'],
input[type='text'] {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
button {
  padding: 10px 15px;
  margin: 5px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}
.add-memory-btn {
  padding: 10px 15px;
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
}
.add-memory-btn:hover {
  background: linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%);
  transform: translateY(-2px) scale(1.04);
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
}
.spinner {
  border: 4px solid #eee;
  border-top: 4px solid #ff7eb3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-text {
  color: #ff7eb3;
  font-weight: 600;
  font-size: 1.1rem;
}
.modal {
  position: relative;
}
</style>
