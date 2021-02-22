require("dotenv").config();

// dialect --> qual é o banco, se é mysql, mariadb e afins

module.exports = {
    url: process.env.DATABASE_URL,
    config: {
        dialect: "mysql",
        define: {
            timestamp: true,
            underscored: true
        },
    },
};