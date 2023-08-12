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
<div class="nav-right">
  <a>Home</a>
  <a href = './product.html'>Explore Places</a>
</div>
<div class="nav-login-signup-container">
  <div class="nav-login-signup">
    <button id="nav-login">Login</button>

    <button id="nav-signup">SignUp</button>
  
  </div>
  <div class="dropdown">
    <p id = 'login-email'><i class="fa-regular fa-envelope"></i>Login With Email</p>
    <p id = 'login-google'><i class="fa-brands fa-google"></i>Login With Google</p>
  </div>
</div>
 `;
}
export default navbar_2;
