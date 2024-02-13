import firebaseAuth from "../components/firebaseAuth.js";
import { authenticationObject } from "../components/firebaseAuth.js";

// var wishlist = [
//   {
//     name: "NEIL ISLAND",
//     info: "Neil Island is one of India’s Andaman Islands, in the Bay of Bengal. Bharatpur Beach has coral reefs teeming with tropical fish. Laxmanpur Beach is known for its sunset views. Howrah Bridge is a natural rock formation accessible at low tide. Near the island’s wharf is Neil Kendra village, with a curving, sandy bay dotted with boats. Off the southeast coast, the tiny Sir Hugh Rose Island is a sanctuary for turtles.",
//     images:
//       "https://www.tripsavvy.com/thmb/SF7NoKaUPvXKxBkDbmPrC-GSddU=/2121x1414/filters:fill(auto,1)/GettyImages-508601155-592e840f5f9b5859500d0724.jpg",
//     location:
//       "https://www.google.co.in/maps/place/Samudrika+Marine+Museum/@11.6718057,92.7263692,15z/data=!4m2!3m1!1s0x0:0xd7352994a1c32fb8?sa=X&ved=2ahUKEwi64_yEu_PlAhWMILcAHYtnBf0Q_BIwC3oECBAQCA",
//     location:
//       "https://www.google.co.in/maps/place/Neill+Island,+Andaman+and+Nicobar+Islands+744104/data=!4m2!3m1!1s0x3088d9a13824c715:0xddd01ec98b4eb529?sa=X&ved=2ahUKEwjTjPqquvPlAhU56nMBHbmRBCAQ8gEwJXoECBAQBA",
//     id: 1,
//     price: "785.6",
//     ratings: "3.3",
//     recommended: false,
//     trending: false,
//     sdate: "2-Aug",
//     edate: "5-Aug",
//     guest: "4",
//   },
//   {
//     name: "PORT BLAIR",
//     info: "It has been an important historical part of Port Blair. Notable freedom fighters such as Veer Savarkar, Yogendra Shukla, Batukeshwar Dutt, and Babarao Savarkar were some of the inmates here. Don’t miss the light and sound show(Monday, Wednesday and Friday) when you visit Cellular jail. ",
//     images:
//       "https://www.holidify.com/images/cmsuploads/compressed/3616_20190213160612jpg",
//     location:
//       "https://www.google.co.in/maps/place/Cellular+Jail+National+Monument/@11.6738247,92.7479768,15z/data=!4m2!3m1!1s0x0:0x616a8c6623fdba3f?sa=X&ved=2ahUKEwihqtPEuvPlAhU4IbcAHThdBsAQ_BIwJnoECA4QCA",
//     id: 2,
//     price: "676.9",
//     ratings: "1.6",
//     recommended: true,
//     trending: true,
//     sdate: "2-Aug",
//     edate: "5-Aug",
//     guest: "4",
//   },
//   {
//     name: "PORT BLAIR",
//     info: "It has been an important historical part of Port Blair. Notable freedom fighters such as Veer Savarkar, Yogendra Shukla, Batukeshwar Dutt, and Babarao Savarkar were some of the inmates here. Don’t miss the light and sound show(Monday, Wednesday and Friday) when you visit Cellular jail. ",
//     images:
//       "https://www.holidify.com/images/cmsuploads/compressed/3616_20190213160612jpg",
//     location:
//       "https://www.google.co.in/maps/place/Cellular+Jail+National+Monument/@11.6738247,92.7479768,15z/data=!4m2!3m1!1s0x0:0x616a8c6623fdba3f?sa=X&ved=2ahUKEwihqtPEuvPlAhU4IbcAHThdBsAQ_BIwJnoECA4QCA",
//     id: 2,
//     price: "676.9",
//     ratings: "1.6",
//     recommended: true,
//     trending: true,
//     sdate: "2-Aug",
//     edate: "5-Aug",
//     guest: "4",
//   },
// ];
const baseUrl = `https://difficult-cyan-jersey.cyclic.app`;
console.log(wishlist);

var content = document.querySelector("#wishlist-content");
function updateDisplay(userObject) {
  content.innerHTML = "";
  userObject.wishlist.forEach((element, index) => {
    var card = document.createElement("div");
    card.setAttribute("class", "card1");
    var card_img = document.createElement("div");
    card_img.setAttribute("class", "card-img");
    var card_det = document.createElement("div");
    card_det.setAttribute("class", "card-det");
    var card_btn = document.createElement("div");
    card_btn.setAttribute("class", "card-btn");
    var btn = document.createElement("button");
    btn.setAttribute("class", "book");
    btn.innerText = "Book Now";

    var img = document.createElement("img");
    img.src = element.images;
    var name = document.createElement("h2");
    name.classList.add("name");
    name.innerText = element.name;
    card_img.append(img);

    //card title

    //card details

    let state = document.createElement("h2");
    state.textContent = element.state;
    state.classList.add("state");

    let rating = document.createElement("h3");
    rating.innerHTML = `<i class="fa-solid fa-star" style="color: #ffcf24;"></i> ${element.ratings}`;

    var price = document.createElement("h2");
    let priceString = element.price * 80 + "";
    priceString = priceString.split("");
    console.log(priceString);
    priceString.splice(2, 0, ",");
    priceString = priceString.join("");
    console.log(priceString);
    price.innerText = "Price Rs  " + priceString;

    var description = document.createElement("p");
    description.textContent = element.info.substring(0, 140) + "....";
    card_det.append(name, state, rating, price, description);

    let remove_btn = document.createElement("button");
    remove_btn.classList.add("remove-btn");
    remove_btn.textContent = "Remove";
    card_btn.append(btn, remove_btn);
    btn.addEventListener("click", function () {
      localStorage.setItem(
        "touristDestinationDetails",
        JSON.stringify(element)
      );
      window.location.href = "../pages/productDetails.html";
    });

    remove_btn.addEventListener("click", () => {
      userObject.wishlist.splice(index, 1);
      updateDisplay(userObject);
      updateUser(userObject, userObject.id);
    });

    card.append(card_img, card_det, card_btn);
    content.append(card);
  });
}

let checkAuthentication = async function () {
  await firebaseAuth();
  if (authenticationObject.isLoggedIn) {
    console.log("Logged IN");
    fetch(`${baseUrl}/users`)
      .then((res) => {
        return res.json();
      })
      .then((usersData) => {
        let idx = usersData.findIndex(
          (obj) => obj.email == authenticationObject.email
        );

        updateDisplay(usersData[idx]);
      });
  } else {
    content.innerHTML = ` <div class="empty-wishlist">
                  <div class="empty-wishlist-image">
                  <img src="../Product-images/empty-wishlist.png" alt="" />
                </div>
                <em><h1 class="empty-wishlist-text">User Not Logged In!</h1></em>
              </div>`;
  }
};

let updateUser = async function (obj, id) {
  let res = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  console.log(data);
};

checkAuthentication();
