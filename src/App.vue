<script setup lang="ts">
import FlashCards from './components/FlashCards.vue'
import HeartContainer from './components/HeartContainer.vue'
import CountDown from './components/CountDown.vue'
import CardContainer from './components/CardContainer.vue'
</script>

<template>
  <HeartContainer />
  <CountDown />
  <p>
    <CardContainer />
  </p>
</template>

<style>
html,
body,
#app {
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../images/pink-hearts-background-pattern-of-cute-hearts-in-light-pink-color-vector.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.65;
  z-index: -1;
  pointer-events: none;
}
</style>
