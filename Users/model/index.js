const Sequelize = require("sequelize");

const sequelize = new Sequelize('enter_your_db_name', 'enter_your_user_name', 'enter_your_password', {
  host: 'localhost',
  dialect: 'mysql' 

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
db.projects = require('./project.model.js')(sequelize, Sequelize);

db.users.hasMany(db.projects,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
db.projects.belongsTo(db.users,{onDelete: 'CASCADE',onUpdate:'CASCADE'});

module.exports = db;

