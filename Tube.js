// Other functions to add:
// //add results section title "search results for ${searchTerm}"

// get API data function which makes JSON/AJAX call - URL, query, callback params
function getApiData (searchTerm, callback) {
  //create API object [inside getApiData]
  console.log(`get API data function ran`)
  $.getJSON('https://www.googleapis.com/youtube/v3/search', {
    part: 'snippet',
    maxResults: 20,
    key: 'AIzaSyBb3SPRWQyvuaXEj6Bp_8Erjz_qeRxha5g',
    q: searchTerm
    },
    callback);
}

// function that generates results string
function generateResults (elem) {
  console.log(`Results string generated here`);
  // if result is a channel
  if (elem.id.channelId) {
    return `
      <div class ="thumbnail-div">
        <a href="https://www.youtube.com/user/${elem.snippet.channelTitle}" target=_blank>
          <img src="${elem.snippet.thumbnails.medium.url}" class="thumbnail-img">
          <h3 class='video-title'>${elem.snippet.title}</h3>
        </a>
      </div>`
  } // if result is a video
  else {
    return `
      <div class ="thumbnail-div">
        <a href="https://www.youtube.com/watch?v=${elem.id.videoId}" target=_blank>
          <img src="${elem.snippet.thumbnails.medium.url}" class="thumbnail-img">
          <h3 class='video-title'>${elem.snippet.title}</h3>
        </a>
      </div>`;
  }
}

function displayResults (data) {
  console.log(`Display Results ran`);
  console.log(data);
  const results = data.items.map((elem, index) => generateResults(elem));
  $('.js-search-results').html(`<p id="results-str">${data.items.length} search results</p>`);
  $('.js-search-results').append(results);
}

function submitListen (){
  console.log(`the submitListen function ran`);
  $('.js-search-form').submit(event => {
    event.preventDefault();
    console.log(`Submit button heard`);
    const queryTarget = $(event.currentTarget).find('.js-query');
    const userText = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    $('.js-search-results').prop('hidden', false);
    getApiData(userText, displayResults);
    // displayResults();
  })
}


$(submitListen());
