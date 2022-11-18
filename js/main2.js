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
  let response = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty');
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
      let show = document.createElement('button');
      let hide = document.createElement('button');

      /*Element Edits */

      num.id = 'number';
      nameTag.id = 'title';
      score.id = 'score';
      comments.id = 'comments';
      username.id = 'user';

      show.innerText = 'Show';
      hide.innerText = 'Hide';
      num.innerText = number++;
      nameTag.innerText = story.title;
      score.innerText = story.score;
      comments.innerText = story.kids.length;
      username.innerText = story.by;

      nameTag.target = 'blank';
      nameTag.href = `https://news.ycombinator.com/item?id=${e}`;
      hide.style.display = 'none';

      /*Appends */
      if(i < 100){
        storyInfo.appendChild(storyItem);
        storyItem.appendChild(num);
        storyItem.appendChild(name);
        name.appendChild(nameTag);
        storyItem.appendChild(username);
        storyItem.appendChild(score);
        storyItem.appendChild(comments);
        comments.appendChild(show);
        comments.appendChild(hide);
      }

      show.addEventListener('click', () => {

        show.style.display = 'none';
        hide.style.display = 'block';

        let number = 1;
        let commTable = document.createElement('table');

        
        story.kids.forEach(e => {
          let commentAPIrequest = async () => {
            let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${e}.json?print=pretty`);
            let comment = await response.json();


            
            let commNum = document.createElement('th');
            let comm = document.createElement('tr');
            let commList = document.createElement('td');

            // commList.colSpan = '4';
            commList.innerText = comment.text;
            commNum.innerText = number++ + ') ';
            commTable.className = 'table mb-0';
            comm.id = 'comment-row';

            if (number < 12) {
              comm.appendChild(commNum);
              storyItem.appendChild(commTable);
              commTable.appendChild(comm);
              comm.appendChild(commList);
            }
          }
          commentAPIrequest();
        })
        hide.addEventListener('click', () => {
          show.style.display = 'block';
          hide.style.display = 'none';
          commTable.remove();
        });
      })
    }
    
    storyAPIrequest();
  })
}

idAPIrequest();