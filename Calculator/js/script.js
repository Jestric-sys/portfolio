let main = {
    result: document.getElementById('result'),
    clearIn: 0,
    clickNumberIn: () => {
        let numberIn = document.getElementById('numberIn');
        numberIn.value = '';
    }
}

let calculator = {
    plus: () => {
        let number = document.getElementById('numberIn').value;   
        main.clearIn += +number;
        main.result.innerHTML = main.clearIn;
        main.clickNumberIn();
    },
    minus: () => {
        let number = document.getElementById('numberIn').value;
        main.clearIn -= +number;
        main.result.innerHTML = main.clearIn;
        main.clickNumberIn(); 
    },
    clearC: () => {
        main.clearIn = 0;
        return main.result.innerHTML = main.clearIn;
    },
    umno: () => {
        let number = document.getElementById('numberIn').value;
        if (main.clearIn != 0) {
            main.clearIn *= +number;
            main.clickNumberIn();
        } else {
            main.clearIn = +number;
            main.clickNumberIn();
        };
        main.result.innerHTML = main.clearIn
    },
    del: () => {
        let number = document.getElementById('numberIn').value;
        if (main.clearIn != 0) {
            main.clearIn /= +number;
            main.clickNumberIn();
        } else {
            main.clearIn = +number;
            main.clickNumberIn();
        };
        main.result.innerHTML = main.clearIn
    }
}

main.result.innerHTML = main.clearIn;