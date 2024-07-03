    document.addEventListener('DOMContentLoaded', function () {
        const createDeckButton = document.getElementById('createDeckButton');
        const deckCreationContainer = document.getElementById('deckCreationContainer');
        const addCardButton = document.getElementById('addCardButton');
        const flashcardContainer = document.getElementById('flashcardContainer');
        const finishDeckButton = document.getElementById('finishDeckButton');

        createDeckButton.addEventListener('click', function () {
            createDeckButton.classList.add('hidden');   
            deckCreationContainer.classList.remove('hidden');
        });

        addCardButton.addEventListener('click', function () {
            const cardHTML = `
                <div class="flashcard">
                    <div class="flashcard-inner">
                        <div class="flashcard-front">
                            <textarea placeholder="Вопрос"></textarea>
                            <button class="flipCardButton">Перевернуть</button>
                        </div>
                        <div class="flashcard-back">
                            <textarea placeholder="Ответ"></textarea>
                            <button class="flipCardButton">Перевернуть</button>
                        </div>
                    </div>
                </div>
            `;
            flashcardContainer.insertAdjacentHTML('beforeend', cardHTML);

            const newCard = flashcardContainer.lastElementChild;
            const flipButtons = newCard.querySelectorAll('.flipCardButton');
            flipButtons.forEach(button => {
                button.addEventListener('click', function () {
                    newCard.classList.toggle('flipped');
                });
            });
        });

        finishDeckButton.addEventListener('click', function () {
            // Save the deck and cards to the database
            createDeckButton.classList.remove('hidden');
            deckCreationContainer.classList.add('hidden');
            flashcardContainer.innerHTML = '';
        });
    });