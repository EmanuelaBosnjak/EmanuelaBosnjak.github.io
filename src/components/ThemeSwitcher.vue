<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import isDark from '../theme';

const toggleTheme = useToggle(isDark);
</script>

<template>
  <button @click="toggleTheme()">
    <div class="material-symbols-outlined icon">
      {{ isDark ? 'brightness_7' : 'moon_stars' }}
    </div>
    <img src="/image/chime.png" />
  </button>
</template>

<style scoped>
button {
  position: relative;
  color: var(--text-color);
  cursor: pointer;
  position: fixed;
  top: 0;
  right: 0;
  border: none;
  background: none;
}

.icon {
  position: absolute;
  color: var(--background-color);
  text-shadow: var(--text-color) 0px 0px 8px;
  font-size: 1.75rem;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
}

img {
  width: 64px;
  object-fit: contain;
}
</style>