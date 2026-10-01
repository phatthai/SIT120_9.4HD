<script setup>
import { RouterLink } from 'vue-router'
import QuoteButton from '../components/QuoteButton.vue'
import { services } from '../data/services.js'

// Two of the three jobs on this page are in the services list, so their
// buttons add the very same objects the services page uses. A job added here
// already shows as added over there.
const logbook = services.find((service) => service.id === 'logbook')
const inspection = services.find((service) => service.id === 'inspection')
</script>

<template>
  <section class="section hero-section">
    <div class="container hero">
      <div class="hero-text">
        <p class="kicker">Clyde North · Cranbourne · Berwick · Pakenham</p>
        <h1>Your mechanic comes to the driveway</h1>
        <p class="lead">
          We service and repair cars where they are parked.
          No drop-off, no waiting room, no borrowing a lift to work.
        </p>
        <p><a class="phone" href="tel:0412887340">0412 887 340</a></p>
        <p>
          <RouterLink class="button" to="/contact">Book a callout</RouterLink>
        </p>
      </div>
    </div>
  </section>

  <section class="section band">
    <div class="container">
      <h2>What we do</h2>
      <p class="section-intro">
        The three jobs we get called out for most often. The full list and
        prices are on the services page.
      </p>

      <div class="cards">
        <article class="card">
          <img
            src="../assets/images/logbook-service.jpg"
            alt="A mechanic filling in a service checklist on a clipboard resting on the engine"
          >
          <div class="card-text">
            <h3>Logbook servicing</h3>
            <p>
              Stamped to the manufacturer schedule, so a new-car warranty stays
              valid. Oil, filters and the common consumables ride in the van.
            </p>
            <div class="card-actions">
              <QuoteButton :service="logbook" />
            </div>
          </div>
        </article>

        <article class="card">
          <img
            src="../assets/images/breakdown-callout.jpg"
            alt="A driver looking under the bonnet of a car stopped on a wet roadside"
          >
          <div class="card-text">
            <h3>Breakdown callout</h3>
            <p>
              Flat battery, no start, overheating. We aim to be with you inside
              ninety minutes during business hours anywhere in the service area.
            </p>
            <!-- Nothing to add to a quote mid-breakdown. The fastest help is a
                 phone call, so this card offers that instead. -->
            <div class="card-actions">
              <a class="text-link" href="tel:0412887340">Call 0412 887 340</a>
            </div>
          </div>
        </article>

        <article class="card">
          <img
            src="../assets/images/inspection.jpg"
            alt="An inspection checklist being filled in while a mechanic works under the bonnet"
          >
          <div class="card-text">
            <h3>Pre-purchase inspection</h3>
            <p>
              Before you hand over money for a used car, we meet you at the
              seller and send a written report the same afternoon.
            </p>
            <div class="card-actions">
              <QuoteButton :service="inspection" />
            </div>
          </div>
        </article>
      </div>

      <p>
        <RouterLink class="text-link" to="/services">See every job and what it costs</RouterLink>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="split-text">
        <h2>How a booking works</h2>
        <ol class="steps">
          <li>
            <strong>Tell us what the car is doing.</strong> Rego, make and model,
            and the symptom. A photo helps.
          </li>
          <li>
            <strong>We quote before we book.</strong> A price and a two-hour
            arrival window, agreed up front.
          </li>
          <li>
            <strong>We arrive with the parts.</strong> Your driveway or the work
            car park. We clean up after ourselves.
          </li>
          <li>
            <strong>You pay when it is finished.</strong> Card or bank transfer,
            on the spot.
          </li>
        </ol>
      </div>
      <img
        class="split-image"
        src="../assets/images/mobile-workshop.jpg"
        alt="The inside of a mobile mechanic van fitted out with tools"
      >
    </div>
  </section>

  <section class="section band">
    <div class="container">
      <h2>Why people call us back</h2>
      <div class="points">
        <div class="point">
          <h3>One mechanic, every time</h3>
          <p>
            The same person who serviced your car last year is the one who
            turns up this year, and he remembers the car.
          </p>
        </div>
        <div class="point">
          <h3>The quote is the price</h3>
          <p>
            If we find something extra, we stop and call you. Nothing gets
            added to the bill without a yes first.
          </p>
        </div>
        <div class="point">
          <h3>We say no when we should</h3>
          <p>
            Some jobs belong on a hoist. We will tell you that, charge the
            callout only, and name two workshops we trust.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
