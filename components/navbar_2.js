function navbar_2() {
  return `
    <div class="nav-logo">
      <img src="../Product-images/logo.png" alt="" />
      <p>Alcazar</p>
    </div>
    <div class="nav-search">
      <div class="input-search">
        <input id = 'search' type="text" placeholder="Search for Places" />
        <div>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="search-suggestions"></div>
    </div>
    <div class="nav-right">
      <p>Home</p>
      <p>Explore Places</p>
    </div>
    <div class="nav-login-signup">
      <button id="nav-login">Login</button>
      <button id="nav-signup">SignUp</button>
    </div>
 `;
}
export default navbar_2;
