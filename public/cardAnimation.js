document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const flipButton = document.getElementById('flipButton');

    flipButton.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });
});
