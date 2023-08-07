const baseUrl = `http://localhost:3000`;
const unsplashApiKey = `GyO4Y3ccun7RvAO8u4mPM8e-KNFfw3jC38X9Q-UnHsI`;
const unsplashApiUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashApiKey}`;

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
getBannerImages();
