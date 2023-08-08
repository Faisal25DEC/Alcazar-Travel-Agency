const countElement = document.getElementById("count");
const addButton = document.getElementById("add-button");
const reduceButton = document.getElementById("reduce-button");

let count = 0;

// Function to update the count display
function updateCount() {
  countElement.textContent = count;
}

// Add event listener for the "Add" button
addButton.addEventListener("click", function () {
  count++;
  updateCount();
});

// Add event listener for the "Reduce" button
reduceButton.addEventListener("click", function () {
  if (count > 0) {
    count--;
    updateCount();
  }
});

// Initial update of the count display
updateCount();
