// AIzaSyBb3SPRWQyvuaXEj6Bp_8Erjz_qeRxha5g
// "https://www.googleapis.com/youtube/v3/search"

// part: 'snippet'
// key: (your API key as a string)
// q: (your search term as a string)

// buildApiRequest('GET',
//                 '/youtube/v3/search',
//                 {'maxResults': '25',
//                  'part': 'snippet',
//                  'q': 'surfing',
//                  'type': ''});

// URL variable
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
// get API data function which makes JSON/AJAX call - URL, query, callback params
function getApiData (searchTerm, callback) {
  //create API object [inside getApiData]
  console.log(`get API data function ran`)
  const query = {
    part: 'snippet',
    key: 'AIzaSyBb3SPRWQyvuaXEj6Bp_8Erjz_qeRxha5g',
    q: `${searchTerm}`
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

// function that generates results string
function generateResults () {
  console.log(`Results string generated here`);
  return `<p>thumbnails will be appended here</p>`;
}

function displayResults () {
  console.log(`Display Results ran`);
  $('.js-search-results').html(generateResults());
}

// submit event listener function (where results appended to page?)
// invokve get API data function
function submitListen (){
  console.log(`the submitListen function ran`);
  $('.js-search-form').submit(event => {
    event.preventDefault();
    console.log(`Submit button heard`);
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getApiData(query, displayResults)
  })
}

//user stories

// URL variable
// get API data function which makes JSON/AJAX call - URL, query, callback params
  //create API object [inside getApiData]
// function that generates results string
// diplay search data (videos as thumbnails)
// submit event listener function (where results appended to page?)
// document ready function

$(submitListen);
