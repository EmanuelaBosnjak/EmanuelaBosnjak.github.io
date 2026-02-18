<script setup lang="ts">
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

const router = useRouter();
</script>

<template>
  <ThemeSwitcher />
  <div class="window">
    <div class="title">
      {{ router.currentRoute.value.name }}
    </div>
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped>
.window {
  flex: 1;
  max-width: 800px;
  min-height: 500px;
  margin: auto;
  border: 2px solid var(--secondary-color);
  border-radius: 4px;

  .title {
    font-weight: bold;
    text-align: center;
    padding: 0.3em;
    background-color: var(--primary-color);
  }
}
</style>
