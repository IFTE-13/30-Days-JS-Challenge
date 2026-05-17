const speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.getElementById('voiceSelect');
const listenBtn   = document.getElementById('listenBtn');
const stopBtn     = document.getElementById('stopBtn');
const btnText     = document.getElementById('btnText');

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(`${voice.name} (${voice.lang})`, i);
    });
    speech.voice = voices[0];
};

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

function speak() {
    const text = document.getElementById('textInput').value.trim();
    if (!text) return;
    window.speechSynthesis.cancel();
    speech.text = text;
    speech.voice = voices[voiceSelect.value];
    window.speechSynthesis.speak(speech);
    btnText.textContent = 'Speaking...';
    listenBtn.disabled = true;
    listenBtn.classList.add('opacity-50');
    stopBtn.classList.remove('hidden');
}

function stopSpeech() {
    window.speechSynthesis.cancel();
    resetBtn();
}

function resetBtn() {
    btnText.textContent = 'Listen';
    listenBtn.disabled = false;
    listenBtn.classList.remove('opacity-50');
    stopBtn.classList.add('hidden');
}

speech.addEventListener('end', resetBtn);