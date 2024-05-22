

const init = () => {
  chrome.storage.local.clear();
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.convo?.newValue) {
      const convo = JSON.parse(changes.convo?.newValue);
      createConversation(convo)
    }
  });
  document.getElementById("myButton").addEventListener("click", async function (e) {
    const tab = await getActiveTabURL();
    if (tab.url && tab.url.includes("linkedin.com/messaging")) {
      await chrome.storage.local.clear();
      const response = await chrome.tabs.sendMessage(tab.id, { type: "PARSE" });
    } else {
      let conver = document.getElementById('conversation');
      conver.innerHTML = "Not a valid linkedIn message";
    }
  });
}



const getActiveTabURL = async () => {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true
  });

  return tabs[0];
}

const createConversation = (convo) => {
  let conver = document.getElementById('conversation');
  conver.innerHTML = "";
  for (let i = 0; i < convo.length; i++) {
    const sender = convo[i].sender;
    const text = convo[i].text;
    let d = document.createElement("div");
    d.style.display = "flex";
    d.style.flexDirection = "column";
    d.style.gap = "4px";
    let s = document.createElement("h3");
    s.textContent = sender;
    let t = document.createElement("div");
    s.style.width = "100%"
    t.textContent = text;
    d.appendChild(s);
    d.appendChild(t);
    conver.appendChild(d)

  }
}

init();