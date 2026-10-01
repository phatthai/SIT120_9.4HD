<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useQuoteStore } from '../stores/quote'

// The page list still comes down from App.vue as a prop.
defineProps({
  pages: {
    type: Array,
    required: true
  }
})

// Both stores are read straight from here. No props carry them in and no
// events carry changes back out.
const theme = useThemeStore()
const quote = useQuoteStore()

// Whether the phone menu is open. Plain local state, not Pinia, because
// nothing outside the header ever needs to know.
const menuOpen = ref(false)

// Close the phone menu after every change of page, back button included.
const route = useRoute()
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="site-header">
    <!-- Source order is logo, Menu, links, tools. On a desktop that is also
         the visual order, so Tab moves left to right. On a phone, CSS order
         lifts the tools up beside the logo and drops the links below. -->
    <div class="container header-inner">
      <RouterLink class="logo" to="/">Kerbside</RouterLink>

      <!-- A word rather than a three-line icon, since not every visitor
           reads that icon as a menu. Hidden from 768px up. -->
      <button
        type="button"
        class="menu-toggle"
        aria-controls="main-nav"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >{{ menuOpen ? 'Close' : 'Menu' }}</button>

      <nav id="main-nav" class="nav" :class="{ 'is-open': menuOpen }" aria-label="Main">
        <RouterLink v-for="page in pages" :key="page.to" :to="page.to">{{ page.label }}</RouterLink>
      </nav>

      <div class="header-tools">
        <!-- Live count from the quote store's totalCount getter. Clicking it
             jumps to the summary card on the services page. -->
        <RouterLink
          class="quote-badge"
          :to="{ path: '/services', hash: '#quote' }"
          :aria-label="'Quote, ' + quote.totalCount + (quote.totalCount === 1 ? ' job' : ' jobs')"
        >
          <svg class="badge-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M9 3h6v3H9z M7 5H5v16h14V5h-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            <path d="M8.5 11h7M8.5 15h4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span class="badge-label">Quote</span>
          <!-- The key changes with the count, so Vue builds a fresh span and
               its short pop animation plays on every add and remove. -->
          <span
            :key="quote.totalCount"
            class="badge-count"
            :class="{ 'is-filled': quote.totalCount > 0 }"
          >{{ quote.totalCount }}</span>
        </RouterLink>

        <button type="button" class="theme-toggle" @click="theme.toggleDarkMode()">
          <svg v-if="theme.isDarkMode" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          </svg>
          <!-- Names the mode the button switches to. Visually hidden below
               1025px, where only the icon fits, but always read out. -->
          <span class="toggle-label">{{ theme.isDarkMode ? 'Light mode' : 'Dark mode' }}</span>
        </button>
      </div>

      <!-- Screen readers hear every change to the quote, whichever page
           the button was pressed on. -->
      <p class="visually-hidden" aria-live="polite">{{ quote.formattedSummary }}</p>
    </div>
  </header>
</template>
