// Wait for the entire HTML document to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements with the class 'flex-box'
    const flexBoxes = document.querySelectorAll('.flex-box');
    // Get the modal overlay element by its ID
    const membershipModal = document.getElementById('membershipModal');
    // Get the close button inside the modal by its ID
    const closeModalButton = document.getElementById('closeModal');
    // Get the modal title element by its ID
    const modalTitle = document.getElementById('modalTitle');
    // Get the modal description element by its ID
    const modalDescription = document.getElementById('modalDescription');

    // Loop through each flex-box element
    flexBoxes.forEach(box => {
        // Add a click event listener to each box
        box.addEventListener('click', () => {
            // Get the title and description from the data-attributes of the clicked box
            const title = box.dataset.title;
            const description = box.dataset.description;

            // Set the text content of the modal's title and description elements
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Change the display style of the modal overlay to 'flex' to make it visible
            membershipModal.style.display = 'flex';
        });
    });

    // Add a click event listener to the close button
    closeModalButton.addEventListener('click', () => {
        // Change the display style of the modal overlay back to 'none' to hide it
        membershipModal.style.display = 'none';
    });

    // Add a click event listener to the modal overlay itself
    membershipModal.addEventListener('click', (event) => {
        // Check if the click happened directly on the overlay (not on the modal content inside it)
        if (event.target === membershipModal) {
            // If so, hide the modal
            membershipModal.style.display = 'none';
        }
    });
});