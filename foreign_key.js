const Sequelize = require("sequelize");
const Op = Sequelize.Op;



const sequelize = new Sequelize('cms', 'Khubaib', 'Khubi@123', {
  host: 'localhost',
  dialect: 'mysql'

});

const Project = sequelize.define("project", {
  project_title: {
    type: Sequelize.STRING
  },
  project_created: {
    type: Sequelize.STRING
  },
  updated: {
    type: Sequelize.BOOLEAN
  }
})
const User = sequelize.define("users", {
  user_name: {
    type: Sequelize.STRING
  },
  user_password: {
    type: Sequelize.STRING
  },
  user_email: {
    type: Sequelize.STRING
  },
  updated: {
    type: Sequelize.BOOLEAN
  },
})


//Assign foreign key based on user_id & the project_created attributes

User.hasMany(Project,{onDelete: 'CASCADE'});
Project.belongsTo(User,{onDelete: 'CASCADE'});


let user1, user2, user_created, projects;

function foreign_key1 () {

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Connected with db.");
    return User.findOne({ where: { id: 1 } });
  }).then((data) => {
    user1 = data;
    return Project.findAll();
  }).then((data) => {
    user_created = data[0].project_created
    var condition = data[0].project_created ? { project_created: { [Op.like]: `%${user_created}` } } : null;
    return Project.findAll({ where: condition })
  }).then((data) => {
    projects = data;
    user1.setProjects(projects)
  })
  .catch((err) => {
    console.log("Failed to Connected db: " + err.message);
  });


// sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

}

function foreign_key2 () {

  sequelize.sync({ alter: true })
    .then(() => {
      console.log("Connected with db.");
      return User.findOne({ where: { id: 2 } });
    }).then((data) => {
      user1 = data;
      return Project.findAll();
    }).then((data) => {
      user_created = data[1].project_created
      var condition = data[1].project_created ? { project_created: { [Op.like]: `%${user_created}` } } : null;
      return Project.findAll({ where: condition })
    }).then((data) => {
      projects = data;
      user1.setProjects(projects)
    })
    .catch((err) => {
      console.log("Failed to Connected db: " + err.message);
    });
  
  
  // sequelize.sync({ force: true }).then(() => {
  //     console.log("Drop and re-sync db.");
  // });
  
  }

module.exports = foreign_key1;
module.exports = foreign_key2;


