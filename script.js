const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

const textArea = document.getElementById('text-to-convert');
const convertBtn = document.getElementById('convert-btn');
const stopBtn = document.getElementById('stop-btn');
const languageSelect = document.getElementById('language-select');
const voiceSelect = document.getElementById('voice-select');

function openAtTop() {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 50);
}

function populateLanguages() {
    const voices = synth.getVoices();
    const languages = new Set();
    voices.forEach(voice => {
        languages.add(voice.lang);
    });
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.textContent = lang;
        option.value = lang;
        languageSelect.appendChild(option);
    });
}

function populateVoices() {
    voiceSelect.innerHTML = '';
    const voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}

function fetchVoices() {
    synth.onvoiceschanged = () => {
        populateLanguages();
        populateVoices();
    };
}

convertBtn.addEventListener('click', () => {
    const maxWordLimit = 45;
    const words = textArea.value.trim().split(/\s+/).filter(word => word !== '');
    const wordCount = words.length;
    if (wordCount > maxWordLimit) {
        alert('Text exceeds the maximum word limit for speech conversion.');
        return;
    }

    if (textArea.value !== '') {
        utterance.text = textArea.value;
        const selectedVoice = voiceSelect.value;
        const voices = synth.getVoices();
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) {
            utterance.voice = voice;
            synth.speak(utterance);
        } else {
            alert('Selected voice not found.');
        }
    }
});

stopBtn.addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }
});

fetchVoices();
