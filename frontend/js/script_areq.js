// Replace with your actual API endpoint
const apiEndpoint = 'http://localhost:3000/events/all'; // API to fetch all events
const updateStatusEndpoint = 'http://localhost:3000/events/status'; // Base endpoint for updating event status

let eventIdMap = new Map(); // Store eventId with its respective event details

// Function to fetch and render pending event requests
async function fetchAndRenderEvents() {
    try {
        const response = await fetch(apiEndpoint);
        const events = await response.json(); // Assuming the API returns JSON data

        // Store events and their corresponding eventIds in the map
        events.forEach(event => {
            const eventId = event._id ? event._id.$oid : undefined; // Extract the eventId from _id.$oid
            if (eventId) {
                eventIdMap.set(eventId, event); // Map eventId to the event object
            }
        });

        // Filter and render only pending events
        const pendingEvents = events.filter(event => event.status === 'pending');
        renderPendingRequests(pendingEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to render pending event requests
function renderPendingRequests(events) {
    const pendingRequestsContainer = document.querySelector('.pending-requests');
    pendingRequestsContainer.innerHTML = ''; // Clear the container

    if (events.length === 0) {
        pendingRequestsContainer.innerHTML = '<p>No pending event requests.</p>';
        return;
    }

    // Loop through the pending events and create request cards
    events.forEach(event => {
        const requestCard = document.createElement('div');
        requestCard.className = 'request-card';

        // Access the eventId directly from the event object
        const eventId = event._id;
        console.log('Event ID:', eventId); // Ensure eventId is being fetched correctly

        requestCard.innerHTML = `
            <div class="request-details">
                <h3>${event.title}</h3>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Start Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> ${event.time}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <p><strong>Description:</strong> ${event.description}</p>
            </div>
            <div class="request-actions">
                <button class="btn btn-approve">Approve</button>
                <button class="btn btn-deny">Deny</button>
            </div>
        `;

        // Add event listeners to the Approve and Deny buttons
        requestCard.querySelector('.btn-approve').addEventListener('click', () => {
            updateEventStatus(eventId, 'approved', requestCard);
        });

        requestCard.querySelector('.btn-deny').addEventListener('click', () => {
            updateEventStatus(eventId, 'rejected', requestCard);
        });

        // Append the card to the container
        pendingRequestsContainer.appendChild(requestCard);
    });
}

// Function to update the event status (approve or deny)
async function updateEventStatus(eventId, newStatus, requestCard) {
    console.log('Updating event:', eventId); // Ensure eventId is being passed correctly

    try {
        const response = await fetch(`${updateStatusEndpoint}/${eventId}`, { // Use dynamic URL
            method: 'PATCH', // HTTP method to update data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }), // Send the new status in the body
        });

        if (response.ok) {
            requestCard.remove(); // Remove the card if successful
            console.log(`Event ${eventId} status updated to ${newStatus}`);
        } else {
            console.error('Failed to update event status:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating event status:', error);
    }
}

// Call the function to fetch and render pending event requests when the page loads
document.addEventListener('DOMContentLoaded', fetchAndRenderEvents);
