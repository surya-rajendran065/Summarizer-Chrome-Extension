let startEffect = new Audio(chrome.runtime.getURL("audio/Start.mp3"));
let stopEffect = new Audio(chrome.runtime.getURL("audio/Stop.mp3"));
let stream;

const getUserMedia = navigator.mediaDevices.getUserMedia.bind(
    navigator.mediaDevices
);

// Sound effects to indicate AI Agent
function playStartEffect() {
    startEffect.play();
}

function playStopEffect() {
    stopEffect.play();
}

// Played after user holds f2 for 1 second
async function startAIAgent() {
    playStartEffect();
    setTimeout(() => {
        textToSpeech("Hello, I am your AI Agent, how can I help you?");

        recordingStartTime = new Date().getSeconds();

        if (new Date().getSeconds() - recordingStartTime == 10) {
            stopAIAgentSound();
        }
    }, 500);
}

// Played when AI Agent is cancelled and the user doesn't produce any noise
function stopAIAgentSound() {
    playStopEffect();
    textToSpeech("Exiting AI Agent");
}

// Listens for audio from user's microphone
async function getAudioInputMic() {
    const options = { audio: true };
    const audioInput = await getUserMedia(options);
    return audioInput;
}

// getAudioInputMic()
//     .then((result) => {
//         console.log(`Result finished: ${result}`);
//         stream = result;
//         console.log(`Active: ${stream.active}`);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
