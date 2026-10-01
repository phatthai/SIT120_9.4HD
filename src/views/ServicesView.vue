<script setup>
import { RouterLink } from 'vue-router'
import QuoteButton from '../components/QuoteButton.vue'
import QuoteSummary from '../components/QuoteSummary.vue'
import { services } from '../data/services.js'
import { useQuoteStore } from '../stores/quote'

// Read here only to outline the cards that are already in the quote.
const quote = useQuoteStore()
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="kicker">Services</p>
      <h1>What we can do at the kerb</h1>
      <p class="lead">
        Almost everything a small workshop does, minus the hoist. Add the jobs
        you need and your quote keeps a running total.
      </p>

      <!-- Phone: cards in one column, quote card underneath.
           Tablet: cards in two columns, quote card full width below them.
           Desktop: cards and quote card side by side. -->
      <div class="services-layout">
        <div>
          <h2 class="visually-hidden">Jobs</h2>
          <div class="cards service-grid">
            <article
              v-for="service in services"
              :key="service.id"
              class="card card-plain"
              :class="{ 'is-added': quote.isSelected(service.id) }"
            >
              <div class="card-text">
                <h3>{{ service.name }}</h3>
                <p>{{ service.blurb }}</p>
                <p class="card-price">From ${{ service.price }}, {{ service.time }} on site</p>
                <div class="card-actions">
                  <QuoteButton :service="service" />
                </div>
              </div>
            </article>
          </div>
        </div>

        <QuoteSummary />
      </div>
    </div>
  </section>

  <section id="prices" class="section band">
    <div class="container">
      <h2>Prices and time on site</h2>
      <p class="section-intro">
        Every price includes the callout inside the service area. Anything past
        Pakenham adds $40.
      </p>

      <div class="table-wrapper" tabindex="0" role="region" aria-label="Callout prices, scrollable">
        <table>
          <caption>Callout prices, updated March 2026</caption>
          <thead>
            <tr>
              <th scope="col">Job</th>
              <th scope="col">Time on site</th>
              <th scope="col">Small car</th>
              <th scope="col">4WD or ute</th>
              <th scope="col">Parts included</th>
              <th scope="col">Saturday</th>
            </tr>
          </thead>
          <tbody>
            <!-- Built from the same list as the cards above, so a price
                 changed in data/services.js changes in both places. -->
            <tr v-for="service in services" :key="service.id">
              <th scope="row">{{ service.job }}</th>
              <td>{{ service.time }}</td>
              <td>${{ service.price }}</td>
              <td>${{ service.price4wd }}</td>
              <td>{{ service.parts }}</td>
              <td>{{ service.saturday }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="table-note">
        On a phone, slide the table sideways to reach the Saturday column.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>What we cannot do on site</h2>
      <p>
        Anything that needs the car in the air for a long stretch. Clutch
        replacement, timing belts on transverse engines, gearbox work and wheel
        alignment all belong in a workshop.
      </p>
      <p>
        If we open a job and find it belongs on a hoist, we stop, charge the
        callout only, and give you two local shops we would use ourselves.
      </p>
      <p>
        <RouterLink class="text-link" to="/contact">Book a callout</RouterLink>
      </p>
    </div>
  </section>
</template>
