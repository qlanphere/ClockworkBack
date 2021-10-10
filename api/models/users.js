const db = require('../dbConfig/init');

class User {
    constructor(data){
        this.userId = data.userid;
        this.userName = data.username;
        this.passwordHash = data.passwordhash;
        this.badgePoints = data.badgepoints;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try{
                const result = await db.query('select * from users;');
                const user = result.rows.map(u => new User(u));
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

    update() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query("UPDATE users SET badgePoints = badgePoints + $1 where userId = $2;", [1,this.userId]);
                let newUser = new User(result.rows[0]);
                resolve(newUser)
            } catch (err) {
                reject("couldn't update the user")
            }
        })  
    }
}

module.exports = User;