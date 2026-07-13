// ACCORDION FUNCTIONALITY (MAH STYLE FIXED)
const policyTitles = document.querySelectorAll('.policy-title');
policyTitles.forEach((title) => {
    title.addEventListener("click", function () {
        const card = this.parentElement;
        document.querySelectorAll('.policy-card').forEach((c) => {
            if (c !== card) c.classList.remove('active');
        });
        card.classList.toggle('active');
    });
});

// SEARCH FUNCTIONALITY (TITLE + CONTENT + LISTS)
const searchInput = document.getElementById('search-box');
const noResultsMessage = document.getElementById('no-results');
const policyCards = document.querySelectorAll('.policy-card');

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const searchValue = searchInput.value.toLowerCase();
        let found = false;

        policyCards.forEach((card) => {
            const text = card.innerText.toLowerCase();

            if (text.includes(searchValue)) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (noResultsMessage) {
            noResultsMessage.style.display = found ? "none" : "block";
        }

        updatePolicyCount();
    });
}

// CATEGORY FILTER FUNCTIONALITY
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        this.classList.add('active-filter');
        const selectedCategory = this.getAttribute('data-category');
        policyCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
        if (noResultsMessage) {
            noResultsMessage.style.display = "none";
        }
        updatePolicyCount();
    });
});

// NAVIGATION → OPEN ACCORDION + SCROLL
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
            const id = targetId.replace("#", "");
            const targetCard = document.getElementById(id);
            if (targetCard) {
                e.preventDefault();
                document.querySelectorAll('.policy-card').forEach((c) => {
                    c.classList.remove('active');
                });
                targetCard.classList.add('active');
                targetCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

// WELCOME GREETING
const greeting = document.getElementById('greeting');
if (greeting) {
    const hour = new Date().getHours();
    if (hour < 12) {
        greeting.textContent = "Good Morning! Welcome to the MAH Staff Policy Portal";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon! Welcome to the MAH Staff Policy Portal";
    } else {
        greeting.textContent = "Good Evening! Welcome to the MAH Staff Policy Portal";
    }
}

// POLICY COUNT FUNCTION
function updatePolicyCount() {
    const policyCountElement = document.getElementById('policy-count');
    let visibleCount = 0;
    policyCards.forEach((card) => {
        if (getComputedStyle(card).display !== "none") {
            visibleCount++;
        }
    });
    if (policyCountElement) {
        policyCountElement.textContent =
            visibleCount === 1
                ? "Showing 1 policy"
                : `Showing ${visibleCount} policies`;
    }
}

// initial count
updatePolicyCount();

// FEEDBACK SYSTEM
const feedbackButton = document.getElementById('feedbackButton');
const feedbackInput = document.getElementById('feedbackInput');
const feedbackMessage = document.getElementById('feedbackMessage');
if (feedbackButton) {
    feedbackButton.addEventListener("click", function () {
        const feedback = feedbackInput ? feedbackInput.value.trim() : "";
        if (!feedback) {
            if (feedbackMessage) {
                feedbackMessage.style.color = "#990000";
                feedbackMessage.textContent = "Please enter your feedback or suggestion.";
            }
        } else {
            if (feedbackMessage) {
                feedbackMessage.style.color = "green";
                feedbackMessage.textContent = "Thank you for your feedback!";
            }

            if (feedbackInput) {
                feedbackInput.value = "";
            }
        }
    });
}