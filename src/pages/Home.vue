<script setup lang="ts">
</script>

<template>
  <a class="social" href="https://instagram.com/hofmaurerad/" target="_blank" rel="noopener noreferrer">
    <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path
        d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
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