const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Journal extends Model { }
  
  Journal.init({
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
          msg: 'A journal title is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the journal.'
        }
      }
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Authors are required.'
        },
        notEmpty: {
          msg: 'Please provide the authors for the journal.'
        }
      }
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A publication date is required.'
        },
        isDate: {
          msg: 'Please provide a valid date for the publication.'
        }
      }
    },
    journal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Journal name is required.'
        },
        notEmpty: {
          msg: 'Please provide the journal name.'
        }
      }
    },
    volume: {
      type: DataTypes.STRING,
      allowNull: true, // Volume might not be available for some publications
      validate: {
        notEmpty: {
          msg: 'Please provide the journal volume.'
        }
      }
    },
    issue: {
      type: DataTypes.STRING,
      allowNull: true, // Issue might not be available for some publications
      validate: {
        notEmpty: {
          msg: 'Please provide the journal issue.'
        }
      }
    },
    pages: {
      type: DataTypes.STRING,
      allowNull: true, // Pages might not be available for some publications
      validate: {
        notEmpty: {
          msg: 'Please provide the page numbers.'
        }
      }
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Publisher is required.'
        },
        notEmpty: {
          msg: 'Please provide the publisher for the journal.'
        }
      }
    }
  }, { sequelize });

  // Associations
  Journal.associate = (models) => {
    Journal.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      }
    });
  };

  return Journal;
};
