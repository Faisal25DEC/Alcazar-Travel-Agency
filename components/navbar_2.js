function navbar_2() {
  return `
  <div class="nav-logo">
  <img src="../Product-images/logo.png" alt="" />
  <p>Alcazar</p>
</div>
<div class="nav-search">
  <div class="input-search">
    <input id="search" type="text" placeholder="Search for Places" />
    <div>
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
  <div class="search-suggestions"></div>
</div>
<div class = 'nav-right-container'>
<div class="nav-right">
  <a href = './home.html'>Home</a>
  <a href = './product.html'>Explore Places</a>
  <a href = './bookings.html'>My Bookings</a>
</div>
<div class="nav-login-signup-container">
  <div class="nav-login-signup">
    <button id="nav-login">Login</button>

    <button id="nav-signup">SignUp</button>
  
  </div>
  <div class="dropdown">
    <a href = './mainlogin.html' id = 'login-email'><i class="fa-regular fa-envelope"></i>Login With Email</a>
    <a id = 'login-google'><i class="fa-brands fa-google"></i>Login With Google</a>
  </div>
</div>
</div>
<input type="checkbox" id="check" />
<label for="check" class="checkbtn">
  <i class="fas fa-bars"></i>
</label>
 `;
}
export default navbar_2;
