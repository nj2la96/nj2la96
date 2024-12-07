document.addEventListener('DOMContentLoaded', () => {
    // Load the Home page by default
    loadPage('home');

    // Add event listeners to navigation links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                if (page === 'contact') {
                    addFormValidation();
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    function addFormValidation() {
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('All fields are required!');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Form submitted successfully!');
            // Reset form after submission
            document.getElementById('contactForm').reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});