// Replace with your actual API endpoint
const apiEndpoint = 'http://localhost:3000/events/all';

// Declare a variable to hold the fetched events
let allEvents = [];

// Fetch events from the API and render them
async function fetchAndRenderEvents() {
    try {
        const response = await fetch(apiEndpoint);
        const events = await response.json(); // Assuming the API returns JSON data
        allEvents = events; // Store events in a global variable

        // Filter and render only approved events
        const approvedEvents = allEvents.filter(event => event.status === 'approved');
        renderEvents(approvedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to render events
function renderEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = ''; // Clear the container before appending new data

    // Loop through the events and create cards
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        eventCard.innerHTML = `
            <div class="event-image" "><img width = "150px" height = "250px" src="assets/logo.jpeg" alt=""></div>
            <div class="event-details">
                <h3 class="event-name">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-time">
                    <p>Start Date: ${event.date}</p>
                    <p>Start Time: ${event.time}</p>
                    <p>EventId : ${event._id}</p>
                </div>
            </div>
            <div class="event-actions">
                <button class="action-button">${event.venue}</button>
                <button class="action-button">${event.category}</button>
               <a href="studentRegistration.html?eventId=${event._id}">
             <button class="register-button">Register</button>
             </a>
            </div>
        `;

        // Append the card to the container
        eventsContainer.appendChild(eventCard);
    });
}



// Add event listener to the search bar
document.querySelector('.search-bar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();

    // Filter events based on the search term and status
    const filteredEvents = allEvents.filter(event => {
        return event.status === 'approved' && (
            event.title.toLowerCase().includes(searchTerm) ||
            event.venue.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
    });

    // Render the filtered events
    renderEvents(filteredEvents);
});

// Call the function to fetch and render events when the page loads
document.addEventListener('DOMContentLoaded', fetchAndRenderEvents);
