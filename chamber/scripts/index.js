// Function to display member information in a card format
function displayMemberCard(member, containerElement) {
    const memberCard = document.createElement('div');
    memberCard.classList.add('member-card'); // Use this for CSS styling

    const name = document.createElement('h3');
    name.textContent = member.name;

    const image = document.createElement('img');
    image.src = `images/${member.imageFileName}`; // Assumes images are in an 'images' folder
    image.alt = `${member.name} logo`;
    image.loading = "lazy"; // For performance

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${member.phone}`;

    const address = document.createElement('p');
    address.textContent = `Address: ${member.address}`;

    const website = document.createElement('a');
    website.href = member.websiteURL;
    website.textContent = member.websiteURL;
    website.target = "_blank"; // Open in new tab
    website.rel = "noopener noreferrer"; // Security best practice

    const membership = document.createElement('p');
    let levelText = "";
    switch (member.membershipLevel) {
        case 1:
            levelText = "Member";
            break;
        case 2:
            levelText = "Silver Member";
            break;
        case 3:
            levelText = "Gold Member";
            break;
        default:
            levelText = "Unknown Level";
    }
    membership.textContent = `Membership Level: ${levelText}`;

    // Append elements to the member card
    memberCard.appendChild(name);
    memberCard.appendChild(image);
    memberCard.appendChild(phone);
    memberCard.appendChild(address);
    memberCard.appendChild(website);
    memberCard.appendChild(membership);

    // Append the card to the specified container
    containerElement.appendChild(memberCard);
}


// Function to fetch members, filter, randomly select, and display spotlights
async function loadMemberSpotlights() {
    const spotlightContainer = document.getElementById('spotlight-cards');
    if (!spotlightContainer) {
        console.error("Spotlight container with ID 'spotlight-cards' not found.");
        return;
    }

    spotlightContainer.innerHTML = '<p>Loading spotlights...</p>'; // Show loading message

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allMembers = await response.json();

        // 1. Filter for Gold (3) and Silver (2) members
        const eligibleMembers = allMembers.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        // Check if there are enough eligible members for 3 spotlights
        if (eligibleMembers.length < 3) {
            spotlightContainer.innerHTML = '<p>Not enough Gold or Silver members to display 3 spotlights.</p>';
            console.warn("Not enough Gold or Silver members to display 3 spotlights.");
            // Optionally, display fewer if available, or just a message
            if (eligibleMembers.length > 0) {
                spotlightContainer.innerHTML = ''; // Clear message to display what we have
                eligibleMembers.forEach(member => {
                    displayMemberCard(member, spotlightContainer);
                });
            }
            return;
        }

        // 2. Randomly select 3 unique members
        const selectedSpotlights = [];
        // Create a copy of indices to pick from, so we can remove selected ones
        const eligibleMemberIndices = Array.from({length: eligibleMembers.length}, (_, i) => i);

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * eligibleMemberIndices.length);
            // Get the actual index from the eligibleMembers array
            const chosenIndexInEligible = eligibleMemberIndices.splice(randomIndex, 1)[0];
            selectedSpotlights.push(eligibleMembers[chosenIndexInEligible]);
        }

        // 3. Clear existing content and display the selected members
        spotlightContainer.innerHTML = ''; // Clear the loading message
        selectedSpotlights.forEach(member => {
            displayMemberCard(member, spotlightContainer);
        });

    } catch (error) {
        console.error('Error loading member spotlights:', error);
        spotlightContainer.innerHTML = '<p>Failed to load member spotlights. Please try again later.</p>';
    }
}

// Call the function to load spotlights when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadMemberSpotlights);


//join and discover buttons functionality
document.querySelector('.join-button').addEventListener('click', function() {
    window.location.href = this.dataset.href;
});
document.querySelector('.discover-button').addEventListener('click', function() {
    window.location.href = this.dataset.href;
});


