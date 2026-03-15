<template>
  <div class="hearts-container">
    <img
      src="../../images/heart-removebg-preview.png"
      v-for="heart in hearts"
      :key="heart.id"
      class="heart"
      :style="heart.style"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const hearts = ref<any[]>([])
let id = 0

const createHeart = () => {
  const size = Math.random() * 20 + 10
  const left = Math.random() * 100
  const duration = Math.random() * 5 + 5

  hearts.value.push({
    id: id++,
    style: {
      left: left + 'vw',
      fontSize: size + 'px',
      animationDuration: duration + 's',
    },
  })

  if (hearts.value.length > 40) {
    hearts.value.shift()
  }
}

onMounted(() => {
  setInterval(createHeart, 400)
})
</script>

<style scoped>
.hearts-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* allows clicking through */
  overflow: hidden;
}

.heart {
  position: absolute;
  bottom: -20px;
  width: 20px;
  height: 20px;
  animation: floatUp linear forwards;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  100% {
    transform: translateY(-110vh) scale(1.5);
    opacity: 0;
  }
}
</style>
