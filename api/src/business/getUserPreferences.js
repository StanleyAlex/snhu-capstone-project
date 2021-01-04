const { getDBConnection, releaseDBConnection } = require("../util/connectDB");

const getUserPreferences = async ({userId}) => {
    const connection = await getDBConnection();

    const user_sql = "select * from user_preference where user_id = ?"

    return new Promise((resolve, reject) => {
        connection.query(user_sql, [userId], (err, results) => {
            if (err) {
                return reject(err);
            }

            releaseDBConnection(connection);

            return resolve(results[0]);
        });
    })
};

module.exports.getUserPreferences = getUserPreferences;