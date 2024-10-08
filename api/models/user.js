const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model { }
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required.'
        },
        notEmpty: {
          msg: 'Please provide a last name.'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email address you entered already exists.'
      },
      validate: {
        notNull: {
          msg: 'An email address is required'
        },
        notEmpty: {
          msg: 'Please provide an email address.'
        },
        isEmail: {
          msg: 'Please enter a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please provide a password.'
        },
        validatePassword(val) {
          if (val.length >= 8 && val.length <= 20) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue('password', hashedPassword);
          } else {
            throw new Error('Your password should be between 8 and 20 characters');
          }
        },
      },
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
      validate: {
        len: {
          args: [0, 100],
          msg: 'Affiliation must be 100 characters or less.'
        }
      }
    },
    areasOfInterest: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
      validate: {
        len: {
          args: [0, 255],
          msg: 'Areas of interest must be 255 characters or less.'
        }
      }
    },
    homepage: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
      validate: {
        isUrl: {
          msg: 'Please enter a valid URL.'
        }
      }
    }
  }, { sequelize });

  // Association with other models (e.g., Course)
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userid'
      }
    });
  }

  return User;
};
