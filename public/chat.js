const socket = io.connect('http://192.168.10.143:3000');
const sender = document.getElementById('sender');
const message = document.getElementById('message');
const feedback = document.getElementById('feedback');
const output = document.getElementById('output');
const submitBtn = document.getElementById('submitBtn');


submitBtn.addEventListener('click',()=>{
// sokete burdan gelen bilgileri göndermemiz gerekiyor.

// yazışmaları takip etmek için chat değerenini veriyoruz
socket.emit('chat', {
    message: message.value, // bu dosyadaki, parametreleri server js dosyasına göndereceğiz
    sender: sender.value
})
})

// soketten gelen bilgileri işlemek için on methodu ile bilgileri yakalıypruz.

socket.on('chat',data=>{
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';

    message.value = '';
})

// karşı taraftan veya bizden yani kalvye üzerinden herhangi bir metin yazmaya başladığnızıda yazıyor... ifadesi çıkacak

message.addEventListener('keypress' , ()=>
{
    socket.emit('typing', sender.value)

})

socket.on('typing', data=>{
    feedback.innerHTML = '<p>'+data+ ' yazıyor...</p>';

})
