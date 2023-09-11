
import Split from './split.js'

const username = "TobinCavanaugh";
const repoName = "TobinCavanaugh.github.io";
const pagesIndexFile = "_Blog/PagesIndex"
const htmlFolder = "_Blog/PagesHTML/";

const url = 'https://raw.githubusercontent.com/' + username + '/' + repoName + '/' + 'main' + '/';
console.log(url);

var randMessage = document.getElementById("random-message");
randMessage.R