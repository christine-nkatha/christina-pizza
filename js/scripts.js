// Business Logic 

//declaring and assigning variables
var totalPriceArray = []; //Only global variable in code
function Order (customSize) {
  this.customSize = customSize;
  
  
  this.crustPiza = 300;
  
  this.toppingsPiza = 200;
  this.pizzaPrice = 0;
  this.sidePrice = 3;
}


Order.prototype.pizzaCost = function () {
  if (this.customSize === "Small.") {
    this.pizzaPrice += 600;
  } else if (this.customSize === "Medium.") {
    this.pizzaPrice += 1200;
  } else if (this.customSize === "Large.") {
    this.pizzaPrice += 2400;
  }

  this.pizzaPrice += this.crustPiza;

  this.pizzaPrice += this.toppingsPiza;
  return this.pizzaPrice;
}
Order.prototype.sideCost = function () {
  return this.sidePrice;
}
Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement]; //////////////////////IMPORTANT!!! How to add contents of an array together
  }
  return cartTotalPrice;
}
function Address (streetAddress, city) {
  this.streetAddress = streetAddress;
  this.city = city;
  this.deliveryAddress = (streetAddress + "  " + city );
}


//User Interface Logic
$(document).ready(function(event) {
/////Landing Page Btns
  $("#pickup-btn").click(function() {
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    var streetAddress = $("input#street-add").val();
    var city = $("input#city-add").val();
    var newAddress = new Address(streetAddress, city)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO: " + newAddress.deliveryAddress);
  });
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var crustPiza = $("select#crust").val();
    var toppingsPiza = $("select#toppings").val();
    var pizzaDetails = (customSize + " - " + crustPiza + ", " + toppingsPiza);
    var newPizzaOrder = new Order(customSize);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#size, #crust, #toppings").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });





///Checkout Btn
  $("#checkout-btn").click(function() {
    location.reload();
  });
});
