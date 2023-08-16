import firebaseAuth from "../components/firebaseAuth.js";
import { authenticationObject } from "../components/firebaseAuth.js";

firebaseAuth();

const baseUrl = `https://jittery-puce-spider.cyclic.cloud`;
var placeDetails = JSON.parse(localStorage.getItem("stateName")).fromHome
  ? JSON.parse(localStorage.getItem("stateName"))
  : JSON.parse(localStorage.getItem("touristDestinationDetails"));

function displayStateImages(stateData) {
  let { img } = stateData;
  let carouselInner = document.querySelector(".carousel-inner");
  let carouselIndicator = document.querySelector(".carousel-indicators");
  carouselIndicator.innerHTML = null;
  carouselInner.innerHTML = null;
  img.forEach((image, index) => {
    let active = "";
    if (index == 0) {
      active = "active";
    }
    carouselIndicator.innerHTML += `  <li
    data-target="#carouselExampleIndicators"
    data-slide-to="0"
    class=${active}
  ></li>`;
    carouselInner.innerHTML += ` <div class="carousel-item ${active}">
        <img
          class="d-block w-100"
          src="${image}"
          alt="First slide"
        />
      </div>`;
  });
}

var displayStateProducts = function (stateFoods) {
  let exploreCardWrapper = document.querySelector("#explore-card-wrapper");
  exploreCardWrapper.innerHTML = null;
  stateFoods.forEach((stateFood) => {
    let { name, image, description } = stateFood;
    exploreCardWrapper.innerHTML += `<div class="explore-card">
        <div class="card" style="">
          <img class="card-img-top" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
              ${description.substring(0, 70) + "..."}
            </p>
            <a href="#" class="btn btn-primary">See</a>
          </div>
        </div>
      </div`;
  });
};

var displayStateTouristDestinations = function (stateTouristDestinations) {
  let exploreCardWrapper = document.querySelector("#explore-card-wrapper");
  exploreCardWrapper.innerHTML = null;
  stateTouristDestinations.forEach((stateTouristDestination) => {
    let { name, images, info } = stateTouristDestination;
    exploreCardWrapper.innerHTML += `<div class="explore-card">
        <div class="card" style="">
          <img class="card-img-top" src="${images}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
              ${info.substring(0, 70) + "..."}
            </p>
            <a href="#" class="btn btn-primary">See</a>
          </div>
        </div>
      </div`;
  });
};
const navigationButtons = document.querySelectorAll(
  "#explore-navigation-buttons button"
);
var getStateDetails = async function () {
  console.log(placeDetails);
  let { state } = placeDetails;
  let apiResponse = await fetch(`${baseUrl}/state`);
  let data = await apiResponse.json();

  let allTouristDestinationApiResponse = await fetch(
    `${baseUrl}/touristDestinations`
  );
  let allTouristDestinations = await allTouristDestinationApiResponse.json();

  console.log(data);
  let idx = data.findIndex((element) => element.name == state);
  displayStateImages(data[idx]);
  displayStateTouristDestinations(data[idx].tourist);
  console.log(data);
  navigationButtons.forEach((navigationButton) => {
    navigationButton.addEventListener("click", () => {
      navigationButtons.forEach((ele) => {
        ele.classList.remove("button-active");
      });
      navigationButton.classList.add("button-active");
      if (navigationButton.textContent == "Products") {
        displayStateProducts(data[idx].products);
      }
      if (navigationButton.textContent == "Places") {
        displayStateTouristDestinations(data[idx].tourist);
      }
    });
  });

  const searchBarInput = document.querySelector(
    "#navbar .input-search>#search"
  );

  searchBarInput.addEventListener("input", () => {
    const searchSuggestions = document.querySelector(".search-suggestions");
    searchSuggestions.innerHTML = "";
    let inputValue = event.target.value;
    if (inputValue == "") {
      searchSuggestions.style.display = "none";
      return;
    } else {
      searchSuggestions.style.display = "block";
      let newRegExp = new RegExp(inputValue, "gi");
      let searchTouristDestinationsFilter = allTouristDestinations.filter(
        (touristDestination) => {
          return touristDestination.name.match(newRegExp);
        }
      );
      console.log(searchTouristDestinationsFilter);

      searchTouristDestinationsFilter.forEach((touristDestination) => {
        let { images, name, state } = touristDestination;
        let searchSuggestionContainer = document.createElement("div");
        searchSuggestionContainer.classList.add("search-suggestion");

        let searchSuggestionImage = document.createElement("img");
        searchSuggestionImage.src = images;

        let searchSuggestionText = document.createElement("div");

        let searchSuggestionState = document.createElement("p");
        searchSuggestionState.textContent = state;

        let searchSuggestionTitle = document.createElement("p");
        searchSuggestionTitle.textContent = name;
        searchSuggestionText.append(
          searchSuggestionTitle,
          searchSuggestionState
        );

        searchSuggestionContainer.append(
          searchSuggestionImage,
          searchSuggestionText
        );
        searchSuggestionContainer.addEventListener("click", () => {
          localStorage.setItem(
            "touristDestinationDetails",
            JSON.stringify(touristDestination)
          );
          window.location.assign("../pages/productDetails.html");
        });
        searchSuggestions.append(searchSuggestionContainer);
      });
    }
  });
};
getStateDetails();
