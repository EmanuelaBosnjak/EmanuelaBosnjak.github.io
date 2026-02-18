<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { fairyDustCursor } from 'cursor-effects';
import { onMounted, ref } from 'vue';

const savedTheme = useLocalStorage('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const cursorEffect = ref<any>(null);

function initCursorEffect() {
  if (cursorEffect.value) {
    cursorEffect.value.destroy();
  }
  cursorEffect.value = fairyDustCursor({
    colors: [
      getComputedStyle(document.getElementById('app')!).getPropertyValue('--text-color').trim(),
    ]
  });
}

function applyTheme(theme: string) {
  const root = document.getElementById('app') as HTMLElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

function toggleTheme() {
  savedTheme.value = savedTheme.value === 'dark' ? 'light' : 'dark';
  applyTheme(savedTheme.value);
  initCursorEffect();
}

onMounted(() => {
  applyTheme(savedTheme.value);
  initCursorEffect();
});
</script>

<template>
  <button @click="toggleTheme">
    <span class="material-symbols-outlined">
      {{ savedTheme === 'dark' ? 'brightness_7' : 'moon_stars' }}
    </span>
  </button>
</template>

<style scoped>
button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0.5rem;
}
</style>