document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const flipButton = document.getElementById('flipButton');
    const prevCardButton = document.getElementById('prevCardButton');
    const nextCardButton = document.getElementById('nextCardButton');
    const flashcardQuestion = document.getElementById('flashcard-question');
    const flashcardAnswer = document.getElementById('flashcard-answer');

    let currentCardIndex = 0;
    const deck = JSON.parse(document.getElementById('deck-data').textContent);

    // Функция переворота карточки
    function flipCard() {
        flashcard.classList.toggle('flipped');
    }

    // Обработчик кнопки переворота карточки
    flipButton.addEventListener('click', () => {
        flipCard();
    });

    // Обработчики кнопок навигации по карточкам
    prevCardButton.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCard();
        }
    });

    nextCardButton.addEventListener('click', () => {
        if (currentCardIndex < deck.cards.length - 1) {
            currentCardIndex++;
            updateCard();
        }
    });

    // Функция обновления карточки на странице
    function updateCard() {
        flashcard.classList.remove('flipped');
        flashcardQuestion.textContent = deck.cards[currentCardIndex].question;
        flashcardAnswer.textContent = deck.cards[currentCardIndex].answer;
    }

    // Показать первую карточку при загрузке страницы
    updateCard();
});
