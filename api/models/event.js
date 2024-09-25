const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Event extends Model { }
  Event.init({
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
          msg: 'An event title is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the event.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'An event description is required.'
        },
        notEmpty: {
          msg: 'Please provide a description for the event.'
        }
      }
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Event type is required.'
        },
        notEmpty: {
          msg: 'Please select an event type.'
        }
      }
    },
    participationType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Participation type is required.'
        },
        notEmpty: {
          msg: 'Please specify your participation type.'
        }
      }
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'An event date is required.'
        },
        isDate: {
          msg: 'Please provide a valid date.'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A location for the event is required.'
        },
        notEmpty: {
          msg: 'Please provide a location for the event.'
        }
      }
    }
  }, { sequelize });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      }
    });
  };

  return Event;
};
