// Sound effects
let startEffect = new Audio(chrome.runtime.getURL("audio/Start.mp3"));
let stopEffect = new Audio(chrome.runtime.getURL("audio/Stop.mp3"));

// Creates a SpeechRecogniton Object
function createRecognition() {
    const rec = new window.SpeechRecognition();
    rec.language = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    return rec;
}

// Waits for a sepcified amount of time
async function Sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Sound effect to indicate AI Agent has started listening
function playStartEffect() {
    startEffect.play();
}

// Plays the sound effect indicating the AI has stopped listening
function playStopEffect() {
    stopEffect.play();
}
