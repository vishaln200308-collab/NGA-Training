// Sample monthly activities data
const monthlyActivities = [
    { 
        id: 1, 
        activity: "Create project file which contains tables between 12 to 19", 
        subject: "Maths" 
    },
    { 
        id: 2, 
        activity: "Complete chapter on photosynthesis and submit lab report", 
        subject: "Science" 
    },
    { 
        id: 3, 
        activity: "Write an essay on environmental conservation (500 words)", 
        subject: "English" 
    },
    { 
        id: 4, 
        activity: "Solve problems on Newton's laws of motion", 
        subject: "Physics" 
    },
    { 
        id: 5, 
        activity: "Develop a simple calculator using JavaScript", 
        subject: "Computer Science" 
    },
    { 
        id: 6, 
        activity: "Practice algebra problems from chapter 5", 
        subject: "Maths" 
    },
    { 
        id: 7, 
        activity: "Read and summarize the short story 'The Last Leaf'", 
        subject: "English" 
    },
    { 
        id: 8, 
        activity: "Complete coding assignment on arrays and loops", 
        subject: "Computer Science" 
    }
];

// Store registered users (in a real app, this would be on a server)
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [
    { username: 'student', password: 'password' }
];

// Current logged in user
let currentUser = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Management System loaded');
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });
    
    // Switch between login and register forms
    document.getElementById('showRegister').addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
    });
    
    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });
    
    // Navigation buttons
    document.getElementById('profileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showProfileSection();
    });
    
    document.getElementById('monthlyChartBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showMonthlyActivities();
    });
    
    document.getElementById('welcomeProfileBtn').addEventListener('click', function() {
        showProfileSection();
    });
    
    document.getElementById('welcomeMonthlyBtn').addEventListener('click', function() {
        showMonthlyActivities();
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        handleLogout();
    });
    
    // Subject filter change
    document.getElementById('subjectSelect').addEventListener('change', function() {
        displayActivities(this.value);
    });
});

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
}

// Show register form
function showRegisterForm() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

// Handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainApp();
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

// Handle register
function handleRegister() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    if (registeredUsers.find(u => u.username === username)) {
        alert('Username already exists. Please choose a different username.');
        return;
    }
    
    registeredUsers.push({ username, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    alert('Registration successful! Please login with your new account.');
    showLoginForm();
    
    // Clear register form
    document.getElementById('registerForm').reset();
}

// Show main application
function showMainApp() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    // Update student name in welcome message
    document.getElementById('studentName').textContent = currentUser.username;
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('authContainer').style.display = 'flex';
    
    // Hide all sections
    hideAllSections();
    
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
}

// Show profile section
function showProfileSection() {
    hideAllSections();
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('profileSection').scrollIntoView({ behavior: 'smooth' });
}

// Show monthly activities section
function showMonthlyActivities() {
    hideAllSections();
    document.getElementById('monthlyActivitiesSection').style.display = 'block';
    displayActivities('all');
    document.getElementById('monthlyActivitiesSection').scrollIntoView({ behavior: 'smooth' });
}

// Hide all sections
function hideAllSections() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('monthlyActivitiesSection').style.display = 'none';
}

// Display activities based on subject filter
function displayActivities(subject) {
    const activitiesList = document.getElementById('activitiesList');
    activitiesList.innerHTML = '';
    
    const filteredActivities = subject === 'all' 
        ? monthlyActivities 
        : monthlyActivities.filter(activity => activity.subject === subject);
    
    if (filteredActivities.length === 0) {
        activitiesList.innerHTML = '<p class="no-activities">No activities found for the selected subject.</p>';
        return;
    }
    
    filteredActivities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.innerHTML = `
            <div class="activity-subject">${activity.subject}</div>
            <p class="activity-text">${activity.activity}</p>
        `;
        activitiesList.appendChild(activityCard);
    });
}
