
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const homeBtn = document.getElementById('homeBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const profileBtn = document.getElementById('profileBtn');
    const timeBtn = document.getElementById('timeBtn');
    const contactBtn = document.getElementById('contactBtn');
    
    // Get all sections
    const welcomeSection = document.getElementById('welcomeSection');
    const aboutSection = document.getElementById('aboutSection');
    const profileSection = document.getElementById('profileSection');
    const timetableSection = document.getElementById('timetableSection');
    const contactSection = document.getElementById('contactSection');
    
    // Function to hide all sections
    function hideAllSections() {
        welcomeSection.classList.remove('active');
        aboutSection.classList.remove('active');
        profileSection.classList.remove('active');
        timetableSection.classList.remove('active');
        contactSection.classList.remove('active');
    }
    
    // Function to show a specific section
    function showSection(section) {
        hideAllSections();
        section.classList.add('active');
    }
    
    // Add event listeners to navigation buttons
    homeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(welcomeSection);
    });
    
    aboutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(aboutSection);
    });
    
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(profileSection);
    });
    
    timeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(timetableSection);
    });
    
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(contactSection);
    });
    
    // ===== TIMETABLE FILTERING FUNCTIONALITY =====
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const dayColumns = document.querySelectorAll('.day-column');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide day columns based on filter
            dayColumns.forEach(column => {
                if (filter === 'all') {
                    column.style.display = 'flex';
                } else {
                    if (column.getAttribute('data-day') === filter) {
                        column.style.display = 'flex';
                    } else {
                        column.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // ===== SUBJECT CLICK FUNCTIONALITY =====
    const subjects = document.querySelectorAll('.subject');
    
    subjects.forEach(subject => {
        subject.addEventListener('click', function() {
            const subjectName = this.textContent;
            const dayHeader = this.closest('.day-column').querySelector('.day-header').textContent;
            
            // Update current period display
            const currentPeriod = document.querySelector('.current-period .card-text');
            currentPeriod.innerHTML = `
                <strong>${subjectName}</strong> - Room 201<br>
                <small class="text-muted">${dayHeader} - ${getTimeForSubject(this)}</small>
            `;
        });
    });
    
    // Helper function to get time for subject
    function getTimeForSubject(subjectElement) {
        const subjects = subjectElement.closest('.day-column').querySelectorAll('.subject');
        const timeSlots = document.querySelectorAll('.time-slot');
        const subjectIndex = Array.from(subjects).indexOf(subjectElement);
        
        if (subjectIndex >= 0 && timeSlots[subjectIndex]) {
            return timeSlots[subjectIndex].textContent;
        }
        return 'Time not available';
    }
});
