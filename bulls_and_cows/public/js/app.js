function init() {
    let inButton = document.getElementById('input_button');
    inButton.onclick = handleButton;
    let repButton = document.getElementById('input_replay');
    repButton.onclick = replay;
    let guessInput = document.getElementById('input');
    guessInput.onkeydown = handleKeyButton;
    let number = document.getElementById('help_link');
    number.onclick = helpNumber;

    model.generatorNumber();
};

function handleKeyButton(e) {
    let inButton = document.getElementById('input_button');
    if (e.keyCode === 13) {
        inButton.click();
        return false;
    };
};

function handleButton() {
    let guessInput = document.getElementById('input');
    let guess = guessInput.value;
    controller.processGuess(guess);
};

function replay() {
    window.location.reload();
};

function helpNumber() {
    alert('Загаданное число: \n' + model.number);
};

function logger(obj) {
    fetch('/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(data => console.log(data));
};

function winnerPlay(arg) {
    let winner = arg;
    logger({ num: model.number, guess: model.guess, win: winner });
} 

window.onload = init;