const container = document.getElementById('events-container');

// Clear container
container.innerHTML = '';

fetch('/api/events')
  .then(res => res.json())
  .then(events => {
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
  })
  .catch(err => {
    container.textContent = 'Failed to load events.';
    console.error(err);
  });