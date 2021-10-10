const db = require('../dbConfig/init');

class Habit {
    constructor(data) {
        this.habitid = data.habitid;
        this.habitName = data.habitname;
        this.frequency = data.frequency;
        this.startDate = data.startdate;
        this.targetDate = data.targetdate;
        this.habitType = data.habittype;
        this.userId = data.userid;
        this.username = { userName: data.username, path: `/users/${data.userid}` };
        this.badgepoints = {badgePoints: data.badgepoints, path: `/users/${data.userid}`};
        this.streak = data.streak;
        this.freqStreak = data.freqstreak;
        this.lastDoneDate = data.lastdonedate;
        this.streakAdded = data.streakAdded;
        //
    }

    static findUserHabits(id) {
        return new Promise (async (resolve, reject) => {
            try {
                
                const result = await db.query(`SELECT habits.*, users.userName AS userName, users.badgePoints AS badgePoints, frequencytable.streak
                                            FROM habits JOIN users
                                            ON habits.userId = users.userId
                                            JOIN frequencytable
                                            ON habits.habitid = frequencytable.habitid
                                            WHERE habits.userId=$1;`, [ id ])
                const habits = result.rows.map(u => new Habit(u));
                resolve(habits)
            } catch(err) {
                reject("Couldn't find habits")
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            
            try {
                let habitData = await db.query('select * from habits where habitid =$1;', [id]);
                
                let habit = new Habit(habitData.rows[0]);
                resolve(habit)
            } catch (err) {
                reject('Habit not found')
            }
        });
    };
    // create(habitName) just using the name for now for simplicity and to check if it works 
    static create(data){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query('insert into habits (habitName, frequency, startDate, targetDate, habitType, userId) values ($1,$2,$3,$4,$5,$6) returning *;', [data.habitName, data.frequency, data.startDate, data.targetDate, data.habitType,data.userId]);
                let newHabit = new Habit(habitData.rows[0]); 
                resolve(newHabit)
            } catch (err) {
                reject("couldn't create Habit")
            }
        });
    };

    static update(frequency, targetDate, habitid){
        return new Promise (async (resolve, reject) => {
            try {
                let updatedHabitData = await db.query('UPDATE habits SET frequency = $1, targetDate = $2 WHERE habitid = $3 returning *;', [ frequency, targetDate, habitid]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);
                resolve(updatedHabit)
            }catch (err) {
                reject("couldn't update habit")
            }
        })
    }

    destroy(){
        return new Promise (async (resolve, reject) => {
            try {
                await db.query('delete from habits where habitId = $1;', [this.habitid]);
                resolve('Habit was deleted')
            } catch (err) {
                reject("couldn't delete habit")
            }
        })
    };
};

module.exports = Habit;
