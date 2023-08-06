document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const expiration = document.getElementById('expiration').value;
        const cvv = document.getElementById('cvv').value;

        // Perform payment processing or validation here
        // For example, you could use a payment gateway API
        
        // Simulate a successful payment for demonstration purposes
        // Replace this with actual payment processing logic
        setTimeout(() => {
            alert('Payment successful!');
            form.reset();
        }, 1500);
    });
});
