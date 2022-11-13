function setup() {
  const allEpisodes = getAllEpisodes();
  console.log(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {

  for(let i = 0 ; i < episodeList.length ; i ++ ){
    const body = document.getElementById("container")
    const dive = document.createElement("div")
    const pHeader = document.createElement("p");
    const img = document.createElement("img");
    const pSum = document.createElement("p");
    img.src = episodeList[i].image.medium; // display medium Img
    pHeader.innerText = `${episodeList[i].name} - S01E0${i + 1} `; // display heder and number of episod
    pHeader.id="header-episode";
    pSum.innerHTML = episodeList[i].summary; // display summary
    body.appendChild(dive)
    dive.appendChild(pHeader);
    dive.appendChild(img);
    dive.appendChild(pSum);
  }}

window.onload = setup;
