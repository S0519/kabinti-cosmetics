// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe("pk_test_51JVXTVKQYCASxzWJCFGxvlOXQLQfxnYjfMGS1zIZqdtJxzS3WZwwhRuayjZVowS37vK5osoiwRLaUvzY3WnfS4T000LqaK35fC");


// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;
fetch("/create-payment-intent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({})
})
  .then(function(result) {
    return result.json();
  })
  .then(function(data) {
    var elements = stripe.elements();

    var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Lato, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Lato, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    var card = elements.create("card", {
      hidePostalCode: true,
      style: style });
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");

    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });

    $('#submit').click(function(event) {
      if(!$('input[name=email]').val() 
      ||!$('input[name=address]').val()
      ||!$('input[name=city]').val()
      ||!$('input[name=state]').val()
      ||!$('input[name=zip]').val()){
        SoloAlert.alert({title:"All feilds are required!"});
      }
      else{
        if(validateEmail($('input[name=email]').val())){
            // Complete payment when the submit button is clicked
            payWithCard(stripe, card, data.clientSecret);
                
        }
        else{
            SoloAlert.alert({title:"Invalid email!",body:"e.g: user@domain.com"});
        }
      }
    
    });
  });

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function(stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        const customerInfo={
          email:$('input[name=email]').val(),
          address:$('input[name=address]').val(),
          city:$('input[name=city]').val(),
          state:$('input[name=state]').val(),
          zip:$('input[name=zip]').val()
        }
        // The payment succeeded!
        axios.post("/checkout",customerInfo)
        .then((order)=>{
          orderComplete(result.paymentIntent.id);
          SoloAlert.alert({
            title:"Congrats!",
            body:order.data.message,
            icon: "success",
            onOk : ()=>{
                window.location.replace("/");
            }
          });
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    })
    .catch(err=>{
      consoel.log(err);
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function(paymentIntentId) {
  loading(false);
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button").disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
