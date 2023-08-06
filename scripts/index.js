let baseURL = `http://localhost:3000`;
let allTouristDestinations = [];
var getStates = async function () {
  let apiResponse = await fetch(`${baseURL}/touristDestinations`);
  let data = await apiResponse.json();

  data.forEach((dest, index) => {
    let img = document.createElement("img");
    img.src = dest.images;

    let p = document.createElement("p");
    p.textContent = index;
    let div = document.createElement("div");
    div.append(p, img);
    document.querySelector("body").append(div);
    console.log(index);
  });
};
getStates();
