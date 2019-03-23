
const URL_TO_FETCH = 'https://swapi.co/api/films';

// ---------------------------------------------------------------------------------------
// Fetch the main data for listing
const getData = (apiURL) => {
  axios.get(apiURL)
    .then((response) => {
      initialMsg(true);
      displayTable(response.data);
    })
    .catch((error) => {
      console.log("Load data: "+error);
      initialMsg(false);
    });
}

// ---------------------------------------------------------------------------------------
// Show the list 
const displayTable = (data) => {

  // sort by release year
  data.results.sort((a,b)=>{
      var dateA = new Date(a.release_date), dateB = new Date(b.release_date);
      return dateA-dateB
    });

  var tr = [];
  var head = document.getElementById('table-head');
  var table = document.getElementById('table-body');

  // create table header
  tr = head.insertRow(-1);
  tr.insertCell(-1).innerHTML = 'Title';
  tr.insertCell(-1).innerHTML = 'Release Date';
  tr.insertCell(-1).innerHTML = 'Episode';
 
  // table data
  for (i=0; i < data.results.length; i++) {
      tr = table.insertRow(-1);
      tr.insertCell(-1).innerHTML = data.results[i].title;
      tr.insertCell(-1).innerHTML = convertDate(data.results[i].release_date);
      tr.insertCell(-1).innerHTML = data.results[i].episode_id;
      tr.id = i;
  }

  table.addEventListener('click',(row)=>{
    var id = row.path[1].id;
    var selectedMoviedata = data.results[id];
    handleClick(selectedMoviedata);
  })
}

// ---------------------------------------------------------------------------------------
// Date format
const convertDate = (date) => {
  var newDate = date.split('-');
  return newDate[1]+'/'+newDate[2]+'/'+newDate[0]
}

// ---------------------------------------------------------------------------------------
// Create dynamic elements and handle the data of selected movie
const handleClick = (data) =>{

  // create details container dinamically
  var div = document.querySelector('.details-container');
  var divText = document.createElement('div');
  var title = document.createElement('p');
  var directorHead = document.createElement('p');
  var directorBody = document.createElement('p');
  var sinopseHead = document.createElement('p');
  var sinopseBody = document.createElement('p');

  divText.className = "details";
  title.className = "title";
  directorHead.className = "content-head";
  directorBody.className = "content-body";
  sinopseHead.className = "content-head";
  sinopseBody.className = "content-body";

  title.innerHTML = data.title;
  directorHead.innerHTML = "Director";
  directorBody.innerHTML = data.director;
  sinopseHead.innerHTML = "Sinopse";
  sinopseBody.innerHTML = data.opening_crawl;
  
  divText.appendChild(title);
  divText.appendChild(directorHead);
  divText.appendChild(directorBody);
  divText.appendChild(sinopseHead);
  divText.appendChild(sinopseBody);

  // clear previous
  if(div.childNodes.length>0){
    div.removeChild(div.childNodes[0]);
  }
  div.appendChild(divText);

  window.scroll({
    top: 2500, 
    left: 0, 
    behavior:"smooth"
  });

  fetchChars(data.characters);
}

// ---------------------------------------------------------------------------------------
// Fetch characters data
const fetchChars = async (charsUrls) =>{

  var div = document.querySelector('.details');
  var charactersHead = document.createElement('p');
  var charactersBody = document.createElement('p');
  charactersHead.className = "content-head";
  charactersHead.innerHTML = "Characters";
  charactersBody.className = "content-body";
  var list = "";

  // the best way would be to do paralel requests, but dinamically it gets hard
  // to build something that works well.. so this way works, even if slowly
  for(i=0;i<charsUrls.length-1;i++){
    const response = await axios.get(charsUrls[i])
        .then((response) => { list = list+response.data.name+", "; })
        .catch((error) => console.log("Load characters: "+error));
  }
  const response = await axios.get(charsUrls[i])
        .then((response) => { list = list+response.data.name+"."; })  // just to not put a comma in the last
        .catch((error) => console.log("Load characters: "+error));

  charactersBody.innerHTML = list;
  div.appendChild(charactersHead);
  div.appendChild(charactersBody);
  console.log(list);
  addBtn(div);
}

// ---------------------------------------------------------------------------------------
// Create a clear button only after the requests were done
const addBtn = (div) =>{
  var btn = document.createElement('button');
  btn.innerHTML = "Clear";
  btn.className = "btn";
  div.appendChild(btn);

  // clear by button
  var divParent = document.querySelector('.details-container');
  btn.addEventListener('click',()=>{
    divParent.removeChild(divParent.childNodes[0]);
    window.scroll({
      top: 40, 
      left: 0, 
      behavior:"smooth"
    });
  });
}

// ---------------------------------------------------------------------------------------
// Show the message acordingly data status
const initialMsg = (isLoaded) => {
  var divText = document.getElementById('div-text');
  var p = document.createElement('p');

  if(!isLoaded){
    p.innerHTML = "We had a problem on loading data, sorry! :(";
    divText.appendChild(p);
  } else {
    p.innerHTML = "Here are all the SW movies listed for you!";
    var p2 = document.createElement('p');
    p2.innerHTML = "You can select the movie to see more information about it :)";
    divText.appendChild(p);
    divText.appendChild(p2);
  }
}

// ---------------------------------------------------------------------------------------
// Calls the first time
getData(URL_TO_FETCH);

