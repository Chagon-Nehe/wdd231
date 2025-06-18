document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dataList = document.getElementById('submitted-data-list');

    if (params.size === 0) {
        dataList.innerHTML = '<li>No data submitted.</li>';
    } else {
        for (const [key, value] of params.entries()) {
            // Make keys more readable
            const readableKey = key.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${readableKey}:</strong> ${decodeURIComponent(value)}`;
            dataList.appendChild(listItem);
        }
    }
});
