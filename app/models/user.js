'use strict';

const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    hashed_password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'user'
  });

  // User.belongsTo(UserRole);

  User.beforeCreate((user, options) => {
    if(user.changed('hashed_password')){
      return bcrypt.hash(user.hashed_password, 10)
        .then((hash) => {
          user.hashed_password = hash;
        });
    }
  });
  
  User.comparePasswords = function(email, password) {
    return User.find({ where: { email } })
      .then(user => {
        if(!user){
          return Promise.reject({ success: false, message: 'Invalid email' });
        }
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.hashed_password, (err, res) => {
            if(res) {
              resolve(user);
            } else {
              reject({ success: false, message: 'Invalid Password '});
            }
          });
        });
      })
  }
  return User;
};