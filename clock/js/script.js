function clock() {
    let numberHours = document.getElementById('hours');
    let numberMinutes = document.getElementById('minutes');
    let numberSeconds = document.getElementById('seconds');
    let numberDate = document.getElementById('date');

    let now = new Date();
    
    let date = now.toDateString();
    let time = now.toLocaleTimeString();
    let h = [];
    let m = [];
    let s = [];
    h.push(time[0], time[1]);
    m.push(time[3], time[4]);
    s.push(time[6], time[7]);
    
    numberDate.innerHTML = date;
    numberHours.innerHTML = h.join('');
    numberMinutes.innerHTML = m.join('');
    numberSeconds.innerHTML = s.join('');
}

 setInterval(clock, 1000);