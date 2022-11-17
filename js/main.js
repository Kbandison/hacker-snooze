'use strict';

//Story ID endpoint: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
//Ask ID endpoin: https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty
//Story endpoint: https://hacker-news.firebaseio.com/v0/item/ITEM-ID.json?print=pretty

//Title of story
//Score
//Kids = number of comments
//Username

let pageDiv = document.querySelector('#page');
let id = document.querySelector('table');
let storyInfo = document.querySelector('#story-info');
let number = 1;
let stories = document.querySelector('#stories')
let ask = document.querySelector('#ask');


let idAPIrequest = async () => {
  let response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  let data = await response.json();
  console.log(data);


  data.forEach((e,i) => {

    let storyAPIrequest = async () => {
      let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${e}.json?print=pretty`);
      let story = await response.json();

      /*Created Elements*/
      let storyItem = document.createElement('tr')
      let num = document.createElement('th');
      let name = document.createElement('td');
      let nameTag = document.createElement('a');
      let score = document.createElement('td');
      let comments = document.createElement('td');
      let username = document.createElement('td');

      /*Element Edits */

      num.id = 'number';
      nameTag.id = 'title';
      score.id = 'score';
      comments.id = 'comments';
      username.id = 'user';

      num.innerText = number++;
      nameTag.innerText = story.title;
      score.innerText = story.score;
      comments.innerText = story.kids.length;
      username.innerText = story.by;

      nameTag.target = 'blank';
      nameTag.href = story.url

      /*Appends */
      if(i < 100){
        storyInfo.appendChild(storyItem);
        storyItem.appendChild(num);
        storyItem.appendChild(name);
        name.appendChild(nameTag);
        storyItem.appendChild(username);
        storyItem.appendChild(score);
        storyItem.appendChild(comments);
      }
    }

    storyAPIrequest();

  })

}

idAPIrequest();

