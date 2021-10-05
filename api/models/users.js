const db = require('../dbConfig');

class User {
    constructor(data){
        this.userId = data.userid;
        this.userName = data.username;
        this.passwordHash = data.passwordhash;
        this.badgePoints = data.badgeoints;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try{
                console.log("hello all")
                const result = await db.query('select * from users;');
                console.log("middle of all function" + result.rows[0]);
                const user = result.rows.map(u => new User(u));
                console.log(user)
                resolve(user);
            }
            catch(err) {
                console.error();
            }
        })
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

    static findByUserName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await db.query("SELECT * FROM users WHERE userName = $1;", [name]);
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
                let result = await db.query("INSERT INTO users (userName,passwordHash,badgePoints) VALUES ($1, $2, $3) RETURNING *;", [data.userName, data.passwordHash,0]);
                let newUser = new User(result.rows[0]);
                resolve(newUser);
            } catch (err) {
                reject("User could not be created")
            }
        })
    }
}

module.exports = User;