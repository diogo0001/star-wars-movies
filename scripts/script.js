const URL_TO_FETCH = 'https://swapi.co/api/films';

// Fetch the data 
const getData = (apiURL,sel) => {
  axios.get(apiURL).then((response) => {

    switch(sel){
      case 'load':     displayTable(response.data); break;
      case 'characters':    break;
      default: break;
    }
  });
}

// ---------------------------------------------------------------------------------------
// Show the list 
const displayTable = (data) => {
  console.log('itens: ',data.results.length)

  initialMsg(data.results);

  var table = document.getElementById('table-body');
  var tr = [];

  data.results.sort((a,b)=>{
    var dateA = new Date(a.release_date), dateB = new Date(b.release_date);
    return dateA-dateB
  });

  for (i = 0; i < data.results.length; i++) {
      // console.log(data.results[i].title);
      tr = table.insertRow(-1);
      tr.insertCell(-1).innerHTML = data.results[i].title;
      tr.insertCell(-1).innerHTML = convertDate(data.results[i].release_date);
      tr.insertCell(-1).innerHTML = data.results[i].episode_id;
      tr.id = i;  
  }

  table.addEventListener('click',(evt)=>{
    var id = evt.path[1].id;
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
// Handle the data of selected movie
const handleClick = (data) =>{
  console.log(data.title);
}

// ---------------------------------------------------------------------------------------
// Show the message acordingly 
const initialMsg = (data) => {
  var divText = document.getElementById('div-text');
  var p = document.createElement('p');

  if(data===null){
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
getData(URL_TO_FETCH,'load');





