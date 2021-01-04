const { getDBConnection, releaseDBConnection } = require("../util/connectDB");

const registerUser = async ({ registrationDetails }) => {
    const connection = await getDBConnection();
    const { userName, password, firstName, lastName, email, phone, address } = registrationDetails;

    const user_sql = `insert into user (user_name, password, first_name, last_name, email, phone, address) values ('${userName}', '${password}', '${firstName}', '${lastName}', '${email}', ${phone}, '${address}')`;

    return new Promise((resolve, reject) => {
        connection.beginTransaction((tranError) => {
            if (tranError) {
                connection.rollback(() => releaseDBConnection(connection));
            } else {
                connection.query(user_sql, [registrationDetails], (err, results) => {
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

module.exports.registerUser = registerUser;