// Show student profile when button is clicked
document.getElementById('profileBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('profileSection').style.display = 'block';
});

document.getElementById('TimeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('timetable').style.display = 'block';
});

// Simple page load effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Management System loaded');
});