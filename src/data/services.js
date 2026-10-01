// The six jobs on the services page, kept in one list.
// The service cards, the price table and the quote store all read from here,
// so a price only ever changes in one place and the three can never disagree.
//
// price is the small-car price, which is also the "from" price on each card.
// job is the wording the price table has always used for that row.
export const services = [
  {
    id: 'logbook',
    name: 'Logbook service',
    blurb: 'Oil, oil filter, air filter, cabin filter, fluid top-ups and a forty-point check. Book stamped before we leave.',
    job: 'Logbook service',
    time: '60 to 90 min',
    price: 220,
    price4wd: 290,
    parts: 'Oil and filters',
    saturday: 'Yes'
  },
  {
    id: 'brakes',
    name: 'Brakes',
    blurb: 'Pad and rotor replacement, front or rear. We machine rotors off site and return the same week if they are worth saving.',
    job: 'Front brake pads',
    time: '90 min',
    price: 310,
    price4wd: 380,
    parts: 'Pads and fitting',
    saturday: 'No'
  },
  {
    id: 'battery',
    name: 'Batteries and charging',
    blurb: 'Testing, replacement and alternator diagnosis. The six most common battery sizes ride in the van.',
    job: 'Battery replacement',
    time: '30 min',
    price: 180,
    price4wd: 210,
    parts: 'Battery',
    saturday: 'Yes'
  },
  {
    id: 'cooling',
    name: 'Cooling system',
    blurb: 'Coolant flush, thermostat, hoses and radiator cap. Overheating is our most common summer callout.',
    job: 'Coolant flush',
    time: '45 min',
    price: 160,
    price4wd: 190,
    parts: 'Coolant',
    saturday: 'Yes'
  },
  {
    id: 'diagnostic',
    name: 'Diagnostics',
    blurb: 'Engine light scan with a written explanation of each fault code, not just the code number.',
    job: 'Diagnostic scan',
    time: '30 to 60 min',
    price: 120,
    price4wd: 120,
    parts: 'Written report',
    saturday: 'Yes'
  },
  {
    id: 'inspection',
    name: 'Pre-purchase inspection',
    blurb: 'We meet you at the seller, inspect the car, and send a written report with photos the same afternoon.',
    job: 'Pre-purchase inspection',
    time: '60 min',
    price: 180,
    price4wd: 210,
    parts: 'Written report',
    saturday: 'Yes, plus $40'
  }
]
