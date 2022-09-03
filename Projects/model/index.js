const Sequelize = require("sequelize");

const sequelize = new Sequelize('enter_your_db_name', 'enter_your_user_name', 'enter_your_password', {
  host: 'localhost',
  dialect: 'mysql' 

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.projects = require('./project.model.js')(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

//Link project & users db based on 'userid' as foreign_key & project_created attribute of project db.

db.users.hasMany(db.projects,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
db.projects.belongsTo(db.users,{onDelete: 'CASCADE',onUpdate:'CASCADE'});

module.exports = db;

