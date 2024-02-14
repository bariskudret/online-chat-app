
// express ve socket.io paketlerini ilk önce projeye dahil ediyoruz ve bir değişkene atıyoruz.
const express = require('express');
const socket = require('socket.io');

// express i başlatıyoruz.
const app = express();

// 3000 portunu dinliyoruz.
const server = app.listen(3000,"192.168.10.143");  

// server kurulumu burayakadar aslında tamamdır.
// ama html css dosyası kullanacağız bu sebeple statik 

// express yardımıyla public klasörünü dahil ediyoruz.
app.use(express.static('public')); 


// soketin içine doğrudan oluştuulan serveri veriyoruz bu şekilde localhost:3000 portunda
// işlemler yürütülsün diye 
const io = socket(server);

// bir bağlantı gerçekleştiğinde anlamak için connection dedik
// socket isimde bir parametre ile yakalayalım 
io.on('connection',(socket)=>{
console.log(socket.id) // her kullanıcın uniq bir id ye sahip olduğunu görelim

// sayfayı yeniledikten sonra etkilşimin olmadığını göreceksin
// bunun sebebi browser tarafından connetction daha tamamlanmadı yani bağlantı.
// chat.js dosyasına gidip bunu yazacağız -> const socket = io.connection('http://localhost:3000');
socket.on('chat', data =>{ // on komutu ile chat i dinliyoruz.

    // data dan gelen bilgileri bütün browser lere göndermemeiz gerekiyor
    // bunuda emit fonk. ile sağlıyacağız
    io.sockets.emit('chat', data)

})

// typing i dinlemeye başlıyoruz.
// gelen data yı bütün browseerlere yolluyoruz. işte ahmet yazıyor... demek için
// sender.value  bize kullanıcı adını verecek chat.js de onu kullandık typing te dinlerken görünüyor.
socket.on('typing', data=>{
    socket.broadcast.emit('typing', data) 
    
})
})

