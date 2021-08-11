module.exports = (sequelize, type) => {
    return sequelize.define("review", {
        id: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        reviewFor: {
            type: type.STRING,
            allowNull: false,
        },
        reviewBy: {
            type: type.STRING,
            allowNull: false,
        },
        comment: {
            type: type.STRING,
            allowNull: true,
        },
        rating: {
            type: type.NUMBER,
            allowNull: true,
            defaultValue: 1,
        },
        meta: {
            type: type.JSON,
            allowNull: true,
        },
        status: {
            type: type.STRING,
            allowNull: false,
            default: "PENDING", // PENDING APPROVED REJECTED
        },
        byEmployee: {
            type: type.JSON,
            allowNull: false,
        },
    });
};