# Kerbside Mobile Mechanics (SIT120 Task 9.4HD)

The Task 9.3D Vue 3 site rebuilt as a single page application: Vue Router
for the three pages, two Pinia stores for shared state, a dark mode, and a
quote list that follows the customer from the job cards to the booking form.

## Run it locally

    npm install
    npm run dev

`npm install` restores `node_modules`, which is left out of the zip.
Vue Router and Pinia are already listed in `package.json`.

## Build for the Deakin server

    npm run build

Upload the contents of `dist/` into `public_html/task9-4hd/`.
`vite.config.js` sets `base: './'`, so every asset path in the build is relative.
Use `npm run preview` to test the build locally; opening `dist/index.html`
straight from the file system shows a blank page.

The router uses hash history, so page addresses look like
`.../task9-4hd/#/services`. The part after `#` never reaches the server,
which means refreshing any page or opening a pasted link always loads
`index.html` and never a 404.

## Structure (`src/`)

| File | Role |
|---|---|
| `main.js` | Creates the app, registers Pinia and the router, imports the stylesheet |
| `App.vue` | Theme class on the outer wrapper, header, `<RouterView />`, footer |
| `router/index.js` | Routes for `/`, `/services`, `/contact`, active link class, scroll and tab title |
| `stores/theme.js` | Store 1: `isDarkMode`, `currentThemeClass`, `toggleDarkMode()` |
| `stores/quote.js` | Store 2: `selectedServices`, `totalCount`, `totalPrice`, `formattedSummary`, `isSelected`, `addItem()`, `removeItem()`, `resetStore()` |
| `data/services.js` | The six jobs and prices, shared by the cards, the price table and the quote |
| `views/HomeView.vue` | Home page |
| `views/ServicesView.vue` | Job cards, quote card, price table |
| `views/ContactView.vue` | Booking page: quote card, booking form, acknowledgement card |
| `components/AppHeader.vue` | Logo, `RouterLink` navigation, quote badge, dark mode toggle, phone menu |
| `components/AppFooter.vue` | Contact details and secondary navigation |
| `components/QuoteButton.vue` | Add to quote / Remove from quote button for one job |
| `components/QuoteSummary.vue` | The quote card, used on the services and contact pages |
| `components/ContactForm.vue` | Booking form: props, v-model, validation, `submit-form` emit |

All styles live in `src/assets/styles.css`: phone first, then 768px (tablet),
then 1025px (desktop), then the dark mode overrides.
