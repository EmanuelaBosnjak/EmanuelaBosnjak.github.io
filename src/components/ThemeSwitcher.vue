<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import isDark from '../theme';

const toggleTheme = useToggle(isDark);
</script>

<template>
  <button @click="toggleTheme()">
    <span class="material-symbols-outlined">
      {{ isDark ? 'brightness_7' : 'moon_stars' }}
    </span>
  </button>
</template>

<style scoped>
button {
  color: var(--text-color);
  cursor: pointer;
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  background-color: var(--background-color);
  border-width: 0px;
  border-radius: 2px;
  padding: 0.5rem;
}
</style>