<script setup lang="ts">
import FlashCards from './components/FlashCards.vue'
import HeartContainer from './components/HeartContainer.vue'
import CountDown from './components/CountDown.vue'
</script>

<template>
  <HeartContainer />
  <CountDown />
  <p>
    <FlashCards />
  </p>
</template>

<style>
html,
body,
#app {
  background-image: url('../images/pink-hearts-background-pattern-of-cute-hearts-in-light-pink-color-vector.jpg');
  background-size: cover;
  background-position: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
}
</style>
