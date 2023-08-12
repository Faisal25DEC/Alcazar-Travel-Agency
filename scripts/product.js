const baseUrl = `http://localhost:3000`;
const unsplashApiKey = `GyO4Y3ccun7RvAO8u4mPM8e-KNFfw3jC38X9Q-UnHsI`;
const unsplashApiUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashApiKey}`;
const productsBody = document.querySelector("#products-body");
const searchQuery = document.querySelector("#query");
const stateSearch = document.querySelector("#state");
const paginationT = document.querySelector(".pagination");
console.log(searchQuery);

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

const element = document.querySelector(".pagination ul");
let totalPages = 13;
let page = 1;

//calling function with passing parameters and adding inside element which is ul tag

function createPagination(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (beforePage < 0) beforePage = 0;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
      page - 1
    });getTouristDestinations(${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1); getTouristDestinations(1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = "active";
    } else {
      //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength}); getTouristDestinations(${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages}); getTouristDestinations(${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    });getTouristDestinations(${
      page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}

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

    let duration = document.createElement("p");
    let durationV = Math.floor(Math.random() * 5) + 3;
    duration.textContent = `${durationV} days`;

    timeDiv.append(timeIcon, duration);

    let saveDiv = document.createElement("div");
    saveDiv.classList.add("save");

    let saveIcon = document.createElement("img");
    saveIcon.src = "../Product-images/save.png";

    saveDiv.append(saveIcon);

    productCardBodyTop.append(timeDiv, saveDiv);

    //product-card-body-title
    let productCardBodyTitle = document.createElement("div");
    productCardBodyTitle.classList.add("product-card-body-title");

    let title = document.createElement("h3");
    title.textContent = name;

    let state = document.createElement("div");
    state.classList.add("state");

    let stateIcon = document.createElement("img");
    stateIcon.src = "../Product-images/location.png";

    let stateName = document.createElement("p");

    stateName.textContent = getStateName(name, statesData);

    state.append(stateIcon, stateName);

    productCardBodyTitle.append(title, state);

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
const searchBarInput = document.querySelector(".input-search>#search");
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
};

getBannerImages();
getTouristDestinations(1);
