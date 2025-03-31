/**
 * Initializes the Trivia Game when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("trivia-form");
	const questionContainer = document.getElementById("question-container");
	const newPlayerButton = document.getElementById("new-player");

	// Initialize the game
	// checkUsername(); Uncomment once completed
	fetchQuestions();
	displayScores();

	/**
	 * Fetches trivia questions from the API and displays them.
	 */
	function fetchQuestions() {
		showLoading(true); // Show loading state

		fetch("https://opentdb.com/api.php?amount=10&type=multiple")
			.then((response) => response.json())
			.then((data) => {
				displayQuestions(data.results);
				showLoading(false); // Hide loading state
			})
			.catch((error) => {
				console.error("Error fetching questions:", error);
				showLoading(false); // Hide loading state on error
			});
	}

	/**
	 * Toggles the display of the loading state and question container.
	 *
	 * @param {boolean} isLoading - Indicates whether the loading state should be shown.
	 */
	function showLoading(isLoading) {
		document.getElementById("loading-container").classList = isLoading
			? ""
			: "hidden";
		document.getElementById("question-container").classList = isLoading
			? "hidden"
			: "";
	}

	/**
	 * Displays fetched trivia questions.
	 * @param {Object[]} questions - Array of trivia questions.
	 */
	function displayQuestions(questions) {
		questionContainer.innerHTML = ""; // Clear existing questions
		questions.forEach((question, index) => {
			const questionDiv = document.createElement("div");
			questionDiv.innerHTML = `
                <p>${question.question}</p>
                ${createAnswerOptions(
					question.correct_answer,
					question.incorrect_answers,
					index
				)}
            `;
			questionContainer.appendChild(questionDiv);
		});
	}

	/**
	 * Creates HTML for answer options.
	 * @param {string} correctAnswer - The correct answer for the question.
	 * @param {string[]} incorrectAnswers - Array of incorrect answers.
	 * @param {number} questionIndex - The index of the current question.
	 * @returns {string} HTML string of answer options.
	 */
	function createAnswerOptions(
		correctAnswer,
		incorrectAnswers,
		questionIndex
	) {
		const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
			() => Math.random() - 0.5
		);
		return allAnswers
			.map(
				(answer) => `
            <label>
                <input type="radio" name="answer${questionIndex}" value="_span class="hljs-subst">${answer}" ${
					answer === correctAnswer ? 'data-correct="true"' : ""
				}>
                ${answer}
            </label>
        `
			)
			.join("");
	}

	// Event listeners for form submission and new player button
	form.addEventListener("submit", handleFormSubmit);
	newPlayerButton.addEventListener("click", newPlayer);

	/**
	 * Handles the trivia form submission.
	 * @param {Event} event - The submit event.
	 */
	function handleFormSubmit(event) {
		event.preventDefault();
		//... form submission logic including setting cookies and calculating score
	}
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEq) === 0) {
            return c.substring(nameEq.length, c.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Check for saved username when page loads
window.onload = function() {
    let username = getCookie("username");
    if (username) {
        document.getElementById("username").value = username;
        document.getElementById("welcome-message").innerHTML = `Welcome back, ${username}!`;
    } else {
        document.getElementById("username").placeholder = "Enter your username";
    }
};

// Handle form submission and save the username in a cookie
function handleFormSubmit(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    if (username) {
        setCookie("username", username, 7);
        alert("Username saved successfully!");
        document.getElementById("welcome-message").innerHTML = `Welcome, ${username}!`;
    } else {
        alert("Please enter a username.");
    }
}

// Handle new player scenario (clear cookie and reset the form)
function newPlayer() {
    deleteCookie("username");
    document.getElementById("username").value = "";
    document.getElementById("welcome-message").innerHTML = "Welcome, new player!";
    alert("Starting a new game...");
}


// Function to set a session cookie
function setSessionCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a session cookie
function getSessionCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEq) === 0) {
            return c.substring(nameEq.length, c.length);
        }
    }
    return null;
}

// Function to delete a session cookie
function deleteSessionCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Initialize the session
function initializeSession() {
    let username = document.getElementById("username").value;
    if (username) {
        setSessionCookie("username", username, 7);
        document.getElementById("welcome-message").innerHTML = `Welcome, ${username}!`;
        document.getElementById("username").value = "";
    } else {
        alert("Please enter a username.");
    }
}

// End the session and log out
function endSession() {
    deleteSessionCookie("username");
    document.getElementById("username").value = "";
    document.getElementById("welcome-message").innerHTML = "You have logged out.";
}

// Check session on page load
window.onload = function() {
    let username = getSessionCookie("username");
    if (username) {
        document.getElementById("welcome-message").innerHTML = `Welcome back, ${username}!`;
    } else {
        document.getElementById("welcome-message").innerHTML = "Please enter your username to start.";
    }
};


// Function to set a session cookie
function setSessionCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // Set expiration
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";  // Set cookie
}

// Function to get the value of a session cookie
function getSessionCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEq) === 0) {
            return c.substring(nameEq.length, c.length);  // Return cookie value
        }
    }
    return null;  // Return null if cookie is not found
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();  // Prevent form from reloading the page
    
    // Get values from form fields
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    // Basic form validation
    if (!username || !email) {
        alert("Please fill out all fields.");
        return;
    }

    // Store username and email in cookies for session management
    setSessionCookie("username", username, 7);  // Session expires in 7 days
    setSessionCookie("email", email, 7);  // Session expires in 7 days

    // Show success message
    document.getElementById("message").innerText = `Welcome, ${username}! Your session is set.`;
    
    // Optionally, clear form fields after submission
    document.getElementById("user-form").reset();
}

// Check for an existing session on page load
window.onload = function() {
    let username = getSessionCookie("username");
    let email = getSessionCookie("email");

    if (username && email) {
        document.getElementById("message").innerText = `Welcome back, ${username}! Your email is ${email}.`;
    } else {
        document.getElementById("message").innerText = "Please fill out the form to begin.";
    }
};

// Add event listener to form submission
document.getElementById("user-form").addEventListener("submit", handleFormSubmit);