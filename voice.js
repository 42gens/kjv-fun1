let synthesis = window.speechSynthesis;
let utterances = [];
let currentUtteranceIndex = 0;
let isPaused = false;


function startReading() {
    if (!isPaused) {
        createUtterances();
        playNextUtterance();
    } else {
        resumeReading();
    }
}

function pauseReading() {
    try {
        synthesis.pause();
        isPaused = true;
    } catch (error) {
        console.error("Error pausing speech synthesis:", error);
        // Handle the error or provide a message to the user
    }
}

function resumeReading() {
    try {
        synthesis.resume();
        isPaused = false;
    } catch (error) {
        console.error("Error resuming speech synthesis:", error);
        // Handle the error or provide a message to the user
    }
}


function stopReading() {
    synthesis.cancel();
    currentUtteranceIndex = 0;
    isPaused = false;
}

function playNextUtterance() {
    if (currentUtteranceIndex < utterances.length) {
        synthesis.speak(utterances[currentUtteranceIndex]);
        utterances[currentUtteranceIndex].onend = () => {
            currentUtteranceIndex++;
            playNextUtterance();
        };
    } else {
        currentUtteranceIndex = 0;  // Reset for the next reading
    }
}

let speechRate = 1; // Default rate is 1

function setSpeechRate(rate) {
    speechRate = rate;
}

function createUtterances() {
    const cards = document.querySelectorAll('.card');
    utterances = [];  // Clear any old utterances
    cards.forEach(card => {
        let content = card.textContent.trim().replace(/:/g, ' ');  // Replace colons with spaces
        if (content) {
            let utterance = new SpeechSynthesisUtterance(content);
            utterance.rate = speechRate; // Set the rate
            utterances.push(utterance);
        }
    });
}



