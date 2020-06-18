var db = require("../models");

module.exports = function(app) {
  // Get all ORDERS LINES
  app.get("/api/orders-lines", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.OrderLines.findAll({
      include: [db.Foods]
    }).then(function(dbOrderLines) {
      res.json(dbOrderLines);
    });
  });

  // Get route for a specific ORDER LINES
  app.get("/api/orders-lines/id/:id", function(req, res) {
    db.OrderLines.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Foods]
    }).then(function(dbOrderLines) {
      res.json(dbOrderLines);
    });
  });
  // POST route for saving a new ORDER LINES
  app.post("/api/order-lines", function(req, res) {
    console.log(req.body);
    db.OrderLines.create({
      OrderPrice: req.body.OrderPrice
    }).then(function(dbOrderLines) {
      res.json(dbOrderLines);
    });
  });
  // DELETE METHOD for deleting an order line
  app.delete("/api/order-lines/:id", function(req, res) {
    db.OrderLines.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrderLines) {
      res.json(dbOrderLines);
    });
  });
};
