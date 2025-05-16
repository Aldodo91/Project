// make connention
const socket = io.connect("http://192.168.1.52:3000");

const message = document.getElementById("message");
const btn = document.getElementById("send");
const feedback = document.getElementById("feedback");
const output = document.getElementById("output");
const handle = document.getElementById("handle");

function criptaTesto(testo) {
  return btoa(unescape(encodeURIComponent(testo)));
}

function decriptaTesto(testoCriptato) {
  return decodeURIComponent(escape(atob(testoCriptato)));
}

// Emit events

message.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    // event.preventDefault();
    btn.click();
  }
});

btn.addEventListener("click", () => {
  if (message.value != "" && handle.value != "") {
    localStorage.setItem("nome", handle.value);
    handle.disabled = true;
    socket.emit("chat", {
      socket: socket.id,
      message: criptaTesto(message.value),
      handle: handle.value,
    });
    message.value = "";
    handle.readOnly = true;
    message.focus();
  }
});

message.addEventListener("input", () => {
  socket.emit("typing", handle.value);
  window.scrollTo(0, document.body.scrollHeight);
});
// Listen for events
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  // decript data.message
  if (data.socket == socket.id) {
    output.innerHTML += `<p class="mioMsc"> <strong> ${
      data.handle
    }: </strong>${decriptaTesto(data.message)}</p>`;
  } else {
    output.innerHTML += `<p class="chat-window"> <strong>${
      data.handle
    }: </strong> ${decriptaTesto(data.message)}</p>`;
  }
  feedback.scrollIntoView({ behavior: "smooth" });
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em> ${data} sta scrivendo...</em> </p>`;
});

const nome = localStorage.getItem("nome");
if (nome) {
  handle.value = nome;
  message.focus();
}
