$(document).ready(function() {
  var name = $("#inputName");
  var email = $("#inputEmail");
  var phone = $("#inputPhone");
  var address = $("#inputAddress");
  var ext = $("#inputExt");
  var int = $("#inputInt");
  var colonia = $("#inputProvince");
  var cp = $("#inputZip");
  var city = $("#inputCity");
  var state = $("#inputState");
  $(document).on("submit", handleCustomerFormSubmit);
  function handleCustomerFormSubmit(event) {
    event.preventDefault();
    console.log("Boton de Enviar Informacion");
    upsertCustomer({
      name: name.val().trim(),
      street: address.val().trim(),
      exterior: ext.val().trim(),
      interior: int.val().trim(),
      zipCode: cp.val().trim(),
      province: colonia.val().trim(),
      city: city.val().trim(),
      state: state.val().trim(),
      email: email.val().trim(),
      phoneNumber: phone.val().trim()
    });
  }

  function upsertCustomer(customerData) {
    $.post("/api/newCustomer", customerData).then(function(res){
      if(res === "Customer registered successfully"){
          $("#customerForm").hide();
      }
      $("#messageRes").text(res);
      console.log(res);
    });
  }
});
