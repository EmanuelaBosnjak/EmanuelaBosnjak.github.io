<script setup lang="ts">
</script>

<template>
  <a class="social" href="https://instagram.com/hofmaurerad/" target="_blank" rel="noopener noreferrer">
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg class="logo" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z" />
        <path
          d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z" />
        <path
          d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z" />
      </g>
    </svg>
    Hofmaurerad
  </a>
  <a class="social" href="https://x.com/hofmaurerad" target="_blank" rel="noopener noreferrer">
    <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path
        d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
    </svg>
    @hofmaurerad
  </a>
  <p>
    Hey hey, welcome
  </p>
  <p>
    I'm Hofmaurerad — a 25-year-old (female) artist and IT engineer based in Serbia. More info?
  </p>
  <ul>
    <li>
      <b>About me:</b> An artist exploring ideas through colors, and emotions. My work grows from curiosity and constant
      experimentation, shaped by both instinct and intention.
    </li>
    <li>
      <b>About hobbies:</b> I've been drawing for as long as I can remember, and it's still my main passion. I also
      enjoy photography and gaming, which both inspire and influence my art in little ways.
    </li>
    <li>
      <b>About my favorite things:</b> My favorite flower is hydrangeas — soft, layered, a little mysterious. I enjoy
      the sound of rain and love listening to music while I work, letting it guide the mood of what I create.
    </li>
    <li>
      <b>Fun fact:</b> All my life, I've been drawing. Seriously, it's been a constant companion, and I can't imagine
      life without it.
    </li>
    <li>
      <b>Why this page exists:</b> This portfolio is my little corner of the internet to showcase my art, share my
      creative services, and make it easy for people to contact me. Every piece here tells part of my story, and I hope
      it inspires or connects with others in some way. This is a collection of pieces that reflect my progress,
      interests, and creative direction over time.
    </li>
    <li>
      If you're curious about my work, want to collaborate, or want to commission me, the links and contact info are
      right here. Thanks for stopping by — it really means a lot.
    </li>
  </ul>
</template>

<style scoped>
a.social {
  display: inline-flex;
  align-items: center;
  margin: 0.3em 0.5em;
  gap: 0.3em;
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
  border-bottom: 2px solid var(--secondary-color);
  text-shadow: var(--secondary-color) 0px 0px 0px;
  transition: text-shadow 300ms ease;
  
  &:hover {
    text-shadow: var(--secondary-color) 4px 4px 2px;
    
    svg.logo {
      filter: drop-shadow(4px 4px 2px var(--secondary-color));
    }
  }
  
  svg.logo {
    width: 1.2em;
    aspect-ratio: 1;
    vertical-align: middle;
    fill: var(--text-color);
    filter: drop-shadow(0px 0px 0px var(--secondary-color));
    transition: filter 300ms ease;
  }
}

ul {
  list-style: '✦';
  padding-left: 1em;
}

li {
  padding-left: 0.5em;
  margin: 0.2em 0;
}
</style>