// ui.js

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

function sendMessage() {

  const text = messageInput.value.trim();

  if(text === "") return;

  // Create message
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "sent");

  const now = new Date();

  const time =
    now.getHours() +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  messageDiv.innerHTML = `
    <div class="message-content">${text}</div>
    <span class="time">${time}</span>
  `;

  chatBox.appendChild(messageDiv);

  messageInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  // Fake Reply
  setTimeout(() => {

    const reply = document.createElement("div");

    reply.classList.add("message", "received");

    reply.innerHTML = `
      <div class="message-content">
        ✨ That's a great UI idea!
      </div>
      <span class="time">${time}</span>
    `;

    chatBox.appendChild(reply);

    chatBox.scrollTop = chatBox.scrollHeight;

  }, 1000);

}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    sendMessage();
  }

});
