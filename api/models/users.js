const db = require('../dbConfig');

class User {
    constructor(data){
        this.userId = data.userId;
        this.userName = data.userName;
        this.badgePoints = data.badgePoints;
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await db.query("SELECT * FROM users WHERE userId = $1;", [id]);
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject("User not found");
            }
        })
    };

    static create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query("INSERT INTO users (userName, badgePoints) VALUES ($1, $2) RETURNING *;", [data.userName, data.badgePoints]);
                let newUser = new User(result.rows[0]);
                resolve(newUser);
            } catch (err) {
                reject("User could not be created")
            }
        })
    }
}

module.exports = User;