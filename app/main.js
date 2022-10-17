let showTime = document.querySelector('#result');
let currentDate = null;
if (showTime) {
    chrome.storage.local.get(['date'], function (result) {
        showTime.innerHTML = result.date;
        console.log(result.date)
    });
}

document.querySelector("button")?.addEventListener('click', () => {
    chrome.runtime.sendMessage('',
        {
            type: 'notification',
            options: {
                title: 'Anytimer',
                message: 'Timer started!',
                iconUrl: './icons/icon.png',
                type: 'basic',
            }
        }
    );

    document.querySelector("#result")?.classList.add("active");
    document.querySelector("#result")?.classList.remove("inactive");

    let now = new Date().getTime();
    let hour = 60 * 60 * 1000;
    let countDownDate = now + hour;
    chrome.storage.local.set({ 'date': countDownDate }, function () {
        console.log('Value is set to ' + countDownDate);
    });
    let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let timeLeft = hours + "h " + minutes + "m " + seconds + "s ";
        document.querySelector("#result").innerHTML = timeLeft;

        if (distance < 0) {
            clearInterval(x);
            document.querySelector("#result").innerHTML = "EXPIRED";
        }
    }, 1000);
});