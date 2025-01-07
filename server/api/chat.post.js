export default defineEventHandler(async (event) => {
    // Gelen mesajları al
    const previosMessages = await readBody(event);

    // Mesajları uygun formatta birleştir
    const messages = previosMessages.map((message) => `${message.role}: ${message.message}`).join('\n');

    // Yeni API'ye POST isteği gönder
    const req = await fetch('https://apiweb-lnie.onrender.com/api/sencinionai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // JSON formatı için gerekli header
        },
        body: JSON.stringify({ // API'nin beklediği veri yapısına göre düzenleyin
            message: messages // Mesajları "message" alanında gönderiyoruz
        })
    });

    // Yanıtı işle
    const res = await req.json();

    // Yanıtı döndür
    return {
        message: res.response || 'Yanıt alınamadı.' // API'nin döndürdüğü yanıt formatına göre düzenleyin
    };
});
