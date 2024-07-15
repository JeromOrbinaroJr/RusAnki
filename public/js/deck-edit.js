document.addEventListener('DOMContentLoaded', function() {
    const flipButtons = document.querySelectorAll('.flipCardButton');
    const closeButtons = document.querySelectorAll('.closeCardButton');

    // Function to handle card flipping
    function setupFlipButton(button) {
        button.addEventListener('click', function() {
            const card = button.closest('.flashcard');
            card.classList.toggle('flipped');
        });
    }

    flipButtons.forEach(button => {
        setupFlipButton(button);
    });

    // Function to handle card deletion
    function setupCloseButton(button) {
        button.addEventListener('click', function() {
            const card = button.closest('.flashcard');
            card.remove();
        });
    }

    closeButtons.forEach(button => {
        setupCloseButton(button);
    });

    // Functionality for adding a new card
    const addCardButton = document.getElementById('addCardButton');
    addCardButton.addEventListener('click', function() {
        const flashcardContainer = document.getElementById('flashcardContainer');
        const newCardHtml = `
            <div class="flashcard">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <div class="card-label">Вопрос</div>
                        <textarea class="question"></textarea>
                        <button class="flipCardButton">Перевернуть</button>
                        <span class="closeCardButton">&times;</span>
                    </div>
                    <div class="flashcard-back">
                        <div class="card-label">Ответ</div>
                        <textarea class="answer"></textarea>
                        <button class="flipCardButton">Перевернуть</button>
                        <span class="closeCardButton">&times;</span>
                    </div>
                </div>
            </div>
        `;
        // Append the new card HTML to the container
        flashcardContainer.insertAdjacentHTML('beforeend', newCardHtml);

        // Add event listeners for the new card's buttons
        const newCard = flashcardContainer.lastElementChild;
        const newFlipButtons = newCard.querySelectorAll('.flipCardButton');
        const newCloseButtons = newCard.querySelectorAll('.closeCardButton');

        newFlipButtons.forEach(button => {
            setupFlipButton(button);
        });

        newCloseButtons.forEach(button => {
            setupCloseButton(button);
        });
    });

    // Functionality for saving changes
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.addEventListener('click', function() {
        const flashcards = document.querySelectorAll('.flashcard');
        const deck = [];

        flashcards.forEach(card => {
            const question = card.querySelector('.question').value.trim();
            const answer = card.querySelector('.answer').value.trim();
            
            if (question !== '' && answer !== '') {
                deck.push({ question, answer });
            }
        });

        // Example: Send deck data to server or save locally
        console.log('Deck saved:', deck);

        // Replace this with actual server call to save the deck
        fetch('/library/save-deck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deckName: document.querySelector('h2').innerText, cards: deck }),
        })
        .then(response => {
            if (response.ok) {
                // Redirect to library after saving
                window.location.href = '/library';
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
