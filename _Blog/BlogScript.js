/* import Split from './split.js' */

const username = "TobinCavanaugh";
const repoName = "TobinCavanaugh.github.io";
const htmlFolder = "_Blog/PagesHTML/";
const randomMessagesFile = "_Blog/RandomMessages";
const pagesIndexFile = "_Blog/PagesIndex";

const repoUrl = 'https://raw.githubusercontent.com/' + username + '/' + repoName + '/' + 'main' + '/';
console.log(repoUrl);

var messageElement = document.getElementById("random-message");
fetch(repoUrl + randomMessagesFile).then(x => x.text().then(text => {
    const messages = text.split('\n');
    const message = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = message;
}))

var linksDiv = document.getElementById("Links");
fetch(repoUrl + pagesIndexFile).then(x => x.text().then(text => {
    const pages = text.split("\n");
    for (const p in pages){

        const docName = p.split("|")[0];
        const fileName = p.split("|")[1];

        const link = document.createElement("a");
        link.setAttribute("href", repoUrl + htmlFolder + fileName);
        console.log(link.getAttribute("href"));
        const node = document.createTextNode(docName);
        link.appendChild(node);

        linksDiv.appendChild(link);
    }
}))