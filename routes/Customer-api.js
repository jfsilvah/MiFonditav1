var db = require("../models");

module.exports = function(app) {
  // Get all Foods
  app.get("/api/customers", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Customer.findAll().then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });

  // Get route for a specific ORDER LINES
  app.get("/api/customers/:id", function(req, res) {
    db.Customer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });
  app.post("/api/newCustomer", function(req, res) {
    db.Customer.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(dbCust) {
      if (!dbCust) {
        db.Customer.create(req.body).then(function() {
          res.json("Customer registered successfully");
        });
      } else {
        res.json("There is a customer registered with same email");
      }
    });
  });
};
