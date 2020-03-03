'use strict';

 const apiKey = 'BiYwNSlrb1AfUpXr19a3dEFiSckeDK8bGU5pcb9E';

const searchURL = 'https://developer.nps.gov/api/v1/alerts';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${(key)}=${(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson){
  console.log(responseJson);
  $('#results-list').empty();


  for(let i=0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li>
      <h3>
      <a href="${responseJson.data[i].title}">${responseJson.data[i].title}</a><br/>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a><br/>
      <a href="${responseJson.data[i].parkCode}">${responseJson.data[i].parkCode}</a><br/>
      <a href="${responseJson.data[i].description}">${responseJson.data[i].description}</a><br/>
      </h3>
      </li>`
      )
  };
 $('#results').removeClass('hidden');
};


function getPark(parkCode, limit, stateCode){
  const params = {
    fullName: "",
    url:"",
    limit,
    parkCode,
    stateCode,
    description: "",
    api_key:'BiYwNSlrb1AfUpXr19a3dEFiSckeDK8bGU5pcb9E'
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?'+ queryString;

  console.log(url);


  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults
  (responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}


function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#parkname').val();
    const limit = $('#limit').val();
    const state = $('#stateCode').val();
    getPark(searchTerm, limit, state);
  });
}

$(watchForm);