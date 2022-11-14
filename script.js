const searchInput = document.querySelector(".search");

function setup() {
  let url = "https://api.tvmaze.com/shows/82/episodes";
  fetch(url).then(rep=> rep.json()).then(data=> makePageForEpisodes(data));
}

function makePageForEpisodes(episodeList) {

  for(let i = 0 ; i < episodeList.length ; i ++ ){
    const body = document.getElementById("container")
    const dive = document.createElement("div")
    const pHeader = document.createElement("p");
    const img = document.createElement("img");
    const pSum = document.createElement("p");
    dive.id = "containerStyle";
    img.src = episodeList[i].image.medium; // display medium Img
    pHeader.innerText = `${episodeList[i].name} - S01E0${i + 1} `; // display heder and number of episod
    pHeader.id="header-episode";
    pSum.innerHTML = episodeList[i].summary; // display summary
    dive.appendChild(pHeader);
    dive.appendChild(img);
    dive.appendChild(pSum);
    body.appendChild(dive);

    let cardList = [...document.querySelectorAll("#containerStyle")]
    searchText(cardList);
    let numberOfEpisodes = document.querySelector(".numberOfEpisodes");
    numberOfEpisodes.innerText = `Search in ${cardList.length} Episodes`;
    
  }
  let cardList1 = [...document.querySelectorAll("#containerStyle")]
  let titlesOfEpisodes = [...document.querySelectorAll("#header-episode")]
  selectEpisodesOfTheShow(titlesOfEpisodes, cardList1);
}
    // Add an Episode Selector

      function selectEpisodesOfTheShow (cardList, cardList1) {
        let selectEpisodes = document.getElementById("selectEpisodes");
        
        for (let i = 0; i < cardList.length; i++) {
          let selectEpisode = document.createElement("option");
          selectEpisode.innerText= cardList[i].innerText;
          selectEpisodes.appendChild(selectEpisode);
        }
     
        selectEpisodes.addEventListener("change", (va) => {
        let value = va.target.value;
        
        cardList1.forEach((item) => {
          if(item.innerText.includes(value)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        })
      })
        
}

  function searchText(cardList) {
  let searchInput = document.querySelector(".search")
  
  searchInput.addEventListener("keyup", (event) => {
  let searchValue = event.target.value.toLowerCase();
  cardList.forEach((item) => {
    let textValue = item.innerText.toLowerCase();
    if (textValue.includes(searchValue)){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  })

    let numberOfEpisodes = document.querySelector(".numberOfEpisodes");

    let numberOfMatchingEpisode = cardList.filter((item) => item.style.display == "block")
    numberOfEpisodes.innerText = `Displaying ${numberOfMatchingEpisode.length}/${cardList.length} Episodes`;
  })

  }

window.onload = setup;
