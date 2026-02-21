<script setup lang="ts">
import isDark from "../theme";
</script>

<template>
  <div class="bg">
    <div :class="`stars ${isDark || 'down'}`">
    </div>
    <img :class="`moon ${isDark || 'down'}`" src="/image/moon2.gif"/>
    <img :class="`sun ${!isDark || 'down'}`" src="/image/sun4.gif"/>
    <div :class="`clouds ${!isDark || 'down'}`">
    </div>
  </div>
</template>

<style scoped>
div.bg {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
}

.stars,
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 1;
  transition: all 300ms ease;
}

.stars {
  background-image: url('/image/stars2.gif');
  background-size: 380px;
}

.clouds {
  background-image: url('/image/clouds3.gif');
  background-size: 380px;
}

.moon,
.sun {
  position: absolute;
  top: 10%;
  opacity: 1;
  transition: all 300ms ease;
}

.moon {
  left: 10%;
  width: 300px;
}

.sun {
  right: 10%;
  width: 400px;
}

.down {

  &.stars,
  &.clouds {
    opacity: 0;
  }

  &.moon,
  &.sun {
    top: 80%;
    opacity: 0;
  }
}
</style>
