/*
    js/shared.js
    Contains JavaScript functions that are common and can be used across multiple pages.
    This includes modal dialog logic and localStorage for tracking the last visit.
*/

// --- Modal Dialog Functions ---
// Get references to modal elements (these IDs must exist in your HTML, e.g., in index.html)
const thankYouModal = document.getElementById('thankYouModal');
const modalMessage = document.getElementById('modalMessage'); // Used to set the message in the modal
const modalCloseBtn = document.querySelector('.modal-close-btn'); // The 'x' button inside the modal

// Function to display the modal with a custom message
function showModal(message) {
    if (modalMessage) {
        modalMessage.textContent = message; // Set the message in the modal
    }
    if (thankYouModal) {
        thankYouModal.style.display = 'flex'; // Show the modal overlay (using flex to center content)
    }
}

// Function to hide the modal
function closeModal() {
    if (thankYouModal) {
        thankYouModal.style.display = 'none'; // Hide the modal overlay
    }
}

// Add event listeners to the modal close button and overlay
document.addEventListener('DOMContentLoaded', () => {
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the content
    if (thankYouModal) {
        window.addEventListener('click', (event) => {
            if (event.target === thankYouModal) {
                closeModal();
            }
        });
    }

    // --- Local Storage for Last Visit Date ---
    // This part runs on every page load to display the last visit message.
    const MS_PER_DAY = 1000 * 60 * 60 * 24; // Milliseconds in a day
    const lastVisit = localStorage.getItem('lastVisit'); // Get the stored last visit time
    const currentVisit = Date.now(); // Get the current time in milliseconds

    const lastVisitDisplayElement = document.getElementById('last-visit-display'); // Get the element to display the message

    if (lastVisitDisplayElement) { // Check if the element exists on the current page
        if (lastVisit === null) {
            // First visit
            lastVisitDisplayElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitDate = parseInt(lastVisit, 10); // Convert the stored string to a number
            const timeDifferenceMs = currentVisit - lastVisitDate; // Calculate difference in milliseconds
            const daysDifference = Math.floor(timeDifferenceMs / MS_PER_DAY); // Convert to whole days

            if (daysDifference < 1) {
                // Less than a day
                lastVisitDisplayElement.textContent = "Back so soon! Awesome!";
            } else if (daysDifference === 1) {
                // Exactly one day
                lastVisitDisplayElement.textContent = `You last visited 1 day ago.`;
            } else {
                // More than one day
                lastVisitDisplayElement.textContent = `You last visited ${daysDifference} days ago.`;
            }
        }
        // Store the current visit timestamp for the next visit
        localStorage.setItem('lastVisit', currentVisit.toString());
    }
});

