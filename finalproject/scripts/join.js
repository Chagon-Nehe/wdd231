/*
    js/join.js
    Specific JavaScript for the join.html page.
    Handles the form submission and interacts with the shared modal.
*/

document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('join-form');

    joinForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally and reloading the page

        // Collect form data using FormData
        const formData = new FormData(joinForm);
        const queryParams = new URLSearchParams(formData).toString(); // Convert to URL query string

        // Show the thank you modal (this function is available from shared.js)
        showModal('Your submission has been received. Thank you for your interest in joining HealthcareConnect!');

        // Redirect to the form-action.html page after a short delay
        // This gives the user time to see the modal before redirection.
        setTimeout(() => {
            window.location.href = `form-action.html?${queryParams}`;
        }, 1500); // Redirect after 1.5 seconds

        // In a real application, you would typically send this `formData`
        // to a server using a `fetch` API call here.
        // For this front-end demo, we just log it and redirect.
        console.log("Form data collected:", Object.fromEntries(formData));

        joinForm.reset(); // Clear all form fields
    });
});
