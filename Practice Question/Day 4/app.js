// Blogging Platform Module using Revealing Module Pattern
const BloggingPlatform = (function() {
    // Private variables
    const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
    let posts = [];
    let todos = [];

    // DOM Elements
    const postsContainer = document.getElementById('posts-container');
    const todosContainer = document.getElementById('todos-container');
    const refreshBtn = document.getElementById('refresh-btn');
    const postsCountEl = document.getElementById('posts-count');
    const todosCountEl = document.getElementById('todos-count');
    const completedTodosEl = document.getElementById('completed-todos');

    // Private methods

    /**
     * Fetches data from the specified URL
     * @param {string} url - The URL to fetch data from
     * @returns {Promise} Promise that resolves with the JSON data
     */
    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    }

    /**
     * Fetches blog posts from the API
     * @returns {Promise} Promise that resolves with posts data
     */
    function fetchPosts() {
        return fetchData(`${API_BASE_URL}/posts`)
            .then(data => {
                posts = data.slice(0, 3); // Limit to 10 posts for display
                return posts;
            });
    }

    /**
     * Fetches todos from the API
     * @returns {Promise} Promise that resolves with todos data
     */
    function fetchTodos() {
        return fetchData(`${API_BASE_URL}/todos`)
            .then(data => {
                todos = data.slice(0, 7); // Limit to 15 todos for display
                return todos;
            });
    }

    /**
     * Displays posts in the posts container
     */
    function displayPosts() {
        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="error">No posts available</div>';
            return;
        }

        const postsHTML = posts.map(post => `
            <article class="post">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
            </article>
        `).join('');

        postsContainer.innerHTML = postsHTML;
    }

    /**
     * Displays todos in the todos container
     */
    function displayTodos() {
        if (todos.length === 0) {
            todosContainer.innerHTML = '<div class="error">No todos available</div>';
            return;
        }

        const todosHTML = todos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                
                <span class="todo-text">${todo.title}</span>
            </div>
        `).join('');

        todosContainer.innerHTML = todosHTML;
    }

    /**
     * Updates the statistics display
     */
    function updateStats() {
        postsCountEl.textContent = posts.length;
        todosCountEl.textContent = todos.length;
        completedTodosEl.textContent = todos.filter(todo => todo.completed).length;
    }

    /**
     * Shows an error message in the specified container
     * @param {string} message - The error message to display
     * @param {HTMLElement} container - The container to show the error in
     */
    function showError(message, container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }

    /**
     * Shows a loading indicator in the specified container
     * @param {HTMLElement} container - The container to show the loading indicator in
     */
    function showLoading(container) {
        container.innerHTML = '<div class="loading">Loading...</div>';
    }

    /**
     * Shows a success message in the specified container
     * @param {string} message - The success message to display
     * @param {HTMLElement} container - The container to show the success message in
     */
    function showSuccess(message, container) {
        container.innerHTML = `<div class="success">${message}</div>`;
        setTimeout(() => {
            // Clear success message after 3 seconds and restore content
            if (container.querySelector('.success')) {
                if (container === postsContainer) {
                    displayPosts();
                } else if (container === todosContainer) {
                    displayTodos();
                }
            }
        }, 3000);
    }

    /**
     * Loads all data (posts and todos) from the API
     */
    function loadAllData() {
        // Show loading states
        showLoading(postsContainer);
        showLoading(todosContainer);

        // Fetch posts and todos concurrently
        Promise.all([fetchPosts(), fetchTodos()])
            .then(() => {
                displayPosts();
                displayTodos();
                updateStats();
            })
            .catch(error => {
                const errorMessage = `Failed to load data: ${error.message}`;
                showError(errorMessage, postsContainer);
                showError(errorMessage, todosContainer);
                console.error('Error loading data:', error);
            });
    }

    /**
     * Initializes event listeners
     */
    function initEventListeners() {
        refreshBtn.addEventListener('click', () => {
            loadAllData();
            showSuccess('Refreshing data...', postsContainer);
            showSuccess('Refreshing data...', todosContainer);
        });
    }

    // Public API
    return {
        /**
         * Initializes the blogging platform
         */
        init: function() {
            console.log('Initializing Blogging Platform...');
            initEventListeners();
            loadAllData();
        }
    };
})();

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    BloggingPlatform.init();
});