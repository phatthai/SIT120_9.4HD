<script setup>
import { RouterLink } from 'vue-router'

// Same page list as the header, so the two menus can never disagree.
defineProps({
  pages: {
    type: Array,
    required: true
  }
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <p class="footer-brand">Kerbside Mobile Mechanics</p>
        <address>
          Clyde North VIC 3978<br>
          <a href="tel:0412887340">0412 887 340</a><br>
          Licence VIC-MRB-40218
        </address>
      </div>

      <nav class="footer-nav" aria-label="Footer">
        <RouterLink v-for="page in pages" :key="page.to" :to="page.to">{{ page.label }}</RouterLink>
      </nav>

      <p class="footer-note">
        © {{ year }} Kerbside Mobile Mechanics.<br>
        Student project for SIT120. This business is fictional.
      </p>
    </div>
  </footer>
</template>
