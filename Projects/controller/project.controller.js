const db = require("../model");
const {runQuery} = require("./foreign_key");
const Project = db.projects;
const User = db.users;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {
    // Check the body of the request is null or not
    
    if (!req.body.project_title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Project

    let project = {
      project_title: req.body.project_title,
      project_created: req.body.project_created,
      updated:req.body.updated ? req.body.updated : false
    };

    // Save & Assign foreign_key to the project according to the respective user.

    let users,user;
    return User.findAll({ include: ["projects"] })
    .then(data => {
      users= data
      user = users.find(obj => obj.user_name == project.project_created) 
      if(users == null){
          Project.create(project)
          .then(data => {
            res.send(data);
          }).catch(err => {
            res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
          });
        });
      }   
      else if(user !== project.project_created ){
          Project.create(project)
          .then(data => {
          res.send(data);
          }).catch(err => {
          res.status(500).send({
          message:
          err.message || "Some error occurred while creating the User."
          });
        });
      }  
        else{
          return Project.create(project)
          .then(data => {
            user.setProjects(data)
            res.send(data);
          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          });
        }
    })

}
  
// Retrieve all projects from the database.
exports.findAll = (req, res) => {
  const project_title = req.query.project_title;
  var condition = project_title ? { project_title : { [Op.like]: `%${project_title}%` } } : null;
  Project.findAll({ where: condition })
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

// Find a single project with a project_id
exports.findOne = (req, res) => {
  const id = req.params.id
  Project.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with project_id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with project_id=" + id
      });
    })
  
};

// Update a User by the user_id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with project_title=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with project_title=" + id
      });
    });
  
};

// Delete a User with the specified user_id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete project with project_title=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not project_title user with project_title=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Project.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Projects were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Projects."
      });
    });
  
};

// Find all published Projects
exports.findAllUpdated = (req, res) => {
  Project.findAll({ where: { updated: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};
