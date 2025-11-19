// Stores audio data in individual chunks for efficiency
const audioChunks = [];

let startEffect = new Audio(chrome.runtime.getURL("audio/Start.mp3"));
let stopEffect = new Audio(chrome.runtime.getURL("audio/Stop.mp3"));

// Media Recorder object that listens for audio from user's mic
let mediaRecorder;

// Reduces the need to type 'navigator.mediaDevices.getUserMedia()' each time
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(
    navigator.mediaDevices
);

// Sound effects to indicate AI Agent
function playStartEffect() {
    startEffect.play();
}

// Plays the sound effect indicating the AI won't listen to more audio
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

// Stores data in array to be processed later
function handleAudioData(data) {
    console.log(data);
    audioChunks.push(data);
}

// Listens for audio from user's microphone
async function getMediaRecorder() {
    console.log("Starting Recording...");

    const options = { audio: true };

    const audioInput = await getUserMedia(options);

    const audioStream = await audioInput;

    const localMedia = new MediaRecorder(audioStream);

    return localMedia;
}

getMediaRecorder().then((result) => {
    // Sets mediaRecorder to the reuslting MediaRecorder object
    mediaRecorder = result;

    mediaRecorder.start(1000);

    mediaRecorder.ondataavailable = (event) => {
        console.log(event.data);
        audioChunks.push(event.data);
    };

    // Wait 5 sec before stopping
    setTimeout(() => {
        mediaRecorder.stop();
        setTimeout(() => {
            const finishedBlob = new Blob(audioChunks, {
                type: "audio/webm;codecs=opus",
            });
            console.log(finishedBlob);
            // const finishedAudio = new Audio(finishedBlob);
            // const urlData = URL.createObjectURL(finishedAudio);
            // console.log(mediaRecorder);
            // console.log(urlData);
        }, 1000);
    }, 5000);
});
