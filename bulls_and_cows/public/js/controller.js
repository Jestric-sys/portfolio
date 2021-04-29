let controller = {
    processGuess: function(arg) {
        let play = arg;
        model.guess++;
        model.win--;
        if (isNaN(parseInt(play)) || play.length != 4) {
            view.displayMessage(dictionary.err);
        } else {
            let game = model.checkNumber(play);
            if (model.win === 0) {
                view.displayMessage(dictionary.los);
                winnerPlay('Bot');
                view.buttonReplay();
            } else if (game[0]) {
                view.displayMessage(dictionary.win + dictionary.guess + model.guess);
                winnerPlay('Player');
                view.buttonReplay();
            } else {
                view.displayMessage(dictionary.player + play+ '\n' + dictionary.bulles + game[1] + dictionary.cows + game[2] + '\n' + dictionary.lastGuess + model.win);
            }
        }
    }
};