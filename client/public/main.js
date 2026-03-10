const container = document.getElementById('events-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resetButton = document.getElementById('resetSearch');

let allEvents = [];

// Hide the reset/back button initially
resetButton.style.display = 'none';

// Function to display events
function displayEvents(events) {
  container.innerHTML = '';

  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${event.image}" alt="${event.name}">
      <h3>${event.name}</h3>
      <p>${event.date} at ${event.time}</p>
      <p>${event.venue}</p>
      <p>${event.description.substring(0, 100)}...</p>
    `;

    card.addEventListener('click', () => {
      window.location.href = `event.html?id=${event.id}`;
    });

    container.appendChild(card);
  });
}

// Load events from API
fetch('/api/events')
  .then(res => res.json())
  .then(events => {
    allEvents = events;
    displayEvents(events);
  })
  .catch(err => {
    container.textContent = 'Failed to load events.';
    console.error(err);
  });

// Search functionality
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchText = searchInput.value.toLowerCase();

  const filtered = allEvents.filter(event =>
    event.name.toLowerCase().includes(searchText)
  );

  displayEvents(filtered);

  // Show back button only if search filtered the events
  if (filtered.length < allEvents.length) {
    resetButton.style.display = 'inline-block';
  } else {
    resetButton.style.display = 'none';
  }
});

// Reset / Back button functionality
resetButton.addEventListener('click', () => {
  displayEvents(allEvents);        // show all events again
  searchInput.value = '';           // clear search input
  resetButton.style.display = 'none'; // hide back button
});