<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink v-for="route in $router.getRoutes()" :to="route.path">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" v-html="route.meta.svg">
      </svg>
      {{ route.meta.title }}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" v-html="route.meta.svg">
      </svg>
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  border-bottom: 2px solid var(--sec-background-color);
  justify-content: center;
  padding: 4px 0;
  overflow-x: hidden;

  a {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    color: var(--text-color);
    padding: 0.3em;
    border-radius: 2px;

    svg {
      display: block;
      opacity: 0;
      width: 0;
      height: 1em;
      transition: all 300ms ease;
      margin: 0 0.3em;

    }

    svg :deep(path) {
      fill: var(--text-color);
    }

    &:hover {
      background-color: var(--sec-background-color);
      color: var(--primary-color);

      svg {
        opacity: 1;
        width: 1em;
      }

      svg :deep(path) {
        fill: var(--primary-color);
      }
    }
  }

  .router-link-active {
    text-decoration: underline;
    pointer-events: none;
    text-underline-offset: 0.3em;
  }
}
</style>