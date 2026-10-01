<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useThemeStore } from './stores/theme'

// The three pages planned in Task 1.1P. Still passed to the header and the
// footer as a prop: only those two use it, so it does not need a store.
const pages = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Book a callout' }
]

const theme = useThemeStore()
</script>

<template>
  <!-- currentThemeClass is "theme-light" or "theme-dark". Every dark rule in
       styles.css hangs off that one class, so flipping it recolours the
       header, the footer and whichever view is showing. -->
  <div class="app-shell" :class="theme.currentThemeClass">
    <AppHeader :pages="pages" />

    <main>
      <!-- The router renders the view that matches the address here. This
           one tag replaces the v-if / v-else-if chain from 9.3D. -->
      <RouterView />
    </main>

    <AppFooter :pages="pages" />
  </div>
</template>
