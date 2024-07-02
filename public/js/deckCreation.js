// document.addEventListener('DOMContentLoaded', function() {
//     const createDeckButton = document.getElementById('createDeckButton');
//     const cardEditorContainer = document.getElementById('cardEditorContainer');
//     const flipCardButton = document.getElementById('flipCardButton');
//     const saveCardButton = document.getElementById('saveCardButton');
//     const flashcard = document.getElementById('flashcard');
//     const deckNameModal = document.getElementById('deckNameModal');
//     const saveDeckNameButton = document.getElementById('saveDeckNameButton');
//     const deckNameInput = document.getElementById('deckNameInput');
//     const deckNameHeader = document.getElementById('deckNameHeader');

//     // Инициализация модального окна
//     const modalInstances = M.Modal.init(deckNameModal);

//     createDeckButton.addEventListener('click', function() {
//         const instance = M.Modal.getInstance(deckNameModal);
//         instance.open();
//     });

//     saveDeckNameButton.addEventListener('click', function() {
//         const deckName = deckNameInput.value;
//         if (deckName) {
//             deckNameHeader.textContent = `Колода: ${deckName}`;
//             cardEditorContainer.style.display = 'block';
//             createDeckButton.style.display = 'none'; // Скрыть кнопку создания колоды
//         } else {
//             alert('Пожалуйста, введите название колоды.');
//         }
//     });

//     flipCardButton.addEventListener('click', function() {
//         flashcard.classList.toggle('flipped');
//     });

//     saveCardButton.addEventListener('click', function() {
//         const frontText = document.getElementById('frontText').value;
//         const backText = document.getElementById('backText').value;

//         if (frontText && backText) {
//             alert('Карта сохранена!');
//             // Здесь вы можете добавить логику для сохранения карты
//             cardEditorContainer.style.display = 'none';
//             createDeckButton.style.display = 'block'; // Показать кнопку создания колоды после сохранения
//         } else {
//             alert('Заполните обе стороны карты.');
//         }
//     });
// });

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