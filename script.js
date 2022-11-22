const searchInput = document.querySelector(".search");
getAllShows();
let allShow = getAllShows();
console.log(allShow);
let url;
let selectShows = document.getElementById("selectShows");

function setup() {}
selectShows.addEventListener("change", (event) => {
  if (event.target.value == 0) {
    makePageForEpisodes(allShow);
  }
  fetch(event.target.value)
    .then((rep) => rep.json())
    .then((data) => {
      makePageForEpisodes(data);
    })
    .catch((err) => displayError(err));
});

function displayError(err) {
  let errorText = document.createElement("p");
  let errorPage = document.getElementById("error-text");
  errorText.innerText = "Sorry, this page couldn`t load.";
  errorPage.appendChild(errorText);
}
for (let i = 0; i < allShow.length; i++) {
  let optionShow = document.createElement("option");
  optionShow.innerText = allShow[i].name;
  selectShows.appendChild(optionShow);
  optionShow.setAttribute(
    "value",
    `https://api.tvmaze.com/shows/${allShow[i].id}/episodes`
  );
}

function makePageForEpisodes(episodeList) {
  const body = document.getElementById("container");
  body.innerHTML = "";
  const headers = [];
  for (let i = 0; i < episodeList.length; i++) {
    const dive = document.createElement("div");
    const pHeader = document.createElement("p");
    let img = document.createElement("img");
    const pSum = document.createElement("p");
    dive.id = "containerStyle";

    if (img != null) {
      img.setAttribute("src", episodeList[i].image?.medium); // display medium Img
    }
    if (episodeList[i] != undefined) {
      pHeader.innerText = `${episodeList[i].name} - S01E0${i + 1} `; // display heder and number of episode
      headers.push(`${episodeList[i].name} - S01E0${i + 1} `);
    }

    pHeader.id = "header-episode";
    pSum.innerHTML = episodeList[i].summary; // display summary
    dive.appendChild(pHeader);
    dive.appendChild(img);
    dive.appendChild(pSum);
    body.appendChild(dive);

    let cardList = [...document.querySelectorAll("#containerStyle")];
    searchText(cardList);
    let numberOfEpisodes = document.querySelector(".numberOfEpisodes");
    numberOfEpisodes.innerText = `Search in ${cardList.length} Episodes`;
  }
  let cardList1 = [...document.querySelectorAll("#containerStyle")];
  selectEpisodesOfTheShow(headers, cardList1);
}

let showList = [...document.querySelectorAll("#showList")];

// Add an Episode Selector

function selectEpisodesOfTheShow(cardList, cardList1) {
 
  let selectEpisodes = document.getElementById("selectEpisodes");
  selectEpisodes.innerHTML = "";
  for (let i = 0; i < cardList.length; i++) {
    let selectEpisode = document.createElement("option");
    //selectEpisode.innerText = cardList[i].innerText;
    selectEpisode.innerText = cardList[i];
    selectEpisodes.appendChild(selectEpisode);
  }

  selectEpisodes.addEventListener("change", (va) => {
    let value = va.target.value;

    cardList1.forEach((item) => {
      if (item.innerText.includes(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

function searchText(cardList) {
  let searchInput = document.querySelector(".search");

  searchInput.addEventListener("keyup", (event) => {
    let searchValue = event.target.value.toLowerCase();
    cardList.forEach((item) => {
      let textValue = item.innerText.toLowerCase();
      if (textValue.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    let numberOfEpisodes = document.querySelector(".numberOfEpisodes");

    let numberOfMatchingEpisode = cardList.filter(
      (item) => item.style.display == "block"
    );
    numberOfEpisodes.innerText = `Displaying ${numberOfMatchingEpisode.length}/${cardList.length} Episodes`;
  });
}
makePageForEpisodes(allShow);
window.onload = setup;
