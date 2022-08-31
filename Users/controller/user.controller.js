const db = require("../model");
const User = db.users;
const Project = db.projects;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {

  if (!req.body.user_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a User
  let user = {
    user_name: req.body.user_name,
    user_password: req.body.user_password,
    user_email: req.body.user_email,
    updated:req.body.updated ? req.body.updated : false
  };
  
  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // const id = req.query.id;
  // var condition = id ? { id : { [Op.like]: `%${id}%` } } : null;
  User.findAll({ include: ["projects"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  User.findByPk(id,{include:["projects"]})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    })
  
};
// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
          
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
  
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
  
};
// Find all published Users
exports.findAllUpdated = (req, res) => {
  User.findAll({ where: { updated: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

