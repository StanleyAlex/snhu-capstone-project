const mysql = require('mysql');

let connectionPool = undefined;

const createDBConnectionPool = () => {
    connectionPool = mysql.createPool({
        connectionLimit: 5,
        host: "localhost",
        user: "root",
        password: "c@pstone",
        database: "inc-info"
    });
};

const getDBConnection = async () => {
    if (!connectionPool) {
        createDBConnectionPool();
    }
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            };

            console.log("Connection is acquired from the connection pool!");
            return resolve(connection);
        });
    });
}

const releaseDBConnection = (connection) => connection.release();

module.exports = { createDBConnectionPool, getDBConnection, releaseDBConnection, connectionPool };