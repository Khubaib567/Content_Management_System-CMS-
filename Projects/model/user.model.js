module.exports = (sequelize, Sequelize) => {
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
        return User;
    };
    
    
     