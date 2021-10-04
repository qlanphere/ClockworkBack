const db = require('../dbConfig');

class Habit {
    constructor(data) {
        this.habitId = data.habitId;
        this.habitName = data.habitName;
        this.frequency = data.frequency;
        this.startDate = data.startDate;
        this.targetDate = data.targetDate;
        this.habitType = data.habitType;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try{
                const result = await db.query('select * from habits')
                const habits = result.rows.map(h => ({habitName: h.habitName}))
            }
            catch(err) {

            }
        })
    }

    static findById(userId){
        return new Promise (async (resolve, reject) => {
            try {

            } catch (err) {
                reject('Habit not found')
            }
        });
    };

    static create(data){
        return new Promise (async (resolve, reject) => {
            try {

            } catch (err) {
                reject("couldn't create Habit")
            }
        });
    };

    destroy(){
        return new Promise (async (resolve, reject) => {
            try {

            } catch (err) {
                reject("couldn't delete habit")
            }
        })
    };
};

module.exports = Habit;
