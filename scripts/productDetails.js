import firebaseAuth from "../components/firebaseAuth.js";
import { authenticationObject } from "../components/firebaseAuth.js";

firebaseAuth();

const countElement = document.getElementById("count");
const addButton = document.getElementById("add-button");
const reduceButton = document.getElementById("reduce-button");
const loginAlert = document.getElementById("login-alert-container");
const loginAlertText = document.querySelector("#login-alert>p");
const placeDetails = JSON.parse(
  localStorage.getItem("touristDestinationDetails")
);
const baseUrl = `https://alcazar-backend.onrender.com`;
const unsplashApiKey = `GyO4Y3ccun7RvAO8u4mPM8e-KNFfw3jC38X9Q-UnHsI`;
const unsplashApiUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashApiKey}`;

let count = 0;

// Function to update the count display
function updateCount() {
  countElement.textContent = count;
}

// Add event listener for the "Add" button
addButton.addEventListener("click", function () {
  count++;
  updateCount();
});

// Add event listener for the "Reduce" button
reduceButton.addEventListener("click", function () {
  if (count > 0) {
    count--;
    updateCount();
  }
});
let displayProductDetailsImages = function (placeImages) {
  let [obj, img1, ...rightImages] = placeImages.results;
  const productDetailsLeftImagesLeft = document.querySelector(
    ".product-details-left-images-left>img"
  );
  productDetailsLeftImagesLeft.src = img1.urls.full;
  const productDetailsLeftImagesRight = document.querySelectorAll(
    ".product-details-left-images-right>img"
  );
  productDetailsLeftImagesRight.forEach((ele, idx) => {
    ele.src = rightImages[idx].urls.full;
  });
};
let getFormattedPrice = function (price) {
  price = Math.floor(price);
  price = price * 80 + "";
  price = price.split("");
  price.splice(2, 0, ",");
  price = price.join("");
  return price;
};

let displayProductDurationNameAndState = function (name, state, duration) {
  let mainTitle = document.querySelector("#place-name");
  mainTitle.textContent = name;

  let topName = document.querySelector(
    ".product-details-left-top>.place>p>.place"
  );
  topName.textContent = name;

  let topState = document.querySelector(
    ".product-details-left-top>.place>p>.state"
  );
  topState.textContent = ", " + state;

  let topDuration = document.querySelector(
    ".product-details-left-top>.duration>p"
  );
  topDuration.textContent = duration + " Days";

  let cardDuration = document.querySelector(
    ".product-details-right>.duration>h2"
  );
  cardDuration.textContent = `${duration} Days - ${duration - 1} Nights`;

  let cardName = document.querySelector(
    ".product-details-right>.name-and-reviews>.name"
  );
  cardName.textContent = name;
};
let displayProductReviewsPriceAndDesc = function (ratings, price, info) {
  let productRatings = document.querySelector(
    ".product-details-right>.name-and-reviews>.ratings"
  );
  productRatings.textContent = ratings;

  let productPrice = document.querySelector(
    ".product-details-right>.price-container>.curr-price>.price"
  );
  let formattedPrice = getFormattedPrice(price);
  productPrice.textContent = "Rs " + formattedPrice;

  let productWasPrice = document.querySelector(
    ".product-details-right>.price-container>.was-price-container>.was-price"
  );

  let formattedWasPrice = getFormattedPrice(+price + +price * 0.15);
  productWasPrice.textContent = "Rs " + formattedWasPrice;

  let productDescription = document.querySelector(
    ".left>.description-container>p"
  );
  productDescription.textContent = info;
};

let displayProductMap = (name) => {
  let iframe = document.querySelector(".right>div>div>iframe");
  iframe.src = `https://www.google.com/maps/embed/v1/place?q=${name}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;
};
let displayProductDetailsStats = function () {
  let { name, ratings, price, state, duration, info } = placeDetails;

  displayProductDurationNameAndState(name, state, duration);
  displayProductReviewsPriceAndDesc(ratings, price, info);
  displayProductMap(name);
};

let displayProductDetails = function (placeImages) {
  displayProductDetailsImages(placeImages);
  displayProductDetailsStats();
  document.querySelector(".book-now").addEventListener("click", () => {
    if (authenticationObject.isLoggedIn) {
      console.log(authenticationObject.email);
      if (!count) {
        loginAlert.style.display = "block";
        loginAlertText.textContent = "Add Guests!!!";
        setTimeout(() => {
          loginAlert.style.display = "none";
        }, 2500);
      }
    } else {
      loginAlert.style.display = "block";
      loginAlertText.textContent = "User Not Logged In!!";
      setTimeout(() => {
        loginAlert.style.display = "none";
      }, 2500);
    }
  });
};

let getPlaceImages = async function () {
  let { name } = placeDetails;
  let apiResponse = await fetch(
    `${unsplashApiUrl}&query=${name}&orientation=portrait`
  );
  let data = await apiResponse.json();
  displayProductDetails(data);
};

let displayMoreStates = function (stateTouristDestinations) {
  let exploreMoreState = document.querySelector(".explore-state");
  exploreMoreState.textContent = placeDetails.state + "...";
  let swiperContainer = document.querySelector(".swiper-wrapper");

  stateTouristDestinations.forEach((stateTouristDestination) => {
    let { name, images, state } = stateTouristDestination;
    let cardElement = document.createElement("div");
    cardElement.classList.add("card", "swiper-slide");

    cardElement.innerHTML = `
      <div class="image-content">
        <div class="card-image">
          <img src="${images}" alt="" class="card-img">
        </div>
      </div>
      <div class="card-content">
        <h2 class="name">${name}</h2>
        <div class="description"></div>
        <button class="button">View More</button>
      </div>
    `;

    swiperContainer.appendChild(cardElement);

    const viewMoreButton = cardElement.querySelector(".button");
    viewMoreButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(viewMoreButton);
      let durationV = Math.floor(Math.random() * 5) + 3;
      stateTouristDestination["duration"] = durationV;
      stateTouristDestination["state"] = placeDetails.state;

      localStorage.setItem(
        "touristDestinationDetails",
        JSON.stringify(stateTouristDestination)
      );
      window.location.assign("../pages/productDetails.html");
    });
  });
};

var getStateTouristDestinations = async function () {
  try {
    let stateApiResponse = await fetch(`${baseUrl}/state`);
    let stateData = await stateApiResponse.json();

    let idx = stateData.findIndex((ele) => ele.name == placeDetails.state);

    let apiResponse = await fetch(`${baseUrl}/touristDestinations`);
    let data = await apiResponse.json();

    let stateTouristDestinations = stateData[idx].tourist.map((des) => {
      let touristIndex = data.findIndex((ele) => ele.name == des.name);
      if (touristIndex != -1) return data[touristIndex];
    });
    console.log(stateData);
    console.log(data);
    displayMoreStates(stateTouristDestinations);
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
        let searchTouristDestinationsFilter = data.filter(
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
  } catch (err) {
    console.log(err);
  }
};
const exploreButton = document.querySelector(".explore-button");
exploreButton.addEventListener("click", () => {
  window.location.assign("../pages/explore.html");
});
getPlaceImages();
getStateTouristDestinations();
// Initial update of the count display
updateCount();
