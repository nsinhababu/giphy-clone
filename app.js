const search = document.querySelector('.search__input');
const searchImgBtn = document.querySelector('.search__logo');
const trendingContainer = document.querySelector('.trending');
const gifContainer = document.querySelector('.search-container');

// search.addEventListener('key', (e) => {
//   console.log(e.target.value);
// });
// const imgBtn = document
//   .querySelector('.search__img')
//   .addEventListener('click', () => {
//     // fetchApi();
//     console.log(searchValue);
//   });
const API_KEY = 'RgWANDqJD2RKTXDgnd6PqDKyGjXNNsd7';

// const searchUrl = 'http://api.giphy.com / v1 / gifs / search?';

function processImages(gifs) {
  const gifsArr = (gifs || []).map((gif) => {
    const imageUrl = gif.images.fixed_height.url;
    return `<div> <img class ="search-images" src="${imageUrl}" alt="${gif.slug}"></div>`;
  });
  gifContainer.innerHTML = gifsArr;
}

function fetchSearchApi(url) {
  fetch(url)
    .then((response) => response.json())
    .then((gifsData) => {
      // console.log(data.data.map((item) => item.images.fixed_height.url));
      processImages(gifsData.data);
    });
}

searchImgBtn.addEventListener('click', (e) => {
  const updatedParams = search.value.replaceAll(' ', '+');
  const searchUrl = `http://api.giphy.com/v1/gifs/search?q=${updatedParams}&api_key=${API_KEY}&limit=12`;
  fetchSearchApi(searchUrl);
});

function fetchTrendingApi() {
  const trendingUrl = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=14`;

  fetch(trendingUrl)
    .then((response) => response.json())
    .then((trendingData) => {
      processTrendingImgs(trendingData.data);
    });
}

function processTrendingImgs(trendingImgs) {
  const trendingArr = (trendingImgs || []).map((trendingGif) => {
    const trendingImgLink = trendingGif.images.fixed_width_small_still.url;
    return `<div><img class = "trending-images" src = "${trendingImgLink}" alt = "${trendingGif.slug}"></div>`;
  });
  trendingContainer.innerHTML = trendingArr;
}

fetchTrendingApi();

// function onSearchValue(e) {
//   console.log(e.target.value);
// }
