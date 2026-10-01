import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import ContactView from '../views/ContactView.vue'

// One route for each page planned in Task 1.1P. These replace the
// v-if / v-else-if chain App.vue used in 9.3D: the address bar now decides
// which view is on screen, so every page has its own link and history entry.
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: { title: 'Services and prices' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Book a callout' }
  },
  {
    // Any other address (a typo, an old bookmark) goes back to the home page
    // instead of leaving the main area empty.
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  // Hash mode puts the page after a # in the address: task9-4hd/#/services.
  // The Deakin server only hands out files that really exist. With a plain
  // /services address, a refresh would ask it for a "services" file and get
  // a 404. The part after the # never reaches the server, so every refresh
  // or pasted link loads index.html and the router picks the page from there.
  history: createWebHashHistory(),
  routes,

  // RouterLink gives the link for the page on screen this class. It is the
  // class the stylesheet already used for the underline in 9.3D.
  linkActiveClass: 'active',

  scrollBehavior(to, from, savedPosition) {
    // Back and forward return the reader to where they were.
    if (savedPosition) {
      return savedPosition
    }
    // The header badge links to #quote. 88px keeps the card clear of the
    // sticky header.
    if (to.hash) {
      return { el: to.hash, top: 88 }
    }
    // Any other change of page opens at the top, which goTo() did by hand in 9.3D.
    return { top: 0 }
  }
})

// Each page sets its own tab title, so the tab and the history list name it.
router.afterEach((to) => {
  document.title = to.meta.title + ' | Kerbside Mobile Mechanics'
})

export default router
