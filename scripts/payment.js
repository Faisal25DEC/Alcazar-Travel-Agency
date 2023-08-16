import firebaseAuth from "../components/firebaseAuth.js";
import { authenticationObject } from "../components/firebaseAuth.js";

const baseUrl = `https://jittery-puce-spider.cyclic.cloud`;
const paymentButton = document.querySelector("#submit");
const priceTag = document.querySelector("#payment-price");

var paymentObject = JSON.parse(localStorage.getItem("paymentObject"));

let userGlobalData = {};

var getUser = async function (email) {
  var apiRes = await fetch(`${baseUrl}/users?email=${email}`);
  let userData = await apiRes.json();
  userGlobalData = userData[0];
  console.log(userGlobalData);
};
let { price, guests } = paymentObject;
let totalPrice = Math.floor(price * guests * 80);
let priceString = totalPrice + "";
priceString = priceString.split("");

priceString.splice(2, 0, ",");
priceString = priceString.join("");

priceTag.textContent = "Rs " + priceString;
//RazorPay

//After the payment is succesful
var options = {
  key: "rzp_test_rhCjqxNcV7bjq3", // Enter the Key ID generated from the Dashboard
  amount: totalPrice * 100,
  currency: "INR",
  description: "Alcazar",
  image: "../Product-images/logo.png",
  prefill: {
    email: "gaurav.kumar@example.com",
    contact: +919900000000,
  },
  config: {
    display: {
      blocks: {
        utib: {
          //name for Axis block
          name: "Pay using Axis Bank",
          instruments: [
            {
              method: "card",
              issuers: ["UTIB"],
            },
            {
              method: "netbanking",
              banks: ["UTIB"],
            },
          ],
        },
        other: {
          //  name for other block
          name: "Other Payment modes",
          instruments: [
            {
              method: "card",
              issuers: ["ICIC"],
            },
            {
              method: "netbanking",
            },
          ],
        },
      },
      hide: [
        {
          method: "upi",
        },
      ],
      sequence: ["block.utib", "block.other"],
      preferences: {
        show_default_blocks: false, // Should Checkout show its default blocks?
      },
    },
  },
  handler: function (response) {
    // Handle the successful payment here
    // You can use the response to perform necessary actions or validations
    // Redirect to the payment success page
    userGlobalData.bookings.push(paymentObject);
    updateUser(userGlobalData, userGlobalData.id);
  },
  modal: {
    ondismiss: function () {
      if (confirm("Are you sure, you want to close the form?")) {
        txt = "You pressed OK!";
        console.log("Checkout form closed by the user");
      } else {
        txt = "You pressed Cancel!";
        console.log("Complete the Payment");
      }
    },
  },
};
var rzp1 = new Razorpay(options);
document.getElementById("rzp-button1").onclick = function (e) {
  rzp1.open();
  e.preventDefault();
};

let updateUser = async function (obj, id) {
  let res = fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  setTimeout(() => {
    window.location.assign("../pages/bookings.html");
  }, 3000);
};
var checkAuthentication = async function () {
  await firebaseAuth();
  console.log(authenticationObject);
  getUser(authenticationObject.email);
};
checkAuthentication();
