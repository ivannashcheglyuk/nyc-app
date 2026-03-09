const eventNameEl = document.getElementById('event-name');
const eventGenreEl = document.getElementById('event-genre');
const eventImageEl = document.getElementById('event-image');
const eventDateEl = document.getElementById('event-date');
const eventTimeEl = document.getElementById('event-time');
const eventVenueEl = document.getElementById('event-venue');
const eventDescriptionEl = document.getElementById('event-description');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  eventDescriptionEl.textContent = 'No event ID provided.';
} else {
  fetch(`/api/events/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Event not found');
      return res.json();
    })
    .then(event => {
      eventNameEl.textContent = event.name;
      eventGenreEl.textContent = event.genre;
      eventImageEl.src = event.image;
      eventImageEl.alt = event.name;
      eventDateEl.textContent = event.date;
      eventTimeEl.textContent = event.time;
      eventVenueEl.textContent = event.venue;
      eventDescriptionEl.textContent = event.description;
    })
    .catch(err => {
      eventDescriptionEl.textContent = 'Event not found.';
      eventNameEl.textContent = '';
      eventGenreEl.textContent = '';
      eventImageEl.style.display = 'none';
      eventDateEl.textContent = '';
      eventTimeEl.textContent = '';
      eventVenueEl.textContent = '';
      console.error(err);
    });
}