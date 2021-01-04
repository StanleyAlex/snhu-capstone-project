const isEmpty = require("lodash/isEmpty");
const { getDBConnection, releaseDBConnection } = require("../util/connectDB");
const { getUserPreferences } = require("./getUserPreferences");

const saveUserPreferences = async ({ userId, userPreferences }) => {
    const connection = await getDBConnection();
    const { locations, sendText, sendEmail } = userPreferences;
    let prefer_sql;
    let params = [];

    const userPreferencesRecord = await getUserPreferences({ userId });

    if (isEmpty(userPreferencesRecord)) {
        prefer_sql = `insert into user_preference (user_id, locations, send_text, send_email) values ('${userId}', '${locations}', '${sendText ? 1 : 0}', '${sendEmail ? 1 : 0}')`;
    } else {
        prefer_sql = `update user_preference set locations = ?, send_text = ?, send_email = ? where user_id = ?`;
        params = [locations, sendText, sendEmail, userId];
    }

    return new Promise((resolve, reject) => {
        connection.beginTransaction((tranError) => {
            if (tranError) {
                connection.rollback(() => releaseDBConnection(connection));
            } else {
                connection.query(prefer_sql, params, (err, results) => {
                    if (err) {
                        connection.rollback(() => releaseDBConnection(connection));
                        return reject(err);
                    }

                    connection.commit(() => {
                        releaseDBConnection(connection)
                    });
                    return resolve(results[0]);
                });
            }
        });
    })
};

module.exports.saveUserPreferences = saveUserPreferences;