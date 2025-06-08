// Ensure the DOM is fully loaded before running the script
        document.addEventListener('DOMContentLoaded', function() {
            // Get references to the filter buttons
            const allButton = document.getElementById('all');
            const cseButton = document.getElementById('cse');
            const wwdButton = document.getElementById('wwd');

            // Get all the course code elements
            // querySelectorAll returns a NodeList, which can be iterated over
            const courseCodes = document.querySelectorAll('.course-code .flex-box');

            /**
             * Filters the displayed course codes based on a given prefix.
             * @param {string} prefix - The prefix to filter by ('all', 'cse', 'wwd').
             */
            function filterCourses(prefix) {
                // Iterate over each course code element
                courseCodes.forEach(course => {
                    const courseText = course.textContent; // Get the text content of the course div (e.g., "CSE110")

                    // Check if the course should be displayed
                    // If prefix is 'all', show all courses.
                    // Otherwise, check if the course text starts with the uppercased prefix.
                    if (prefix === 'all' || courseText.startsWith(prefix.toUpperCase())) {
                        // If it matches, set display to 'flex' (to maintain the flexbox layout)
                        course.style.display = 'flex';
                    } else {
                        // If it doesn't match, hide the element
                        course.style.display = 'none';
                    }
                });
            }

            // Add click event listeners to each button
            // When 'All' button is clicked, show all courses
            allButton.addEventListener('click', function() {
                filterCourses('all');
            });

            // When 'CSE' button is clicked, show only CSE courses
            cseButton.addEventListener('click', function() {
                filterCourses('cse');
            });

            // When 'WWD' button is clicked, show only WWD courses
            wwdButton.addEventListener('click', function() {
                filterCourses('wwd');
            });

            // Initial call to display all courses when the page first loads
            filterCourses('all');
        });
    





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

const modal = document.getElementById("course-details");
const openModalBtn = document.querySelector(".flex-box");
const closeModalBtn= document.querySelector("#close-dialog");

openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});
