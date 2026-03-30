<template>
  <div class="counter">
    <div class="time">
      <span class="number">{{ time.years }}</span>
      <span class="label">Years</span>
    </div>

    <div class="time">
      <span class="number">{{ time.months }}</span>
      <span class="label">Months</span>
    </div>

    <div class="time">
      <span class="number">{{ time.days }}</span>
      <span class="label">Days</span>
    </div>

    <div class="time">
      <span class="number">{{ time.hours }}</span>
      <span class="label">Hours</span>
    </div>

    <div class="time">
      <span class="number">{{ time.minutes }}</span>
      <span class="label">Minutes</span>
    </div>

    <div class="time">
      <span class="number">{{ time.seconds }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

const startDate = dayjs('2025-07-23T00:00:00')

const time = ref({
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

let timer: number

const updateTime = () => {
  const now = dayjs()

  const years = now.diff(startDate, 'year')
  const months = now.diff(startDate.add(years, 'year'), 'month')
  const days = now.diff(startDate.add(years, 'year').add(months, 'month'), 'day')

  const hours = now.diff(startDate.add(years, 'year').add(months, 'month').add(days, 'day'), 'hour')

  const minutes = now.diff(
    startDate.add(years, 'year').add(months, 'month').add(days, 'day').add(hours, 'hour'),
    'minute',
  )

  const seconds = now.diff(
    startDate
      .add(years, 'year')
      .add(months, 'month')
      .add(days, 'day')
      .add(hours, 'hour')
      .add(minutes, 'minute'),
    'second',
  )

  time.value = { years, months, days, hours, minutes, seconds }
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.counter {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  font-family: 'Jersey 25', sans-serif;
  padding-block: 20px;
}

.counter,
.counter .number {
  background: linear-gradient(90deg, #c1638a 0%, #ff758c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.time {
  text-align: center;
}

.number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.label {
  font-size: 0.9rem;
  color: #666;
}
</style>
