document.addEventListener('DOMContentLoaded', async () => {
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const membersDisplay = document.getElementById('members-display');
//  fetching from a JSON file, uncomment this block

async function fetchMembers() {
    try {
        const response = await fetch('members.json'); // Adjust path if needed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        membersData = data; // Assign fetched data
        displayMembers(membersData);
    } catch (error) {
        console.error('Error fetching members:', error);
        membersDisplay.innerHTML = '<p class="text-red-500">Failed to load members data.</p>';
    }
}
 // Call the fetch function on load

});
          
// Function to create and display member cards
function displayMembers(members) {
    membersDisplay.innerHTML = ''; // Clear existing content
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div class="info">
                <h3>${member.name}</h3>
                <p>${member.title}</p>
                <!-- Note: The contact-info is structured to occupy its own column in list view -->
                <div class="contact-info-hidden-on-grid">
                    <p>Email: <a href="mailto:${member.email}" class="text-blue-600 hover:underline">${member.email}</a></p>
                    <p>Phone: ${member.phone}</p>
                </div>
            </div>
        `;
        membersDisplay.appendChild(memberCard);
    });
}

// Initial display in Grid view
displayMembers(membersData);

// Event listener for Grid button
gridBtn.addEventListener('click', () => {
    membersDisplay.classList.remove('list-view'); // Remove list-view class
    gridBtn.classList.add('active'); // Add active class to grid button
    listBtn.classList.remove('active'); // Remove active class from list button
});

// Event listener for List button
listBtn.addEventListener('click', () => {
    membersDisplay.classList.add('list-view'); // Add list-view class
    listBtn.classList.add('active'); // Add active class to list button
    gridBtn.classList.remove('active'); // Remove active class from grid button
});
fetchMembers();