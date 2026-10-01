import { defineStore } from 'pinia'

// Store 2: the customer's quote list.
// Jobs are added on the home and services pages, counted in the header,
// listed in the summary card and attached to the booking on the contact page.
// None of those components is the parent of another, so with props and emits
// the list would have to sit in App.vue and be passed down to every one of them.
export const useQuoteStore = defineStore('quote', {
  // STATE: whole service objects from data/services.js, in the order added.
  state: () => ({
    selectedServices: []
  }),

  // GETTERS
  getters: {
    // The number in the header badge.
    totalCount: (state) => state.selectedServices.length,

    // Sum of the small-car prices, so the lowest the visit can cost.
    totalPrice: (state) => state.selectedServices.reduce((sum, service) => sum + service.price, 0),

    // One readable line for the summary card, for example "2 jobs, from $530".
    // A normal function rather than an arrow, so `this` can reach the two
    // getters above instead of repeating their maths.
    formattedSummary() {
      if (this.totalCount === 0) {
        return 'No jobs added yet'
      }
      const jobs = this.totalCount === 1 ? '1 job' : this.totalCount + ' jobs'
      return jobs + ', from $' + this.totalPrice.toLocaleString('en-AU')
    },

    // Lets a button ask whether its job is already in the quote. It returns a
    // function because the answer depends on which job is asking.
    isSelected: (state) => (serviceId) => state.selectedServices.some((service) => service.id === serviceId)
  },

  // ACTIONS
  actions: {
    addItem(item) {
      // some() stops at the first match, so a job that is already in the
      // list is found and the push is skipped. No duplicate rows.
      const alreadyAdded = this.selectedServices.some((service) => service.id === item.id)
      if (!alreadyAdded) {
        this.selectedServices.push(item)
      }
    },

    removeItem(itemId) {
      // filter() returns a new array holding every job except the matching one.
      this.selectedServices = this.selectedServices.filter((service) => service.id !== itemId)
    },

    resetStore() {
      this.selectedServices = []
    }
  }
})
