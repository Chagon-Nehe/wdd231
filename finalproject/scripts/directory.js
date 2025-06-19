/*
    js/directory.js
    Specific JavaScript for the directory.html page.
    Handles fetching and displaying provider data, filtering, and view toggling.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Get references to important HTML elements
    const searchInput = document.getElementById('search-input');
    const specialtyFilter = document.getElementById('specialty-filter');
    const providerList = document.getElementById('provider-list');
    const noResultsMessage = document.getElementById('no-results');

    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');

    let providersData = []; // This will store the data fetched from providers.json

    // --- Function to fetch data from JSON ---
    async function fetchProvidersData() {
        try {
           // that gives the correct path to uploaded files.
            const response = await fetch('data/providers.json');
            if (!response.ok) { // Check if the network response was successful (status 200-299)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            providersData = await response.json(); // Parse the JSON data
            populateSpecialtyFilter(providersData); // Populate the dropdown with unique specialties
            filterProviders(); // Display all providers initially (or based on any pre-existing filters)
        } catch (error) {
            console.error('Error fetching providers data:', error);
            // Display an error message to the user if data fetching fails
            providerList.innerHTML = '<p class="text-center text-red-500">Failed to load provider data. Please try again later.</p>';
        }
    }

    // Function to dynamically populate the specialty filter dropdown
    function populateSpecialtyFilter(providers) {
        const specialties = new Set(); // A Set automatically stores only unique values
        providers.forEach(provider => {
            specialties.add(provider.specialty); // Add each provider's specialty
        });

        // Clear existing options, keeping only the "All Specialties" option
        specialtyFilter.innerHTML = '<option value="all">All Specialties</option>';

        // Convert the Set to an Array, sort it alphabetically, and add options to the dropdown
        Array.from(specialties).sort().forEach(specialty => {
            const option = document.createElement('option');
            option.value = specialty;
            option.textContent = specialty;
            specialtyFilter.appendChild(option);
        });
    }

    // Function to display provider cards based on a given list of providers
    function displayProviders(providersToDisplay) {
        providerList.innerHTML = ''; // Clear current listings before adding new ones

        if (providersToDisplay.length === 0) {
            noResultsMessage.classList.remove('hidden'); // Show "No results" message
            return; // Exit the function
        }
        noResultsMessage.classList.add('hidden'); // Hide "No results" message if there are providers

        // Loop through each provider and create an HTML card for them
        providersToDisplay.forEach(provider => {
            const card = document.createElement('div');
            card.classList.add('provider-card');
            // Assign grid-area name for CSS grid layout based on ID for responsive layouts
            // (Note: In a dynamic list, you'd typically rely more on auto-placement or simpler grid layouts,
            // but this is to match the 'grid-template-areas' requirement from the prompt.)
            card.id = `card-${provider.id}`; // Assuming provider.id is unique and 1-15 as per JSON

            // Using a template literal (` `) to easily insert JavaScript variables into HTML
            card.innerHTML = `
                <div>
                    <h3>${provider.name}</h3>
                    <p class="specialty">${provider.specialty}</p>
                    <p>${provider.address}</p>
                    <p class="contact-details">Phone: ${provider.phone}<br>Hours: ${provider.hours}</p>
                    <p class="description">${provider.description}</p>
                </div>
                <div class="button-group">
                    <a href="${provider.mapLink}" target="_blank" class="map-link">View Map</a>
                    ${provider.bookingLink ? `<a href="${provider.bookingLink}" target="_blank" class="booking-link">Book Appointment</a>` : ''}
                </div>
            `;
            providerList.appendChild(card); // Add the created card to the provider list section
        });
    }

    // Function to filter providers based on current search input and selected specialty
    function filterProviders() {
        const searchTerm = searchInput.value.toLowerCase().trim(); // Get search term, lowercase, remove extra spaces
        const selectedSpecialty = specialtyFilter.value; // Get selected specialty value

        // Filter the main providersData array using the array `filter` method
        const filtered = providersData.filter(provider => {
            // Check if provider matches the search term (case-insensitive)
            const matchesSearch = searchTerm === '' || // If search box is empty, all match
                                  provider.name.toLowerCase().includes(searchTerm) ||
                                  provider.specialty.toLowerCase().includes(searchTerm) ||
                                  provider.description.toLowerCase().includes(searchTerm) ||
                                  provider.address.toLowerCase().includes(searchTerm);

            // Check if provider matches the selected specialty
            const matchesSpecialty = selectedSpecialty === 'all' || // If 'All Specialties' is selected, all match
                                     provider.specialty === selectedSpecialty;

            return matchesSearch && matchesSpecialty; // Return true only if both conditions are met
        });

        displayProviders(filtered); // Display the filtered providers
    }

    // --- Event Listeners ---
    // Listen for input changes in the search box
    searchInput.addEventListener('input', filterProviders);
    // Listen for changes in the specialty filter dropdown
    specialtyFilter.addEventListener('change', filterProviders);

    // Listen for clicks on the Grid View button
    gridBtn.addEventListener('click', () => {
        providerList.classList.remove('list-view'); // Remove list-view class
        gridBtn.classList.add('active'); // Activate grid button style
        listBtn.classList.remove('active'); // Deactivate list button style
    });

    // Listen for clicks on the List View button
    listBtn.addEventListener('click', () => {
        providerList.classList.add('list-view'); // Add list-view class
        listBtn.classList.add('active'); // Activate list button style
        gridBtn.classList.remove('active'); // Deactivate grid button style
    });

    // Call fetchProvidersData to load and display data when the page loads
    fetchProvidersData();
});
