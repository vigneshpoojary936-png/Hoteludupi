// Wait until the HTML document is fully loaded before running any script.
document.addEventListener("DOMContentLoaded", function() {

    // --- LOGIN/LOGOUT AUTHENTICATION LOGIC ---
    const loginStatus = document.getElementById('login-status');
    const loginForm = document.getElementById('login-form');

    // Function to update the navbar based on login state
    function updateNav() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            // User is logged in, show Logout button
            loginStatus.innerHTML = `<a href="#" id="logout-btn">Logout</a>`;
            const logoutBtn = document.getElementById('logout-btn');
            if(logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    alert('You have been successfully logged out.');
                    window.location.href = 'index.html'; // Redirect to home page
                });
            }
        } else {
            // User is logged out, show Login link
            loginStatus.innerHTML = `<a href="login.html">Login</a>`;
        }
    }
    
    // Check login status on every page load
    updateNav();

    // Logic for the LOGIN PAGE form
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the default way
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // --- IMPORTANT ---
            // This is a FAKE login. In a real application, you would send this
            // data to a server to be verified. Here, we just check if it's not empty.
            if (email && password) {
                // If login is "successful", set the flag in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful! Welcome to Hotel Udupi Grand.');
                window.location.href = 'index.html'; // Redirect to the homepage
            } else {
                alert('Please enter both email and password.');
            }
        });
    }


    // --- Sentiment Analysis Logic for sentiment.html ---
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const feedbackText = document.getElementById('feedbackText').value;
            const resultDiv = document.getElementById('result');

            if (feedbackText.trim() === "") {
                resultDiv.innerHTML = `<p class="neutral">Please enter some feedback first.</p>`;
                return;
            }

            const sentiment = getSentiment(feedbackText);
            let emoji = '';
            let sentimentClass = '';

            if (sentiment === 'Positive') {
                emoji = '😄';
                sentimentClass = 'positive';
            } else if (sentiment === 'Negative') {
                emoji = '😠';
                sentimentClass = 'negative';
            } else {
                emoji = '😐';
                sentimentClass = 'neutral';
            }

            resultDiv.innerHTML = `
                <span class="emoji">${emoji}</span>
                <p class="${sentimentClass}">Sentiment: ${sentiment}</p>
            `;
        });
    }

    function getSentiment(text) {
        const positiveWords = ["amazing", "good", "great", "excellent", "love", "best", "wonderful", "happy", "pleased", "fantastic"];
        const negativeWords = ["bad", "terrible", "awful", "horrible", "disappointed", "poor", "hate", "worst", "sad"];
        const lowerCaseText = text.toLowerCase();
        let positiveCount = 0;
        let negativeCount = 0;
        positiveWords.forEach(word => {
            if (lowerCaseText.includes(word)) positiveCount++;
        });
        negativeWords.forEach(word => {
            if (lowerCaseText.includes(word)) negativeCount++;
        });
        if (positiveCount > negativeCount) return 'Positive';
        if (negativeCount > positiveCount) return 'Negative';
        return 'Neutral';
    }


    // --- Text to Speech Logic for text_to_speech.html ---
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn) {
        speakBtn.addEventListener('click', function() {
            const ttsText = document.getElementById('ttsText').value;
            if (ttsText.trim() !== "" && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(ttsText);
                speechSynthesis.speak(utterance);
            } else if (!('speechSynthesis' in window)) {
                alert("Sorry, your browser doesn't support text-to-speech.");
            }
        });
    }

});