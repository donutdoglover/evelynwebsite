// Display today's date
function displayCurrentDate() {
  const today = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', options);
  document.getElementById('current-date').textContent = formattedDate;
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayCurrentDate);