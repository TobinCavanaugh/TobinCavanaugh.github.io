var audioEnabled = false;

function playSound(s, self = null) {
    if (!audioEnabled) {
        return;
    }
    var target = event.target;
    test = target.tagName.toLowerCase();

    if (s === 'click' && self != null && !self.open) {
        var altAudio = new Audio("Sounds\\" + "hdd.wav");
        altAudio.volume = .2;
        altAudio.play();
    }

    if (test === 'summary' || test === 'h2') {
        var audio = new Audio("Sounds\\" + s + ".wav");
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
        myAudio = new Audio('Sounds\\hum.wav');
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
    if (audioEnabled) {
        imageElement.src = path1;
        imageElement.alt = path1;
        imageElement.classList.add("bg-amber-transp");
    } else {
        imageElement.src = path2;
        imageElement.alt = path2;
        imageElement.classList.remove("bg-amber-transp");
    }
}


function wrapTextAfterHeading(text) {
    // Find the position of "###" in the text
    const headingIndex = text.indexOf("###");

    // If "###" is found, find the position of the next newline character after it
    if (headingIndex !== -1) {
        const newlineIndex = text.indexOf("\n", headingIndex);

        // If newline is found, extract the text between "###" and newline
        if (newlineIndex !== -1) {
            const textAfterHeading = text.substring(headingIndex + 3, newlineIndex);
            const wrappedText = `</blockquote><p>${textAfterHeading}</p><blockquote>`;
            return text.replace(text.substring(headingIndex, newlineIndex + 1), wrappedText);
        }
    }

    // If "###" or newline is not found, return the original text
    return text;
}


function loadMd(textFileURL) {

    //Fetch the text file from the URL
    fetch(textFileURL)
        .then(response => response.text())
        .then(text => {
            //Replace all occurrences of "```" followed by a newline with an empty string
            //▦
            text =
                //Upper left editor functions and title
                "<strong id=text-container-edit> &#10762; File  Edit  Selection  Run  Terminal</strong>" +
                //Program title text
                "<strong id=text-container-title>ReadMe.md - Text Viewer</strong>" +
                //Controls on the upper right
                "<strong id=text-container-controls> - &#9633; x </strong>" +
                //Seperating line
                "<hr class=\"line\">" +
                text;

            text = text.replace(/```\n```/g, '<br/>');

            text = text.replace(/```/g, "");

            //text = text.replace('\n\n', '\n');
            text = text.replace(/^\s*[\r\n]/gm, '');

            text = mdImageToHTML(text);


            var s = wrapTextAfterHeading(text);
            // Insert the text into the text-container div
            document.getElementById('text-container').innerHTML = s;
        })
        .catch(error => {
            // Handle any errors that may occur during the fetch
            console.error('Error fetching the text file:', error);
        });

}

function mdImageToHTML(mdContent) {
    // Regular expression to match MD-formatted photos
    const mdPhotoRegex = /!\[(.*?)\]\((.*?)\)/g;

    // Replace MD-formatted photos with HTML <img> tags and escape the blockquote
    const htmlContent = mdContent.replace(mdPhotoRegex, (match, altText, imagePath) => {
        return `</blockquote> <img class="custom-img" src="${imagePath}" alt="${altText}" loading="lazy"> <blockquote>`;
    });

    return htmlContent;
}
