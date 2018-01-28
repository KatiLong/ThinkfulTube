// Other functions to add:
// //click on thumbnails take to youtube video
// //load more videos button
// //add results section title "search results for ${searchTerm}"


// AIzaSyBb3SPRWQyvuaXEj6Bp_8Erjz_qeRxha5g
// "https://www.googleapis.com/youtube/v3/search"

// part: 'snippet'
// key: (your API key as a string)
// q: (your search term as a string)

// URL variable
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const videoIDs = [];
// get API data function which makes JSON/AJAX call - URL, query, callback params
function getApiData (searchTerm, callback) {
  //create API object [inside getApiData]
  console.log(`get API data function ran`)
  const query = {
    part: 'snippet',
    key: 'AIzaSyBb3SPRWQyvuaXEj6Bp_8Erjz_qeRxha5g',
    q: searchTerm
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

// function that generates results string
function generateResults (elem, index) {
  console.log(`Results string generated here`);
  // console.log(elem);
  videoIDs.push(`${elem.id.videoId}`)
  return `
    <div class ="thumbnail-div ${index}">
      <img src="${elem.snippet.thumbnails.medium.url}" class="thumbnail-img">
      <h3 class='video-title'>${elem.snippet.title}</h3>
      <p></p>
    </div>`;
}

function displayResults (data) {
  console.log(`Display Results ran`);
  console.log(data);
  const results = data.items.map((elem, index) => generateResults(elem, index));
  $('.js-search-results').html(results);
  console.log(videoIDs);
  console.log(results);
}

// submit event listener function (where results appended to page?)
// invokve get API data function
function submitListen (){
  console.log(`the submitListen function ran`);
  $('.js-search-form').submit(event => {
    event.preventDefault();
    console.log(`Submit button heard`);
    const queryTarget = $(event.currentTarget).find('.js-query');
    const userText = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getApiData(userText, displayResults)
  })
}

// add event listener for user clicking on thumbnails, takes to video
// click listener on thumnail image, title
// open new tab with link

function videoURL () {
  $('.js-search-results').on('click', '.thumbnail-img', function (event){
    event.stopPropogation();
    let video = $(event.currentTarget).parent();
    window.open(event.currentTarget, '_blank');
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

$(submitListen());
