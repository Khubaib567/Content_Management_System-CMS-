module.exports = app => {
    const users = require("../controller/user.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve all published users
    router.get("/updated", users.findAllUpdated);
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
    // Update a User with id
    router.put("/:id", users.update);
    // Delete a User with id
    router.delete("/:id", users.delete);
    // Delete all users
    router.delete("/", users.deleteAll);
    app.use('/api/user', router);
};