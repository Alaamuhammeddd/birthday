<script setup lang="ts">
import HeartContainer from './components/HeartContainer.vue'
import CountDown from './components/CountDown.vue'
import CardContainer from './components/CardContainer.vue'
import Letter from './components/Letter.vue'
</script>

<template>
  <HeartContainer />
  <CountDown />
  <Letter />
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
  background-image: url('../images/shimmering-gold-stars-watercolor.jpg');
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  z-index: -2;
  pointer-events: none;
}
#app::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.4;
  background: rgba(0, 0, 0, 0.35);
  z-index: -1;
  pointer-events: none;
}
</style>
