let currentCardIndex = 0;
const cards = document.querySelectorAll('.flashcard-container');

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.toggle('hidden', i !== index);
    });
    currentCardIndex = index;
}

function nextCard() {
    if (currentCardIndex < cards.length - 1) {
        showCard(currentCardIndex + 1);
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        showCard(currentCardIndex - 1);
    }
}

// Ensure only the first card is shown initially
showCard(0);

cards.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
