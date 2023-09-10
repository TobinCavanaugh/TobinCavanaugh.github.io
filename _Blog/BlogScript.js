
import Split from './split.js'

const username = "TobinCavanaugh";
const repoName = "TobinCavanaugh.github.io";
const pagesIndexFile = "_Blog/PagesIndex"
const htmlFolder = "_Blog/PagesHTML/";

const url = 'https://raw.githubusercontent.com/' + username + '/' + repoName + '/' + 'main' + '/';
console.log(url);

Split(['#ListView', '#BlogView'])

function BlogSelected(event){
    console.log("AAAAAAAAAA");
    console.log(event);
}

/*Fetch the pages index*/
fetch(url + pagesIndexFile).then(response => response.text()).then(contents => {

    const splits= contents.split("\n").reverse();

    const list = document.getElementById("DocumentList");
    splits.forEach(x => {
        console.log(x);
        var element = document.createElement("button");

        /* link.href = url + htmlFolder + '/' + x; */

        var data = document.createElement("data");
        data.value = url + htmlFolder + '/' + x;

        element.textContent = x;

        element.addEventListener("click", BlogSelected)


        element.appendChild(data);

        list.appendChild(element);
    });
})

