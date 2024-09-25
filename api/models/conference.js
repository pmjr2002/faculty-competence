const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Conference extends Model { }
  
  Conference.init({
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
          msg: 'A conference title is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the conference.'
        }
      }
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Conference authors are required.'
        },
        notEmpty: {
          msg: 'Please provide authors for the conference.'
        }
      }
    },
    publicationDate: {
      type: DataTypes.DATEONLY,
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
    conference: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Conference name is required.'
        },
        notEmpty: {
          msg: 'Please provide the conference name.'
        }
      }
    },
    volume: {
      type: DataTypes.STRING,
      allowNull: true
    },
    issue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pages: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { sequelize });

  Conference.associate = (models) => {
    Conference.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      }
    });
  };

  return Conference;
};
