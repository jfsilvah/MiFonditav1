var db = require("../models");

module.exports = function(app) {
  // Get all ORDERS HEADER
  app.get("/api/orders", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.OrderHeader.findAll({
      /*include: [
        {
          model: db.OrderLines,
          include: [
            {
              model: db.Foods
            }
          ]
        }
      ],*/
      include: [{ model: db.OrderLines, attributes: [] }],
      attributes: {
        include: [
          [
            db.Sequelize.fn("COUNT", db.Sequelize.col("OrderLines.id")),
            "linesCount"
          ],
          [
            db.Sequelize.fn("SUM", db.Sequelize.col("OrderLines.orderprice")),
            "totalPrice"
          ]
        ]
      },
      group: ["OrderLines.orderheaderid"]
    }).then(function(dbOrderHeader) {
      res.json(dbOrderHeader);
    });
  });

  // Get route for a specific ORDER HEADER
  app.get("/api/ordersDetail/:id", function(req, res) {
    db.OrderHeader.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.OrderLines,
          include: [
            {
              model: db.Foods
            }
          ]
        }
      ]
    }).then(function(dbOrderLine) {
      res.json(dbOrderLine);
    });
  });
  // POST route for saving a new ORDER HEADER
  app.post("/api/orders", function(req, res) {
    db.OrderHeader.create({
      OrderStatus: "En proceso"
    }).then(function(dbOrderHeader) {
      for (var i = 0; i < req.body.length; i++) {
        console.log("A buscar " + req.body[i]);
        db.Foods.findAll({
          where: {
            FoodName: req.body[i]
          }
        }).then(function(dbFoods) {
          console.log("En THEN de Foods");
          console.log(dbFoods);
          if (dbFoods) {
            db.OrderLines.create({
              OrderPrice: dbFoods[0].Price,
              FoodId: dbFoods[0].id,
              OrderHeaderId: dbOrderHeader.id
            }).then(function() {
              console.log("Line Created successfully");
            });
          }
        });
      }
      res.json("Se creo el pedido " + dbOrderHeader.id);
    });
  });
  // DELETE METHOD for deleting an order heather
  app.delete("/api/order-headers/:id", function(req, res) {
    db.OrderHeader.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrderHeader) {
      res.json(dbOrderHeader);
    });
  });
};
