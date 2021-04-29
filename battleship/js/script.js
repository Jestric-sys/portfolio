// Объект представления 
let view = {
    
    displayMessage: function(msg) {                                 // Добавление текстовой строки
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },

    displayHit: function(location) {                                // Добавление попаданий на поле
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },

    displayShipHit: function(location, location2, location3) {      // Добавление уничтоженных кораблей
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'ship_hit');
        let cell2 = document.getElementById(location2);
        cell2.setAttribute('class', 'ship_hit');
        let cell3 = document.getElementById(location3);
        cell3.setAttribute('class', 'ship_hit');
    },

    displayMiss: function(location) {                               // Добавление промахов на поле
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    },
    
    displaySee: function() {                                        // Количество людей играющих в игру (искусственно)
        let see = document.getElementById('see');
        let number = Math.floor(Math.random() * 10 + 1);
        see.innerHTML = 'Количество людей играющих в эту игру: ' + number;
    }
};

// Объект модели
let model = {
    boardSize: 7,   // Размер игрового поля
    numShips: 3,    // Количество кораблей в игре
    shipLength: 3,  // Длина корабля в клетках
    shipsSunk: 0,   // Содержит количество кораблей потопленных игроком
    ships: [        // Координаты, попадания и статус жив/мертв кораблей
        {locations: [0, 0, 0], hits: ['', '', ''], end: false},
        {locations: [0, 0, 0], hits: ['', '', ''], end: false},
        {locations: [0, 0, 0], hits: ['', '', ''], end: false},
    ],
    fire: function(guess) { // Выстрел игрока
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('Попадание!');
                if (this.isSunk(ship)) { // Добавляет очки если корабль затоплен
                    view.displayMessage('Вы потопили корабль!');
                    ship.end = true;
                    if (ship.end === true) { // Меняет изображение кораблей 
                        view.displayShipHit(ship.locations[0], ship.locations[1], ship.locations[2]);
                    };
                    this.shipsSunk++;
                };
                return true;
            };
        }
        view.displayMiss(guess);
        view.displayMessage('Промах!');
        return false;
    },
    isSunk: function(ship) { // Проверяет потоплен корабль или нет
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            };
        }
        return true;
    },
    generateShipLocations: function() { // Метод создания массив "ships" с количеством кораблей, определяемым свойством "numShips"
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations)) {
                this.ships[i].locations = locations;
            };
        };
    },
    generateShip: function() { // Метод создание коробля в произвольном месте, не исключая перекрытия
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        };

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + '' + (col + i));
            } else {
                newShipLocations.push((row + i) + '' + col);
            };
        };

        return newShipLocations;
    },
    collision: function(locations) { // Метод получает данные местоположение коробля и проверяет, что он не перекрывается с кораблями, уже находящимися на игровом поле
        for (let i = 0; i < this.numShips; i++) {
            let ship = model.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                };
            };
        };

        return false;
    },
};

// Объект контроллер
let controller = {
    guesses: 0,                           // Количество выстрелов
    processGuess: function(guess) {       // Метод получающий и преобразующей координат
        let location = parseGuess(guess); // Метод для проверки введенных игроком координат
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('Вы потопили все мои корабли с ' + this.guesses + ' попытки');
            }
        }
    },
};

function parseGuess(guess) {              // Проверяет правильность введенных координат
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if(guess === null || guess.length !== 2) {
        alert('Ой, ошибка! Пожалуйста введите букву и цифру указанные на доске доске!');
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert('Упс, этого нет на доске!');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert('Ой, не верные координаты!')
        } else {
            return row + column;
        };
    }
    return null;
};

function init() { // Функция создания события для кнопки "Огонь!"
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations(); 
};

function handleKeyPress(e) { // Функция обработки события при нажатии кнопки "Enter"
    let fireButton = document.getElementById('fireButton');
    if(e.keyCode === 13) {
        fireButton.click();
        return false;
    };
};

function handleFireButton() { // Функция вызова после нажатия кнопки "Огонь!"
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = ''; // Удаляет текст после нажатия кнопки
};

view.displaySee();

window.onload = init; // Выполнение функции только при полной загрузке страницы