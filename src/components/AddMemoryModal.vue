<template>
  <div class="overlay">
    <div class="modal">
      <h1>Add New Memory</h1>
      <input type="file" accept="image/*" @change="onFileChange" />
      <input type="text" v-model="description" placeholder="Memory description" />
      <button @click="submitMemory" :disabled="!selectedFile || uploading">
        {{ uploading ? 'Uploading...' : 'Add Memory' }}
      </button>
      <button @click="$emit('close')">Cancel</button>
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

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('upload_preset', 'memories_upload')

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dkavjyg6i/image/upload', {
      method: 'POST',
      body: formData,
    })

    // const data = await res.json()
    const data = await res.json()
    console.log('Cloudinary response:', data)
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
  cursor: pointer;
}
</style>
