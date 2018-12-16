// make connentio
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message');
      btn = document.getElementById('send'),
      feedback = document.getElementById('feedback'),
      output = document.getElementById('output');
const handle = document.getElementById('handle');
// Emit events


btn.addEventListener('click', function(){

  socket.emit('chat', {
  	socket:socket.id,
  	message:message.value,
  	handle:handle.value
  });
  message.value = "";
});
message.addEventListener('keypress',function(){
	socket.emit('typing',handle.value);
	window.scrollTo(0,document.body.scrollHeight);
})
// Listen for events
socket.on('chat', function(data){
	feedback.innerHTML="";
	if(data.socket == socket.id){
		output.innerHTML += '<p class="mioMsc"> <strong>' +  data.handle + ': </strong>' + data.message + '</p>';
	}
	else output.innerHTML += '<p class="chat-window"> <strong>' + data.handle + ': </strong>' + data.message + '</p>';
	window.scrollBy(0, window.innerHeight);
});

socket.on('typing', function(data){
	feedback.innerHTML ='<p><em>' + data + ' sta scrivendo...</em> </p>';
})