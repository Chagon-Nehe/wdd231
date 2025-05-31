// Function to fetch and display members
async function getMembers() {
    const membersDisplay = document.getElementById('members-display');
    if (!membersDisplay) {
        console.error("Element with ID 'members-display' not found.");
        return;
    }

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card'); // Add a class for styling

            // Create elements for each piece of information
            const name = document.createElement('h2');
            name.textContent = member.name;

            const address = document.createElement('p');
            address.textContent = `Address: ${member.address}`;

            const phone = document.createElement('p');
            phone.textContent = `Phone: ${member.phone}`;

            const website = document.createElement('a');
            website.href = member.websiteURL;
            website.textContent = member.websiteURL;
            website.target = "_blank"; // Open in new tab

            const image = document.createElement('img');
            image.src = `images/${member.imageFileName}`; // Assuming images are in an 'images' folder
            image.alt = `${member.name} logo`;
            image.loading = "lazy"; // For better performance

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

            const otherInfo = document.createElement('p');
            otherInfo.textContent = `Other Info: ${member.otherInfo}`;

            // Append elements to the member card
            memberCard.appendChild(name);
            memberCard.appendChild(image); // Image before other details
            memberCard.appendChild(address);
            memberCard.appendChild(phone);
            memberCard.appendChild(website);
            memberCard.appendChild(membership);
            memberCard.appendChild(otherInfo);

            // Append the member card to the display area
            membersDisplay.appendChild(memberCard);
        });

    } catch (error) {
        console.error('Could not fetch members:', error);
        membersDisplay.innerHTML = '<p>Failed to load member information. Please try again later.</p>';
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getMembers);

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");



gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}



// Get the current year
    const currentYear = new Date().getFullYear();

    // Update the copyright year in the footer
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
      copyrightYearSpan.textContent = currentYear;
    }

    // Get the last modified date of the document
    const lastModifiedDate = document.lastModified;

    // Update the last modified date in the footer
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
      lastModifiedSpan.textContent = lastModifiedDate;
    }