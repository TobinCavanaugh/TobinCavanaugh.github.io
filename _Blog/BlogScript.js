/* import Split from './split.js' */

const username = "TobinCavanaugh";
const repoName = "TobinCavanaugh.github.io";
const pagesIndexFile = "_Blog/PagesIndex"
const htmlFolder = "_Blog/PagesHTML/";
const randomMessagesFile = "_Blog/RandomMessages";

const url = 'https://raw.githubusercontent.com/' + username + '/' + repoName + '/' + 'main' + '/';
console.log(url);

var messageElement = document.getElementById("random-message");
fetch(url + randomMessagesFile).then(x => x.text().then(text => {
    const messages = text.split('\n');
    const message = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = message;
}))