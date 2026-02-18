<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
</script>

<template>
  <ThemeSwitcher />
  <div class="window">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" v-html="$route.meta.svg">
      </svg>
      {{ $route.meta.title }}
      <svg></svg>
      <div class="window-btns">
        <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path
            d="M64 480C64 462.3 78.3 448 96 448L544 448C561.7 448 576 462.3 576 480C576 497.7 561.7 512 544 512L96 512C78.3 512 64 497.7 64 480z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path
            d="M112 288L112 448C112 456.8 119.2 464 128 464L512 464C520.8 464 528 456.8 528 448L528 288L112 288zM64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path
            d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
        </svg>
      </div>
    </div>
    <Navbar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.window {
  flex: 1;
  max-width: 800px;
  min-height: 500px;
  margin: auto;
  border: 2px solid var(--sec-background-color);
  border-radius: 2px;
}

.title {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  text-align: center;
  padding: 0.3em;
  color: var(--primary-color);
  background-color: var(--sec-background-color);

  svg {
    height: 1.3em;
    aspect-ratio: 1;
    margin: 0.2rem;
  }

  svg :deep(path) {
    fill: var(--primary-color);
  }
  
  .window-btns {
    position: absolute;
    right: 0.5em;
    height: 2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;

    svg {
      height: 1.8em;
      width: 2.5em;
      margin: 0;
      padding: 0.2em 0.5em;
      border-radius: 2px;

      path {
        fill: var(--primary-color);
      }

      &:hover {
        background-color: var(--primary-color);

        path {
          fill: var(--background-color);
        }
      }
    }

  }
}

.content {
  padding: 1em;
}
</style>
