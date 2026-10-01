import { defineStore } from 'pinia'

// Store 1: the site-wide colour theme.
// The button that changes it sits in AppHeader.vue, but the class it controls
// is applied in App.vue. Neither component is the other's parent, so the
// value lives here, where both can reach it without props or emits.
export const useThemeStore = defineStore('theme', {
  // STATE: the one fact the theme depends on. Starts light on every visit.
  state: () => ({
    isDarkMode: false
  }),

  // GETTERS: values worked out from the state, recalculated whenever it changes.
  getters: {
    // The class App.vue puts on the outer wrapper. Every dark rule in
    // styles.css starts with .theme-dark, so this one string recolours
    // every page at once.
    currentThemeClass: (state) => (state.isDarkMode ? 'theme-dark' : 'theme-light')
  },

  // ACTIONS: the only place the state is changed.
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    }
  }
})
