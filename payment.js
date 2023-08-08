// Get the form element
const form = document.getElementById('form_address');

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting
  
  // Get the form inputs
  const email = document.getElementById('email').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const company = document.getElementById('company').value;
  const taxId = document.getElementById('taxId').value;
  const addressLine1 = document.getElementById('addressLine1').value;
  const addressLine2 = document.getElementById('addressLine2').value;
  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zipCode = document.getElementById('zipCode').value;
  const phone = document.getElementById('phone').value;
  
  // Create an object to store the form data
  const formData = {
    email,
    firstName,
    lastName,
    company,
    taxId,
    addressLine1,
    addressLine2,
    country,
    city,
    state,
    zipCode,
    phone
  };
  
  // Store the form data in local storage
  localStorage.setItem('formData', JSON.stringify(formData));
  
  // Display success message
  alert('Billing Address submitted successfully!');
  
  // Reset the form
  form.reset();
}

// Add form submission event listener
form.addEventListener('submit', handleSubmit);

    function validateForm() {
      // Get form inputs
      event.preventDefault();
      var cardNumber = document.getElementById("cardNumber").value;
      var cvv = document.getElementById("cvv").value;
      var expiryDate = document.getElementById("expiryDate").value;
      var name = document.getElementById("name").value;

      // Validate card number
      var validCardNumber = "123456789";
      if (cardNumber !== validCardNumber) {
        alert("Invalid card number");
        return false;
      }

      // Validate CVV
      var validCvv = "123";
      if (cvv !== validCvv) {
        alert("Invalid CVV");
        return false;
      }

      // Validate expiry date
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth() + 1;
      var parts = expiryDate.split("/");
      var inputMonth = parseInt(parts[0], 10);
      var inputYear = parseInt(parts[1], 10);

      if (
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth < currentMonth)
      ) {
        alert("Invalid expiry date");
        return false;
      }

      // Redirect to OTP.html
      var otp = prompt("Enter OTP:1234");
      if (otp === "1234") {
        alert("Payment successful");
        window.location.href ="paysucc.html";
        
      } else {
        alert("Invalid OTP");
      }
 
   
    }

 // Retrieve the value from the "total-cost" key in local storage
 var totalCost = localStorage.getItem("total-cost");
console.log(totalCost);

var orderSummaryElement = document.getElementById("totalamt");
if (totalCost !== null) {
  var parsedTotalCost = JSON.parse(totalCost);
  orderSummaryElement.textContent = "₹ "+parsedTotalCost;
} else {
  orderSummaryElement.textContent = "You haven't book any destination Yet.";
}



           