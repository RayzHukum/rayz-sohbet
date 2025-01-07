export default defineEventHandler(async (event) => {
    // Gelen mesajları al
    const previosMessages = await readBody(event);

    // Gelen mesajları birleştir
    const messages = previosMessages.map((message) => `${message.role}: ${message.message}`).join('\n');

    // Yeni API'ye istekte bulun
    const req = await fetch(`https://apiweb-lnie.onrender.com/api/sencinionai/${encodeURIComponent(messages)}`, {
        method: 'GET', // API'nin GET ile çalıştığını varsayıyoruz
    });

    // Yanıtı işle
    const res = await req.json();

    // API yanıtını döndür
    return {
        message: res.response || 'Yanıt alınamadı.' // API'nin döndürdüğü yanıt formatına göre ayarlayın
    };
});
