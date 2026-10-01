<script setup>
import { computed } from 'vue'
import { useQuoteStore } from '../stores/quote'

// One job from data/services.js. The same button sits on the home page and
// the services page, and it talks to the store itself instead of emitting up
// to whichever view it is in.
const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const quote = useQuoteStore()

const added = computed(() => quote.isSelected(props.service.id))

function toggle() {
  if (added.value) {
    quote.removeItem(props.service.id)
  } else {
    quote.addItem(props.service)
  }
}
</script>

<template>
  <button
    type="button"
    class="quote-toggle"
    :class="{ 'is-added': added }"
    @click="toggle"
  >{{ added ? 'Remove from quote' : 'Add to quote' }}</button>
</template>
