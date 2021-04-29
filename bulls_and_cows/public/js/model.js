let model = {
    number: [],
    guess: 0,
    win: 10,

    generatorNumber: function() {
        while(this.number.length < 4) {
            let randomNumber = Math.floor(Math.random() * 10);
    
            if(this.number.length == 0) {
                this.number.push(randomNumber);
            } else {
                while(this.number.indexOf(randomNumber) != -1) {
                    randomNumber = Math.floor(Math.random() * 10);
                };
                this.number.push(randomNumber);
            };
        };
    },

    checkNumber: function(arg) {
        let systemNumber = [false, 0, 0];

        for(let i = 0; i < this.number.length; i++) {
            if(arg[i] == this.number[i]) {
                systemNumber[1]++;
            } else if(this.number.indexOf(arg[i]) != -1) {
                systemNumber[2]++;
            };
        
            if(systemNumber[1] == 4) {
                systemNumber[0] = true;
            };
        };
        return systemNumber;
    }
};