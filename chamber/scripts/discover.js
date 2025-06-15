document.addEventListener('DOMContentLoaded', () => {
    const placesGrid = document.getElementById('places-grid');
    const lastVisitMessageElement = document.getElementById('last-visit-message'); // Get the message element

    // --- Last Visit Logic (NEW) ---
    const MS_PER_DAY = 1000 * 60 * 60 * 24; // Milliseconds in a day
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now(); // Current timestamp in milliseconds

    if (lastVisit === null) {
        // First visit
        lastVisitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit, 10); // Convert stored string to number
        const timeDifferenceMs = currentVisit - lastVisitDate;
        const daysDifference = Math.floor(timeDifferenceMs / MS_PER_DAY);

        if (daysDifference < 1) {
            // Less than a day
            lastVisitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly one day
            lastVisitMessageElement.textContent = `You last visited 1 day ago.`;
        } else {
            // More than one day
            lastVisitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Store the current visit timestamp for the next visit
    localStorage.setItem('lastVisit', currentVisit.toString());
    // --- End Last Visit Logic ---


    async function getPlacesData() {
        try {
            const response = await fetch('data/discover.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPlaces(data);
        } catch (error) {
            console.error('Error fetching places data:', error);
            placesGrid.innerHTML = '<p>Could not load attractions. Please try again later.</p>';
        }
    }

    function displayPlaces(places) {
        places.forEach((place, index) => {
            // Create elements
            const card = document.createElement('div');
            card.classList.add('place-card');
            card.id = `card-${index + 1}`; // For grid-template-areas

            const h2 = document.createElement('h2');
            h2.textContent = place.name;

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = place.image;
            img.alt = place.name;
            img.loading = 'lazy'; // Improve performance with lazy loading
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = place.name; // Optional: caption for the image

            figure.appendChild(img);
            figure.appendChild(figcaption);

            const address = document.createElement('address');
            address.textContent = place.address;

            const description = document.createElement('p');
            description.textContent = place.description;

            const learnMoreButton = document.createElement('button');
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.classList.add('learn-more-btn');

            // Append to card
            card.appendChild(h2);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(learnMoreButton);

            // Append card to the grid container
            placesGrid.appendChild(card);
        });
    }

    getPlacesData();
});