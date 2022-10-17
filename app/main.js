document.querySelector("button")?.addEventListener('click', () => {
    // const interval = setInterval(() => {
    chrome.runtime.sendMessage('',
        {
            type: 'notification',
            options: {
                title: 'Just wanted to notify you',
                message: 'How great it is!',
                iconUrl: './icons/icon.png',
                type: 'basic'
            }
        });
    // }, 60000);
});