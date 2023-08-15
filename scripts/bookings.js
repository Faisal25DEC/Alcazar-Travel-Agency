import firebaseAuth from "../components/firebaseAuth.js";
import { authenticationObject } from "../components/firebaseAuth.js";
const baseUrl = `https://alcazar-backend.onrender.com`;

document.querySelector("#btnradio1").addEventListener("click", function () {
  var book = JSON.parse(localStorage.getItem("bookings")) || [];
  if (book.length == 0) {
    document.querySelector(
      "#content"
    ).innerHTML = `<h2>No Current Bookings Available<h2/>`;
  } else updateDisplay(book);
});
document.querySelector("#btnradio2").addEventListener("click", function () {
  var closed = JSON.parse(localStorage.getItem("past"));
  updateDisplay(closed);
  var ratingsElements = document.querySelectorAll(".ratings");
  ratingsElements.forEach(function (element) {
    element.style.display = "block";
  });
  var r = document.querySelectorAll(".cancel");
  r.forEach(function (element) {
    element.style.display = "none";
  });
});
var main = document.querySelector("#content");
function updateDisplay(arr) {
  main.innerHTML = "";
  arr.forEach((element, index) => {
    //console.log(element);
    var card = document.createElement("div");
    card.setAttribute("class", "cr");
    var img = document.createElement("img");
    img.setAttribute("src", element.images);
    var name = document.createElement("h3");
    name.innerText = element.name;
    var p = document.createElement("p");
    p.innerText = `From: ${element.sdate} - ${element.edate}`;
    var guest = document.createElement("p");
    guest.innerText = "Guests: " + element.guest;
    var bt_div = document.createElement("div");
    bt_div.setAttribute("class", "bt-div");
    var details = document.createElement("button");

    details.setAttribute("class", "b");
    details.setAttribute("id", "openModalBtn");
    details.setAttribute("data-bs-toggle", "offcanvas");
    details.setAttribute("data-bs-target", "#offcanvasRight");
    details.innerText = "Details";
    var cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.setAttribute("class", "cancel");
    bt_div.append(details, cancel);
    var rev = document.createElement("div");
    rev.innerHTML = "Ratings :-  ";
    rev.setAttribute("class", "ratings");
    rev.setAttribute("style", "display:none;");
    review(rev);
    var price = document.createElement("h4");
    price.innerText = "Amount: Rs. " + element.price;
    cancel.addEventListener("click", function () {
      console.log("hio");
      arr.splice(index, 1);
      updateDisplay(arr);
      localStorage.setItem("bookings", JSON.stringify(arr));
      if (book.length == 0) {
        document.querySelector(
          "#content"
        ).innerHTML = `<h2>No Current Bookings Available<h2/>`;
      } else updateDisplay(book);
    });

    details.addEventListener("click", function () {
      console.log(element);

      var title = document.querySelector(".offcanvas-title");
      title.innerHTML = "";
      title.innerText = element.name;
      var info = document.querySelector(".offcanvas-body");
      info.innerHTML = "";
      info.innerText = `${element.info} \n \n Ratings:- ${element.ratings} \n Price: ${element.price} \n Guests: ---`;

      const targetButton = document.getElementById("openModalBtn");
      console.log(targetButton);
    });
    card.append(img, name, price, guest, p, bt_div, rev);
    main.append(card);
  });
}

function review(rev) {
  for (let i = 1; i <= 5; i++) {
    var st = document.createElement("span");
    st.setAttribute("class", "fa fa-star");
    st.setAttribute("id", `star-${i}`);
    rev.appendChild(st);

    st.addEventListener("click", function (event) {
      event.preventDefault();
      let num = parseInt(event.target.id.split("-")[1]);

      for (let j = 1; j <= 5; j++) {
        const star = rev.querySelector(`#star-${j}`);
        if (j <= num) {
          star.classList.add("checked");
        } else {
          star.classList.remove("checked");
        }
      }
    });
  }
  return rev;
}
var book = JSON.parse(localStorage.getItem("bookings")) || [];
if (book.length == 0) {
  document.querySelector(
    "#content"
  ).innerHTML = `<h2>No Current Bookings Available<h2/>`;
} else updateDisplay(book);

const searchBarInput = document.querySelector("#navbar .input-search>#search");
console.log(searchBarInput);
let detour = async function () {
  let allTouristDestinationApiResponse = await fetch(
    `${baseUrl}/touristDestinations`
  );
  let allTouristDestinations = await allTouristDestinationApiResponse.json();
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

let checkAuthentication = async function () {
  await firebaseAuth();
  console.log(authenticationObject);
  const emptyContent = document.querySelector("#empty-content");
  if (authenticationObject.isLoggedIn) {
    emptyContent.style.display = "none";
    let email = authenticationObject.email;
    let apiRes = await fetch(`${baseUrl}/users?email=${email}`);
    let usersData = await apiRes.json();
    console.log(usersData);
  } else {
    emptyContent.style.display = "grid";
    emptyContent.innerHTML = ` <div class="empty-wishlist">
    <div class="empty-wishlist-image">
    <img src="../Product-images/empty-wishlist.png" alt="" />
  </div>
  <em><h1 class="empty-wishlist-text">User Not Logged In!</h1></em>
</div>`;
  }
};

checkAuthentication();
detour();
//console.log(Date.now())

// Open the modal

// Close the modal
//   const currentDate = new Date();

//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const day = String(currentDate.getDate()).padStart(2, '0');

//   const formattedDate = `${year}-${month}-${day}`;

//   console.log(formattedDate);

// console.log(formattedDate);
// const upcomingEvents = array.filter(element => element.date >= bookedTill);

// console.log(upcomingEvents);
