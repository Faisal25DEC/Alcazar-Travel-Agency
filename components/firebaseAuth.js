import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import { getDatabase , ref, set} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

let authenticationObject = { isLoggedIn: false };
const baseUrl = `http://localhost:3000`;
function firebaseAuth() {
  const firebaseConfig = {
    apiKey: "AIzaSyBHHxqdFZiyBTugOrwa5IYiIGiWzoiFws8",
    authDomain: "myalcazar-54aa9.firebaseapp.com",
    projectId: "myalcazar-54aa9",
    storageBucket: "myalcazar-54aa9.appspot.com",
    messagingSenderId: "902327114641",
    appId: "1:902327114641:web:6ba16ea9f45fdc432ed830",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in, retrieve user-specific data from Realtime Database
      const uid = user.uid;
      console.log(user);
      const name = user.displayName;

      const email = user.email;
      authenticationObject["isLoggedIn"] = true;
      authenticationObject["email"] = email;
      authenticationObject["displayName"] = name;
      console.log(authenticationObject);

      var newname = document.createElement("p");
      newname.setAttribute("id", "user-name");
      newname.textContent = name;
      // console.log(email);
      // console.log(name);
      // // Assume "users" is the node where user data is stored
      // console.log(uid);
      var logout = document.createElement("button");
      logout.setAttribute("id", "nav-logout");
      logout.textContent = "Log Out";
      var loginSignUpContainer = document.querySelector(
        ".nav-login-signup-container>.nav-login-signup"
      );
      var login = document.querySelector(
        ".nav-login-signup-container>.nav-login-signup>#nav-login"
      );
      var signup = document.querySelector(
        ".nav-login-signup-container>.nav-login-signup>#nav-signup"
      );
      var dropdown = document.querySelector(
        " .nav-login-signup-container>.dropdown"
      );
      dropdown.classList.remove("active");
      login.style.display = "none";
      signup.style.display = "none";

      loginSignUpContainer.append(newname, logout);
      document.getElementById("nav-logout").addEventListener("click", () => {
        signOut(auth)
          .then((user) => {
            // Sign-out successful.
            let logout = document.querySelector("#nav-logout");
            loginSignUpContainer.removeChild(logout);
            let userName = document.querySelector("#user-name");
            loginSignUpContainer.removeChild(userName);

            login.style.display = "block";
            signup.style.display = "block";
            dropdown.classList.remove("active");
            authenticationObject.isLoggedIn = false;
            delete authenticationObject.email;
            delete authenticationObject.displayName;
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      });
    } else {
      // User is not logged in, redirect to login page
      console.log("user not signed in");
      authenticationObject.isLoggedIn = false;
      delete authenticationObject.email;
      delete authenticationObject.displayName;
    }
  });

  let googleLogin = document.getElementById("login-google");
  const provider = new GoogleAuthProvider();
  console.log(googleLogin);
  googleLogin.addEventListener("click", function () {
    console.log("clicked");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        fetch(`${baseUrl}/users`)
          .then((res) => res.json())
          .then((usersArray) => {
            let idx = usersArray.findIndex((obj) => obj.email == user.email);
            console.log(idx);
            const userObject = {
              displayName: user.displayName,
              email: user.email,
              bookings: [],
              wishlist: [],
            };
            if (idx == -1) {
              postUser(userObject);
              console.log(userObject);
            }
          })
          .catch((err) => console.log(err));
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        // ...
      });
  });

  async function postUser(obj) {
    let apiRes = fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default firebaseAuth;
export { authenticationObject };
