function handleSearch() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-select').value;

    // If category is selected, redirect to that section
    if (category !== 'all') {
        const section = document.getElementById(category);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Category not found.');
        }
        return;
    }

    // Keyword search across multiple sections
    const sections = document.querySelectorAll('div[id]');
    let found = false;

    sections.forEach(section => {
        if (section.id.toLowerCase().includes(searchValue)) {
            section.scrollIntoView({ behavior: 'smooth' });
            found = true;
        }
    });

    if (!found) {
        alert('No matching content found.');
    }
}

function startTimer(durationInSeconds) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const days = Math.floor(durationInSeconds / (3600 * 24));
        const hours = Math.floor((durationInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        if (durationInSeconds > 0) {
            durationInSeconds--;
            setTimeout(updateTimer, 1000);
        } else {
            clearInterval(updateTimer);
        }
    }

    updateTimer();
}

startTimer(3600 * 4 + 3600 * 13 + 60 * 34 + 56);  // Example countdown: 4 days, 13 hours, 34 minutes, 56 seconds

document.getElementById('supplierForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value.trim();
    const itemDetails = document.getElementById('itemDetails').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const unit = document.getElementById('unit').value;

    if (!itemName || !quantity) {
        alert('Please fill in the required fields.');
        return;
    }

    const requestData = {
        itemName,
        itemDetails,
        quantity,
        unit
    };

    localStorage.setItem('supplierRequest', JSON.stringify(requestData));

    document.getElementById('output').innerHTML = `
        <h4>Request Sent Successfully</h4>
        <p><strong>Item:</strong> ${requestData.itemName}</p>
        <p><strong>Details:</strong> ${requestData.itemDetails || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${requestData.quantity} ${requestData.unit}</p>
    `;

    document.getElementById('supplierForm').reset();
});