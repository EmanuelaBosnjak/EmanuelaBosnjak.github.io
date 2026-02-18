<template>
  <nav>
    <RouterLink to="/">hello</RouterLink>
    <RouterLink to="/gallery">gallery</RouterLink>
    <RouterLink to="/commissions">commissions</RouterLink>
    <RouterLink to="/contact">contact</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  border-bottom: 2px solid var(--secondary-color);
  justify-content: center;
  padding: 4px 0;

  a {
    text-decoration: none;
    color: var(--text-color);
    padding: 0.3em;

    &:hover {
      background-color: var(--secondary-color);
    }
  }

  .router-link-active {
    text-decoration: underline;
    pointer-events: none;
    text-underline-offset: 0.3em;
  }
}
</style>