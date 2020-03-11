module.exports = (sequelize, Sequelize) => {
    var Model = {}

    Model.users = sequelize.define("users", {
            email: {
              type: Sequelize.STRING
            },
            password: {
              type: Sequelize.STRING
            }
        });

    Model.suggestions = sequelize.define("suggestions", {
        productId: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        }
    },
    {
        associate: models => {
            suggestions.hasMany(models.users, {
                foreignKey: { name: 'userId', allowNull: false }
            })
        }
    });

    return Model;
};