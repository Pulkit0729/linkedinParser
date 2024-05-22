(() => {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            const { type } = request;
            if (type == "PARSE") {
                let messagesList = document.getElementsByClassName("msg-s-message-list__event");
                let prevSender = '';
                let convo = [];
                for (let i = 0; i < messagesList.length; i++) {
                    const element = messagesList[i];
                    let message = element.getElementsByClassName("msg-s-event-listitem__body")[0];
                    let sender = element.getElementsByClassName("msg-s-message-group__profile-link")[0];
                    if (sender) {
                        prevSender = sender;
                    }
                    convo.push({
                        "sender": prevSender.textContent.trim(),
                        "text": message.textContent.trim(),
                    })
                };
                chrome.storage.local.set({ convo: JSON.stringify(convo) })
            }
        }
    );
})();