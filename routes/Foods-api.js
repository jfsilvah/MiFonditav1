var db = require("../models");

module.exports = function(app) {
  // Get all Foods
  app.get("/api/foods/:type", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Foods.findAll({
      where: {
        foodType: req.params.type
      }
    }).then(function(dbFoods) {
      res.json(dbFoods);
    });
  });

  // Get route for a specific ORDER LINES
  app.get("/api/foods/id/:id", function(req, res) {
    db.Foods.findOne({
      where: {
        id: req.params.id
      },
      include: [db.OrderLines]
    }).then(function(dbFoods) {
      res.json(dbFoods);
    });
  });
};
