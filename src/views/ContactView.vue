<script setup>
import { ref } from 'vue'
import ContactForm from '../components/ContactForm.vue'
import QuoteSummary from '../components/QuoteSummary.vue'
import { useQuoteStore } from '../stores/quote'

const quote = useQuoteStore()

// Passed down to ContactForm as a prop, where v-for turns it into the dropdown.
const serviceSuburbs = [
  'Clyde North',
  'Cranbourne',
  'Cranbourne East',
  'Berwick',
  'Beaconsfield',
  'Officer',
  'Pakenham',
  'Narre Warren',
  'Narre Warren South',
  'Somewhere else nearby'
]

// The last booking ContactForm sent up. It lives here in the parent, so it
// stays on screen after the form clears its own fields.
const lastBooking = ref(null)

function handleSubmitForm(booking) {
  // The form only knows its own fields. The jobs picked on the services page
  // are in the quote store, so they are read from there and added here.
  // map() makes a new array of names, so emptying the store below cannot
  // wipe what the card shows.
  lastBooking.value = {
    ...booking,
    quoteJobs: quote.selectedServices.map((service) => service.name),
    quoteSummary: quote.formattedSummary
  }

  // The request has gone with those jobs on it, so the quote starts again.
  quote.resetStore()
}

// "2026-10-02" becomes "Friday 2 October 2026". en-GB is spelled out so the
// browser's own locale cannot flip the date to month first.
function formatDate(isoDate) {
  const date = new Date(isoDate + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="kicker">Bookings</p>
      <h1>Tell us what the car is doing</h1>
      <p class="lead">
        Broken down right now? Ring
        <a class="phone-inline" href="tel:0412887340">0412 887 340</a>
        instead of filling this in. For everything else, the form below is faster.
      </p>

      <div class="split contact-info">
        <div class="split-text">
          <h2>Where we go</h2>
          <p>
            Clyde North, Cranbourne, Cranbourne East, Berwick, Beaconsfield,
            Officer, Pakenham, Narre Warren and Narre Warren South.
          </p>
          <p>
            Outside that ring we still come, with a $40 travel charge added to
            the quote before you agree to anything.
          </p>
        </div>

        <div class="split-text">
          <h2>When we work</h2>
          <ul class="hours">
            <li><span class="day">Monday to Friday</span> 7am to 6pm</li>
            <li><span class="day">Saturday</span> 8am to 2pm</li>
            <li><span class="day">Sunday</span> Emergency callouts only</li>
          </ul>
          <p>After hours, leave a message. We call back before 7am the next working day.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section band">
    <div class="container">
      <!-- Only shown once a job has been added. Someone broken down at the
           roadside has no quote to look over. -->
      <QuoteSummary v-if="quote.totalCount > 0" class="contact-quote" :show-book-link="false" />

      <!-- In 9.3D this form sat in App.vue, because only a component's direct
           parent hears its events. Each page is now its own route, so this
           view is the parent: it hears submit-form and shows the card below. -->
      <ContactForm
        form-title="Booking request"
        :suburbs="serviceSuburbs"
        @submit-form="handleSubmitForm"
      />

      <article v-if="lastBooking" class="ack-card">
        <h3>Thanks, {{ lastBooking.name }}. Your booking request is in.</h3>
        <p>
          We will text a fixed quote and a two-hour arrival window to
          <strong>{{ lastBooking.mobile }}</strong>, and email a written copy to
          <strong>{{ lastBooking.email }}</strong>.
        </p>
        <ul>
          <li>
            <strong>Car</strong>
            <span>{{ lastBooking.car }}, rego {{ lastBooking.rego.toUpperCase() }}</span>
          </li>
          <li>
            <strong>Odometer</strong>
            <span>{{ lastBooking.odometer.toLocaleString('en-GB') }} km</span>
          </li>
          <li>
            <strong>Job</strong>
            <span>{{ lastBooking.job }}</span>
          </li>
          <li v-if="lastBooking.quoteJobs.length > 0">
            <strong>From your quote</strong>
            <span>{{ lastBooking.quoteJobs.join(', ') }} ({{ lastBooking.quoteSummary }})</span>
          </li>
          <li>
            <strong>Suburb</strong>
            <span>{{ lastBooking.suburb }}</span>
          </li>
          <li>
            <strong>Preferred date</strong>
            <span>{{ formatDate(lastBooking.preferred) }}</span>
          </li>
          <li>
            <strong>Parked</strong>
            <span>{{ lastBooking.parking }}</span>
          </li>
          <li>
            <strong>Locking wheel nut key</strong>
            <span>{{ lastBooking.wheelKey ? 'Yes' : 'Not confirmed' }}</span>
          </li>
          <li>
            <strong>Symptom</strong>
            <span>{{ lastBooking.symptom }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
