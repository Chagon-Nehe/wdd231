





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