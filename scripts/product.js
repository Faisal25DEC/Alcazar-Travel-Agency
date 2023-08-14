import firebaseAuth from "../components/firebaseAuth.js";
import { authenticationObject } from "../components/firebaseAuth.js";
const baseUrl = `http://localhost:3000`;
const unsplashApiKey = `GyO4Y3ccun7RvAO8u4mPM8e-KNFfw3jC38X9Q-UnHsI`;
const unsplashApiUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashApiKey}`;
const productsBody = document.querySelector("#products-body");
const searchQuery = document.querySelector("#query");
const stateSearch = document.querySelector("#state");
const paginationT = document.querySelector(".pagination");
console.log(searchQuery);

// -----------------------------------Authentication Object -------------------------------------
firebaseAuth();
const element = document.querySelector(".pagination ul");

function createPagination(totalPages, page) {
  const paginationContainer = document.createElement("ul");
  paginationContainer.classList.add("pagination");

  let liTag = "";
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (beforePage < 0) beforePage = 0;

  if (page > 1) {
    liTag += `<li class="btn prev" data-page="${
      page - 1
    }"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    liTag += `<li class="first numb" data-page="1"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    const activeClass = plength === page ? "active" : "";
    liTag += `<li class="numb ${activeClass}" data-page="${plength}"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" data-page="${totalPages}"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next" data-page="${
      page + 1
    }"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }

  paginationContainer.innerHTML = liTag;
  paginationContainer
    .querySelectorAll(".numb, .prev, .next")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const pageNumber = parseInt(button.dataset.page);
        if (!isNaN(pageNumber)) {
          createPagination(totalPages, pageNumber);
          getTouristDestinations(pageNumber);
        }
      });
    });

  element.innerHTML = ""; // Clear existing content
  element.appendChild(paginationContainer);
}

// selecting required element
function showQueryResults(inputValue, statesData, touristDestinations) {
  console.log(inputValue);

  let touristDestinationsFilter = touristDestinations.filter((element) => {
    let newRegExp = new RegExp(`^${inputValue}`, "gi");
    return element.name.match(newRegExp);
  });
  console.log(touristDestinationsFilter);
  displayTouristDestinations(touristDestinationsFilter, statesData);
}

function showStateResults(inputValue, statesData, touristDestinations) {
  console.log(touristDestinations);
  paginationT.style.display = "none";
  let touristDestinationsState = statesData.filter((el) => {
    let newRegExp = new RegExp(`^${inputValue}`, "gi");
    return el.name.match(newRegExp);
  });
  console.log(touristDestinationsState);

  let touristDestinationsAfterFilter = touristDestinationsState[0].tourist.map(
    (element) => {
      let res = touristDestinations.findIndex(
        (ele) => ele.name == element.name
      );
      console.log(res);
      if (res != -1) {
        console.log(touristDestinations[res]);
        return touristDestinations[res];
      }
    }
  );
  displayTouristDestinations(touristDestinationsAfterFilter, statesData);
}
let debounce = function (func, delay) {
  let id;
  return (...args) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => func.apply(null, args), delay);
  };
};

let totalPages = 13;
let page = 1;

//calling function with passing parameters and adding inside element which is ul tag

function changeImageWithAnimation(imageElement, src) {
  // Increment the index to get the next image source

  // Apply the new image source with the animation class
  imageElement.style.animation = "none";

  // Wait for the animation to complete (duration is 1s in the CSS)
  setTimeout(() => {
    // Change the image source
    imageElement.src = src;

    // Reset the animation property to avoid re-triggering immediately
    imageElement.style.animation = "fade 1s ease-in-out";

    // Request a reflow/repaint to reset the animation
    // This step might be needed in some cases for the animation to restart smoothly
    imageElement.offsetHeight;
  }, 1000); // Wait for 1s before changing the image source
}

// Call the function at an interval (e.g., every 5 seconds)
// Change image every 5 seconds

let displayBanner = function (imagesObject) {
  let bannerImage1 = document.querySelector(
    "#banner-right>.banner-right-images>.image-1>img"
  );
  let bannerImage2 = document.querySelector(
    "#banner-right>.banner-right-images>.image-2>img"
  );
  let bannerImages = [];
  let index = Math.floor(Math.random() * 10);
  for (let i = 0; i < 10; i++) {
    bannerImages.push(imagesObject.results[i].urls.full);
  }
  setInterval(() => {
    index = Math.floor(Math.random() * 10);

    changeImageWithAnimation(bannerImage1, bannerImages[index]);
  }, 3000);
  setInterval(() => {
    index = Math.floor(Math.random() * 10);

    changeImageWithAnimation(bannerImage2, bannerImages[index]);
  }, 10000);
};

var getBannerImages = async function () {
  let apiResponse = await fetch(`${unsplashApiUrl}&query=travel`);
  let imagesObject = await apiResponse.json();
  console.log(imagesObject);
  displayBanner(imagesObject);
};

var getPlaceImages = async function (name) {
  try {
    let apiResponse = await fetch(`${unsplashApiUrl}&page=1&query=${name}`);
    let placeImages = await apiResponse.json();
    console.log(placeImages);
    return placeImages.results[0].urls.thumb;
  } catch (err) {
    console.log(err);
  }
};

var getStateName = function (title, statesData) {
  for (let states of statesData) {
    for (let element of states.tourist) {
      if (element.name == title) return states.name;
    }
  }
};

var displayTouristDestinations = function (
  touristDestinations,
  statesData,
  allTouristDestinations
) {
  productsBody.innerHTML = null;
  touristDestinations.forEach((touristDestination) => {
    let {
      id,
      images,
      info,
      location,
      name,
      price,
      ratings,
      recommended,
      trending,
      duration,
      state,
    } = touristDestination;

    let productCard = document.createElement("div");
    productCard.classList.add("product-card");

    let productCardTop = document.createElement("div");
    productCardTop.classList.add("product-card-top");

    let placeImageDiv = document.createElement("div");
    placeImageDiv.classList.add("place-image");

    let placeImage = new Image();

    placeImage.onload = function () {
      placeImageDiv.append(placeImage);
    };
    placeImage.onerror = function () {
      let url = getPlaceImages(name);
      url.then((res) => {
        placeImage.src = res;
        placeImageDiv.append(placeImage);
      });
    };
    placeImage.src = images;
    productCardTop.append(placeImageDiv);

    let productCardBody = document.createElement("div");
    productCardBody.classList.add("product-card-body");

    let productCardBodyTop = document.createElement("div");
    productCardBodyTop.classList.add("product-card-body-top");

    let timeDiv = document.createElement("div");
    timeDiv.classList.add("time");

    let timeIcon = document.createElement("img");
    timeIcon.src = "../Product-images/time.png";

    let durationT = document.createElement("p");
    let durationV = Math.floor(Math.random() * 5) + 3;
    durationT.textContent = `${duration} days`;

    timeDiv.append(timeIcon, durationT);

    let saveDiv = document.createElement("div");
    saveDiv.classList.add("save");

    let saveIcon = document.createElement("img");
    saveIcon.src = "../Product-images/save.png";

    saveDiv.append(saveIcon);

    saveDiv.addEventListener("click", () => {
      console.log("what");
      if (authenticationObject.isLoggedIn) {
        if (saveIcon.getAttribute("src") == "../Product-images/save.png") {
          console.log("what");
          saveIcon.src = "../Product-images/saved.png";
        } else {
          saveIcon.src = "../Product-images/save.png";
        }
      } else {
        alert("Please Sign In to save");
      }
    });

    productCardBodyTop.append(timeDiv, saveDiv);

    //product-card-body-title
    let productCardBodyTitle = document.createElement("div");
    productCardBodyTitle.classList.add("product-card-body-title");

    let title = document.createElement("h3");
    title.textContent = name;

    let stateT = document.createElement("div");
    stateT.classList.add("state");

    let stateIcon = document.createElement("img");
    stateIcon.src = "../Product-images/location.png";

    let stateName = document.createElement("p");

    stateName.textContent = state;

    stateT.append(stateIcon, stateName);

    productCardBodyTitle.append(title, stateT);

    let productCardBodyTitleLine = document.createElement("hr");
    productCardBodyTitleLine.classList.add("product-card-body-title-line");

    // product-card-body-desc
    let productCardBodyDesc = document.createElement("div");
    productCardBodyDesc.classList.add("product-card-body-desc");

    let desc = document.createElement("p");
    desc.textContent = info.substring(0, 70) + "...";

    productCardBodyDesc.append(desc);

    let productCardBodyDescLine = document.createElement("hr");
    productCardBodyDescLine.classList.add("product-card-body-desc-line");

    //"product-card-body-footer"
    let productCardBodyFooter = document.createElement("div");
    productCardBodyFooter.classList.add("product-card-body-footer");

    let button = document.createElement("button");
    button.classList.add("details");
    button.textContent = "Details";

    let productPrice = document.createElement("div");
    productPrice.classList.add("product-price");

    let fromT = document.createElement("p");
    fromT.textContent = "From";

    let priceT = document.createElement("h3");
    priceT.textContent = `Rs. ${price * 80}`;

    productPrice.append(fromT, priceT);
    productCardBodyFooter.append(button, productPrice);

    productCardBody.append(
      productCardBodyTop,
      productCardBodyTitle,
      productCardBodyTitleLine,
      productCardBodyDesc,
      productCardBodyDescLine,
      productCardBodyFooter
    );
    productCard.append(productCardTop, productCardBody);
    productsBody.append(productCard);
    button.addEventListener("click", () => {
      touristDestination["duration"] = durationV;
      touristDestination["state"] = stateName.textContent;
      window.location.assign("../pages/productDetails.html");
      localStorage.setItem(
        "touristDestinationDetails",

        JSON.stringify(touristDestination)
      );
    });
  });

  let debouncedFunc = debounce(showQueryResults, 2000);
  searchQuery.addEventListener("keyup", (event) => {
    let inputValue = event.target.value;
    if (inputValue == "") {
      getTouristDestinations(1);
    } else {
      debouncedFunc(inputValue, statesData, allTouristDestinations);
    }
  });
  let debouncedFuncState = debounce(showStateResults, 2000);
  stateSearch.addEventListener("keyup", (event) => {
    let inputValue = event.target.value;
    if (inputValue == "") {
      getTouristDestinations(1);
      paginationT.style.display = "block";
    } else {
      debouncedFuncState(inputValue, statesData, allTouristDestinations);
    }
  });
};

const searchBarInput = document.querySelector("#navbar .input-search>#search");
console.log(searchBarInput);

var getTouristDestinations = async function (pageNumber) {
  let allTouristDestinationApiResponse = await fetch(
    `${baseUrl}/touristDestinations`
  );
  let allTouristDestinations = await allTouristDestinationApiResponse.json();

  let stateApiResponse = await fetch(`${baseUrl}/state`);
  let statesData = await stateApiResponse.json();
  let apiResponse = await fetch(
    `${baseUrl}/touristDestinations?_page=${pageNumber}&_limit=9`
  );
  let touristDestinations = await apiResponse.json();
  console.log(touristDestinations);
  console.log(statesData);

  console.log(touristDestinations.length / 9);
  displayTouristDestinations(
    touristDestinations,
    statesData,
    allTouristDestinations
  );
  createPagination(8, pageNumber);

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

getBannerImages();
getTouristDestinations(1);
