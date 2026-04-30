let currentQRUrl = '';

function generateQRCode() {
    const input = document.getElementById('qrInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter some text or URL');
        return;
    }
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    currentQRUrl = qrCodeUrl;
    
    const qrImageContainer = document.getElementById('qrImageContainer');
    qrImageContainer.innerHTML = '';
    
    const img = document.createElement('img');
    img.src = qrCodeUrl;
    img.alt = 'QR Code';
    img.className = 'w-48 h-48 mx-auto';
    
    img.onload = function() {
        document.getElementById('qrResult').classList.remove('hidden');
    };
    
    img.onerror = function() {
        alert('Failed to generate QR code. Please try again.');
    };
    
    qrImageContainer.appendChild(img);
}

function downloadQR() {
    if (!currentQRUrl) {
        alert('No QR code to download');
        return;
    }
    
    const link = document.createElement('a');
    link.href = currentQRUrl;
    link.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearQR() {
    document.getElementById('qrResult').classList.add('hidden');
    document.getElementById('qrImageContainer').innerHTML = '';
    document.getElementById('qrInput').value = '';
    currentQRUrl = '';
}