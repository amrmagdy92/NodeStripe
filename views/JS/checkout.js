// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe('pk_test_51JhDcCBWZN8h9ujbEEH0mTkTgpbkkgfO4QU0hX6pTvfYnvCVWv6GlRSYj5s8LLMYnCAmGy5jHjbA5VZEBeHS1l3b00VnvOdq8E');
var checkoutButton = document.getElementById("btn");

checkoutButton.addEventListener("click", function () {
  fetch("/stripe/payment", {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
        "product": {
            "name": "iPhone 12", 
            "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000", 
            "amount": 100,
            "quantity": 1
        }})
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      // FIXME: Checkout why this is not working through Stripe documentation
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});