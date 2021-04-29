let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById('text');
        messageArea.classList.add('text');
        messageArea.innerHTML = msg;   
    },
    buttonReplay: function() {
        let buttonRep = document.getElementById('input_replay');
        buttonRep.style.display = "inline";
        let buttonSend = document.getElementById('input_button');
        buttonSend.style.display = "none";
        let sendInput = document.getElementById('input');
        sendInput.style.display = "none";
    }
};