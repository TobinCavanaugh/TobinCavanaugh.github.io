var audioEnabled = false;

function playSound(s, self = null) {
    if (!audioEnabled) {
        return;
    }
    var target = event.target;
    test = target.tagName.toLowerCase();

    if(s === 'click' && self != null && !self.open){
        var altAudio = new Audio("hdd.wav");
        altAudio.volume = .2;
        altAudio.play();
    }

    if(test === 'summary' || test === 'h2'){
        var audio = new Audio(s + ".wav");
        audio.play();

    }

    // if (test !== 'summary' && test !== "a") {
    //     return; // Ignore clicks on the content within the details element
    // }
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

function toggleIcon(imageElement, path1, path2) {
    if(audioEnabled){
        imageElement.src = path1;
        imageElement.classList.add("bg-amber-transp");
    } else {
        imageElement.src = path2;
        imageElement.classList.remove("bg-amber-transp");
    }
}