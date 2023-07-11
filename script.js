var audioEnabled = false;

function playSound(s) {
    if (!audioEnabled) {
        return;
    }
    var target = event.target;

    test = target.tagName.toLowerCase();
    if (test !== 'summary' && test !== "a") {
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

// Define the custom element
class DImg extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create an <img> element
        const img = document.createElement('img');

        // Copy the attributes from <dimg> to <img>
        const attributes = this.attributes;
        for (let i = 0; i < attributes.length; i++) {
            const { name, value } = attributes[i];
            img.setAttribute(name, value);
        }

        // Append the <img> element to the shadow root
        shadow.appendChild(img);
    }
}

// Define the custom element tag name
customElements.define('dimg', DImg);
