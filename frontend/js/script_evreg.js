document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.profile-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Collect input values
        const title = document.getElementById('event-name').value.trim(); // Matches "title"
        const description = document.getElementById('description').value.trim(); // Matches "description"
        const date = document.getElementById('start-date').value; // Matches "date"
        const time = document.getElementById('start-time').value; // Matches "time"
        const venue = document.getElementById('venue').value.trim(); // Matches "venue"
        const category = document.getElementById('event-type').value; // Matches "category"
        

        // Validate form data
        if (!title || !description || !date || !time || !venue || !category) {
            alert('Please fill in all fields.');
            return;
        }

        // Create the payload
        const payload = {
            title,
            description,
            date,
            time,
            venue,
            category,
        };

        // Send the data to the backend
        fetch('http://localhost:3000/events/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload), // Send the payload as JSON
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                alert('Event created successfully!');
                form.reset(); // Clear the form after successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(`Failed to create event: ${error.message}`);
            });
    });
});
