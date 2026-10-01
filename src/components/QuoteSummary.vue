<script setup>
import { RouterLink } from 'vue-router'
import { useQuoteStore } from '../stores/quote'

defineProps({
  // Off on the contact page, where a link to the booking form would point
  // at the page the reader is already on.
  showBookLink: {
    type: Boolean,
    default: true
  }
})

const quote = useQuoteStore()
</script>

<template>
  <aside id="quote" class="quote-summary" aria-labelledby="quote-title">
    <div class="quote-head">
      <h2 id="quote-title" class="quote-title">Your quote</h2>
      <p class="quote-total">{{ quote.formattedSummary }}</p>
    </div>

    <p v-if="quote.totalCount === 0" class="quote-empty">
      Press Add to quote on any job and it appears here with a running total.
    </p>

    <ul v-else class="quote-list">
      <li v-for="item in quote.selectedServices" :key="item.id">
        <span class="quote-item">{{ item.name }}</span>
        <span class="quote-price">from ${{ item.price }}</span>
        <button
          type="button"
          class="quote-remove"
          :aria-label="'Remove ' + item.name + ' from quote'"
          @click="quote.removeItem(item.id)"
        >Remove</button>
      </li>
    </ul>

    <div class="quote-foot">
      <p class="quote-note">
        Small-car prices. A 4WD or ute costs a little more, and the fixed price
        comes by text before anything is booked.
      </p>

      <div v-if="quote.totalCount > 0" class="quote-actions">
        <RouterLink v-if="showBookLink" class="button" to="/contact">Book these jobs</RouterLink>
        <button type="button" class="button-secondary" @click="quote.resetStore()">Clear quote</button>
      </div>
    </div>
  </aside>
</template>
