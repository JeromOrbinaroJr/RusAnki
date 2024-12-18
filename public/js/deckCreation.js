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
                        <h2>Вопрос</h2>
                        <textarea placeholder="Вопрос"></textarea>
                        <button class="flipCardButton">Перевернуть</button>
                    </div>
                    <div class="flashcard-back">
                        <h2>Ответ</h2>
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
        // Collect deck data
        const deckName = document.getElementById('deckName').value;
        const flashcards = [];
        document.querySelectorAll('.flashcard').forEach(flashcard => {
            const question = flashcard.querySelector('.flashcard-front textarea').value;
            const answer = flashcard.querySelector('.flashcard-back textarea').value;
            flashcards.push({ question, answer });
        });
        
        // Send the data to the server
        fetch('/createDeck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deckName, flashcards })
        }).then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Колода успешно создана!');
                createDeckButton.classList.remove('hidden');
                deckCreationContainer.classList.add('hidden');
                flashcardContainer.innerHTML = '';
            } else {
                alert('Ошибка создания колоды. Пожалуйста, попробуйте снова.');
            }
        }).catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка создания колоды. Пожалуйста, попробуйте снова.');
        });
    });
});

const deckNameInput = document.getElementById('deckName');
const addCardButton = document.getElementById('addCardButton');

deckNameInput.addEventListener('input', () => {
    if (deckNameInput.value.trim() !== '') {
        addCardButton.removeAttribute('disabled');
    } else {
        addCardButton.setAttribute('disabled', 'disabled');
    }
});
