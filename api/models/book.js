const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model { }
  
  Book.init({
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
          msg: 'A book title is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the book.'
        }
      }
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Book authors are required.'
        },
        notEmpty: {
          msg: 'Please provide authors for the book.'
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
    volume: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pages: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Number of pages is required.'
        },
        notEmpty: {
          msg: 'Please provide the number of pages for the book.'
        }
      }
    }
  }, { sequelize });

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      }
    });
  };

  return Book;
};