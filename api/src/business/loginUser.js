const { getDBConnection, releaseDBConnection } = require("../util/connectDB");

const loginUser = async ({userName, password}) => {
    const connection = await getDBConnection();

    const user_sql = "select * from user where user_name = ? and password = ?"

    return new Promise((resolve, reject) => {
        connection.query(user_sql, [userName, password], (err, results) => {
            if (err) {
                return reject(err);
            }

            releaseDBConnection(connection);

            return resolve(results[0]);
        });
    })
};

module.exports.loginUser = loginUser;