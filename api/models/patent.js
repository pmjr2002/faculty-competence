const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Patent extends Model { }
  
  Patent.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A patent title is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the patent.'
        }
      }
    },
    inventors: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Patent inventors are required.'
        },
        notEmpty: {
          msg: 'Please provide inventors for the patent.'
        }
      }
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Publication date is required.'
        },
        isDate: {
          msg: 'Please provide a valid publication date.'
        }
      }
    },
    patentOffice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Patent office is required.'
        },
        notEmpty: {
          msg: 'Please select a patent office.'
        }
      }
    },
    patentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Patent number is required.'
        },
        notEmpty: {
          msg: 'Please provide a patent number.'
        }
      }
    },
    applicationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Application number is required.'
        },
        notEmpty: {
          msg: 'Please provide an application number.'
        }
      }
    }
  }, { sequelize });

  Patent.associate = (models) => {
    Patent.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      }
    });
  };

  return Patent;
};