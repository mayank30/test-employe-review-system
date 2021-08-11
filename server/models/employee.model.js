module.exports = (sequelize, type) => {
    return sequelize.define("employee", {
        id: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        firstName: {
            type: type.STRING,
            allowNull: true,
        },
        lastName: {
            type: type.STRING,
            allowNull: true,
        },
        email: {
            type: type.STRING,
            allowNull: true,
        },
        password: {
            type: type.STRING,
            allowNull: true,
        },
        profile: {
            type: type.STRING,
            allowNull: true,
        },
        location: {
            type: type.JSON,
            allowNull: true,
        },
        designation: {
            type: type.JSON,
            allowNull: true,
        },
        role: {
            type: type.STRING,
            allowNull: false,
            defaultValue: "EMPLOYEE", // EMPLOYEE or ADMIN
        },
        meta: {
            type: type.JSON,
            allowNull: true,
        },
        status: {
            type: type.STRING,
            allowNull: false,
            defaultValue: "PENDING",
        },
        byEmployee: {
            type: type.JSON,
            allowNull: false,
        },
    });
};