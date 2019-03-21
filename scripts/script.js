
const URL_TO_FETCH = 'https://swapi.co/api/films';

// ---------------------------------------------------------------------------------------
// Fetch the data for each situation
const getData = (apiURL,sel) => {
  axios.get(apiURL)
    .then((response) => {
      initialMsg(true,sel);
      if(sel=='load'){
        displayTable(response.data);
      } else {
        detailsContents(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      initialMsg(false,sel);
    });
}

// ---------------------------------------------------------------------------------------
// Show the list 
const displayTable = (data) => {
  // console.log('itens: ',data.results.length)

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
  for (i = 0; i < data.results.length; i++) {
      // console.log(data.results[i].title);
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
  // console.log('Title: '+data.title);
  // console.log('Director: '+data.director);
  // console.log('characters: '+data.characters);
  // console.log('planets: '+data.planets);
  // console.log('starships: '+data.starships);
  // console.log('vehicles: '+data.vehicles);
  // console.log('opening_crawl: '+data.opening_crawl);


  // create details container dinamically
  var div = document.querySelector('.details-container');
  var divText = document.createElement('div');
  var title = document.createElement('p');
  var directorHead = document.createElement('p');
  var directorBody = document.createElement('p');
  var sinopseHead = document.createElement('p');
  var sinopseBody = document.createElement('p');
  var charactersHead = document.createElement('p');
  var charactersBody = document.createElement('p');
  var btn = document.createElement('button');

  divText.className = "details";
  title.className = "title";
  directorHead.className = "content-head";
  directorBody.className = "content-body";
  sinopseHead.className = "content-head";
  sinopseBody.className = "content-body";
  charactersHead.className = "content-head";
  charactersBody.className = "content-body";
  btn.className = "btn";

  title.innerHTML = data.title;
  directorHead.innerHTML = "Director";
  directorBody.innerHTML = data.director;
  sinopseHead.innerHTML = "Sinopse";
  sinopseBody.innerHTML = data.opening_crawl;
  charactersHead.innerHTML = "Characters";
  charactersBody.innerHTML  = data.characters[0];
  btn.innerHTML = "Clear";
  
  divText.appendChild(title);
  divText.appendChild(directorHead);
  divText.appendChild(directorBody);
  divText.appendChild(sinopseHead);
  divText.appendChild(sinopseBody);
  divText.appendChild(charactersHead);
  divText.appendChild(charactersBody);
  divText.appendChild(btn);

  btn.addEventListener('click',()=>{
    div.removeChild(div.childNodes[0]);
  });

  // clear previous
  if(div.childNodes.length>0){
    div.removeChild(div.childNodes[0]);
  }
  div.appendChild(divText);


  // last
  // for(i=0;i<data.characters.length;i++){
  //   getData(data.characters[i],'characters');
  // }
}

// ---------------------------------------------------------------------------------------
// Load details data
const detailsContents = (data) =>{
  console.log(data.name);

  var detailsBox = document.getElementById('.detais');
  var characters = document.createElement('p');
  characters.innerHTML = data.characters;
}

// ---------------------------------------------------------------------------------------
// Show the message acordingly data status
const initialMsg = (isLoaded,sel) => {
  var divText = document.getElementById('div-text');
  var p = document.createElement('p');

  if(!isLoaded){
    p.innerHTML = "We had a problem on loading data, sorry! :(";
    divText.appendChild(p);
  } else {
    if(sel=='load'){
        p.innerHTML = "Here are all the SW movies listed for you!";
        var p2 = document.createElement('p');
        p2.innerHTML = "You can select the movie to see more information about it :)";
        divText.appendChild(p);
        divText.appendChild(p2);
    }
  }
}

// ---------------------------------------------------------------------------------------
// Calls the first time
getData(URL_TO_FETCH,'load');


