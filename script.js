var audioEnabled = false;

function playSound(s) {
    if (!audioEnabled) {
        return;
    }
    var target = event.target;

    test = target.tagName.toLowerCase();
    if (test !== 'summary' || test === "button") {
        return; // Ignore clicks on the content within the details element
    }
    var audio = new Audio(s + ".wav");
    audio.play();
}

var myAudio; // Declare the audio variable outside the function

function idleHum() {
    audioEnabled = !audioEnabled;

    if (audioEnabled) {
        myAudio = new Audio('hum.wav');
        myAudio.addEventListener('ended', function () {
            if (audioEnabled) {
                this.currentTime = 0;
                this.play();
            }
        }, false);
        myAudio.play();
    } else {
        myAudio.pause();
    }
}


const blockquoteElements = document.querySelectorAll("blockquote");

blockquoteElements.forEach((blockquote, index) => {
    const text = blockquote.textContent.trim();
    let currentIndex = 0;

    function typeText() {
        blockquote.textContent = text.slice(0, currentIndex);
        currentIndex++;
        if (currentIndex <= text.length) {
            setTimeout(typeText, 100); // Adjust the delay to control the typing speed
        }
    }

    setTimeout(() => {
        typeText(); // Call the function to start the typing effect
    }, index * 1000); // Adjust the delay between each blockquote (in milliseconds)
});
