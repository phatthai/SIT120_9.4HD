<script setup>
import { ref, computed } from 'vue'

// Settings handed down from ContactView.vue.
defineProps({
  formTitle: {
    type: String,
    default: 'Booking request'
  },
  suburbs: {
    type: Array,
    required: true
  }
})

// The one event this form sends up to ContactView.vue.
const emit = defineEmits(['submit-form'])

// Options for the job dropdown and the parking radios. The template builds
// both lists with v-for, so a new option only has to be added here.
const jobTypes = [
  'Logbook service',
  'Battery or charging',
  'Brakes',
  'Cooling or overheating',
  'Diagnostic scan',
  'Pre-purchase inspection',
  'Not sure yet'
]

const parkingOptions = [
  'Driveway or carport',
  'Work or shopping centre car park',
  'On the street'
]

// An empty form. Used once to start and again for every reset, so the
// starting state and the reset state can never drift apart.
function blankForm() {
  return {
    name: '',
    mobile: '',
    email: '',
    suburb: '',
    rego: '',
    car: '',
    odometer: '',
    job: '',
    preferred: '',
    parking: '',
    wheelKey: false,
    symptom: ''
  }
}

const form = ref(blankForm())

// Errors stay hidden until the first press of Send. After that they update
// as the person types, so a message clears the moment its field is fixed.
const showErrors = ref(false)

// True for the two seconds between a good submit and the reset.
const sent = ref(false)

// Today as YYYY-MM-DD, the same shape a date input gives back, so the two
// can be compared as plain strings.
const now = new Date()
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0')
].join('-')

const MOBILE_PATTERN = /^0[0-9]{9}$/                    // 0 then nine digits, no spaces
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/  // something@domain.suffix
const REGO_PATTERN = /^[A-Za-z0-9]{1,6}$/               // one to six letters or digits

// Returns one message per problem, keyed by field name.
// An empty object means the form is ready to send.
function validate(f) {
  const found = {}

  if (f.name.trim() === '') {
    found.name = 'Tell us who to ask for when we arrive.'
  }

  if (f.mobile.trim() === '') {
    found.mobile = 'Add a mobile number so we can text you the quote.'
  } else if (!MOBILE_PATTERN.test(f.mobile.trim())) {
    found.mobile = 'Ten digits starting with 0, no spaces.'
  }

  if (f.email.trim() === '') {
    found.email = 'Add an email so the written quote has somewhere to go.'
  } else if (!EMAIL_PATTERN.test(f.email.trim())) {
    found.email = 'That address is missing an @ or a domain.'
  }

  if (f.suburb === '') {
    found.suburb = 'Pick a suburb so we know the travel time.'
  }

  if (f.rego.trim() === '') {
    found.rego = 'The rego is how we match you to the right car.'
  } else if (!REGO_PATTERN.test(f.rego.trim())) {
    found.rego = 'Up to six letters or numbers, no spaces or dashes.'
  }

  if (f.car.trim() === '') {
    found.car = 'Year, make and model decides which parts ride along.'
  }

  // v-model.number hands back a real number, or an empty string while the
  // box is blank, so checking the type is what catches a blank box.
  if (typeof f.odometer !== 'number') {
    found.odometer = 'Enter the kilometres shown on the dash.'
  } else if (!Number.isInteger(f.odometer) || f.odometer < 0 || f.odometer > 999999) {
    found.odometer = 'Whole kilometres between 0 and 999,999.'
  }

  if (f.job === '') {
    found.job = 'Pick a job, or choose "Not sure yet".'
  }

  if (f.preferred === '') {
    found.preferred = 'Pick the day you would like us to come.'
  } else if (f.preferred < today) {
    found.preferred = 'That day has already passed.'
  }

  if (f.parking === '') {
    found.parking = 'Where the car sits decides whether we can jack it.'
  }

  if (f.symptom.trim() === '') {
    found.symptom = 'A sentence about the symptom helps us pack the right part.'
  } else if (f.symptom.length > 600) {
    found.symptom = 'That is ' + f.symptom.length + ' characters. The limit is 600.'
  }

  return found
}

// Recalculated whenever the form changes, but empty until the first submit.
const errors = computed(() => (showErrors.value ? validate(form.value) : {}))
const errorCount = computed(() => Object.keys(errors.value).length)

function resetForm() {
  form.value = blankForm()
  showErrors.value = false
  sent.value = false
}

function handleSubmit() {
  showErrors.value = true
  if (errorCount.value > 0) {
    return
  }

  // A shallow copy, so ContactView gets its own object. Clearing this form
  // two seconds later cannot wipe what ContactView is showing.
  emit('submit-form', { ...form.value })

  sent.value = true
  setTimeout(resetForm, 2000)
}
</script>

<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <p class="section-intro">
      We reply with a fixed quote and a two-hour arrival window, usually within
      two hours during business hours.
    </p>

    <form class="booking-form" novalidate @submit.prevent="handleSubmit">

      <fieldset class="field-group">
        <legend>Your details</legend>

        <div class="field">
          <label for="name">Your name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :class="{ 'is-invalid': errors.name }"
          >
          <p v-if="errors.name" class="field-feedback is-invalid">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label for="mobile">Mobile number</label>
          <input
            id="mobile"
            v-model="form.mobile"
            type="tel"
            autocomplete="tel"
            placeholder="0412887340"
            :class="{ 'is-invalid': errors.mobile }"
          >
          <p class="field-hint">Ten digits, no spaces. This is where the quote goes.</p>
          <p v-if="errors.mobile" class="field-feedback is-invalid">{{ errors.mobile }}</p>
        </div>

        <div class="field">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            :class="{ 'is-invalid': errors.email }"
          >
          <p class="field-hint">Written quotes and inspection reports are emailed.</p>
          <p v-if="errors.email" class="field-feedback is-invalid">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label for="suburb">Suburb</label>
          <select id="suburb" v-model="form.suburb" :class="{ 'is-invalid': errors.suburb }">
            <option value="">Choose a suburb</option>
            <option v-for="suburb in suburbs" :key="suburb" :value="suburb">{{ suburb }}</option>
          </select>
          <p class="field-hint">Outside the service area we add $40 travel to the quote.</p>
          <p v-if="errors.suburb" class="field-feedback is-invalid">{{ errors.suburb }}</p>
        </div>
      </fieldset>

      <fieldset class="field-group">
        <legend>The car and the job</legend>

        <div class="field">
          <label for="rego">Registration</label>
          <input
            id="rego"
            v-model="form.rego"
            type="text"
            placeholder="1AB2CD"
            :class="{ 'is-invalid': errors.rego }"
          >
          <p class="field-hint">Up to six characters, letters and numbers only.</p>
          <p v-if="errors.rego" class="field-feedback is-invalid">{{ errors.rego }}</p>
        </div>

        <div class="field">
          <label for="car">Make and model</label>
          <input
            id="car"
            v-model="form.car"
            type="text"
            placeholder="2014 Toyota Hilux"
            :class="{ 'is-invalid': errors.car }"
          >
          <p v-if="errors.car" class="field-feedback is-invalid">{{ errors.car }}</p>
        </div>

        <div class="field">
          <label for="odometer">Odometer (km)</label>
          <input
            id="odometer"
            v-model.number="form.odometer"
            type="number"
            min="0"
            placeholder="84500"
            :class="{ 'is-invalid': errors.odometer }"
          >
          <p class="field-hint">Logbook services fall due by the kilometre, so this tells us which one to pack for.</p>
          <p v-if="errors.odometer" class="field-feedback is-invalid">{{ errors.odometer }}</p>
        </div>

        <div class="field">
          <label for="job">What do you need</label>
          <select id="job" v-model="form.job" :class="{ 'is-invalid': errors.job }">
            <option value="">Choose a job</option>
            <option v-for="job in jobTypes" :key="job" :value="job">{{ job }}</option>
          </select>
          <p v-if="errors.job" class="field-feedback is-invalid">{{ errors.job }}</p>
        </div>

        <div class="field">
          <label for="preferred">Preferred date</label>
          <input
            id="preferred"
            v-model="form.preferred"
            type="date"
            :min="today"
            :class="{ 'is-invalid': errors.preferred }"
          >
          <p class="field-hint">We confirm the two-hour window by text.</p>
          <p v-if="errors.preferred" class="field-feedback is-invalid">{{ errors.preferred }}</p>
        </div>

        <fieldset class="choice-group field-wide">
          <legend>Where will the car be parked</legend>
          <div class="choices">
            <label v-for="option in parkingOptions" :key="option" class="choice">
              <input v-model="form.parking" type="radio" name="parking" :value="option">
              {{ option }}
            </label>
          </div>
          <p class="field-hint">
            We cannot jack a car safely on a slope or soft ground, so this decides
            whether we can start.
          </p>
          <p v-if="errors.parking" class="field-feedback is-invalid">{{ errors.parking }}</p>
        </fieldset>

        <div class="field field-wide">
          <label class="choice">
            <input id="wheelkey" v-model="form.wheelKey" type="checkbox">
            I have the locking wheel nut key, or the car does not have one
          </label>
          <p class="field-hint">The single most common reason a job gets cut short.</p>
        </div>

        <div class="field field-wide">
          <label for="symptom">What is it doing</label>
          <textarea
            id="symptom"
            v-model="form.symptom"
            rows="4"
            placeholder="Grinding noise when braking, worse when cold."
            :class="{ 'is-invalid': errors.symptom }"
          ></textarea>
          <p class="field-hint">
            {{ form.symptom.length }} of 600 characters. The more detail here, the
            more likely we arrive with the right part on the van.
          </p>
          <p v-if="errors.symptom" class="field-feedback is-invalid">{{ errors.symptom }}</p>
        </div>
      </fieldset>

      <div class="form-actions">
        <button class="button" type="submit" :disabled="sent">Send booking request</button>
        <button class="button-secondary" type="button" :disabled="sent" @click="resetForm">Clear form</button>

        <p v-if="errorCount > 0" class="form-alert" role="alert">
          {{ errorCount }} {{ errorCount === 1 ? 'field needs' : 'fields need' }} fixing.
          Each one is marked in red above.
        </p>
        <p v-if="sent" class="form-success" role="status">
          Booking request sent. This form clears itself in 2 seconds.
        </p>
      </div>
    </form>
  </div>
</template>
