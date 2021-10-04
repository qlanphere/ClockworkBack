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
                const result = await db.query('select * from habits;');
                const habits = result.rows.map(h => ({habitName: h.habitName}));
            }
            catch(err) {


            }
        })
    }

    static findById(habitId){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query('select * from habits where id =$1;', [habitId]);
                let habit = new Habit(habitData.rows[0]);
                resolve(habit)
            } catch (err) {
                reject('Habit not found')
            }
        });
    };
    // create(habitName) just using the name for now for simplicity and to check if it works 
    static create(name){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query('insert into habits (habitName) values ($1) returning *;', [name.habitName]);
                let newHabit = new Habit(habitData.rows[0]); 
                resolve(newHabit)
            } catch (err) {
                reject("couldn't create Habit")
            }
        });
    };

    destroy(){
        return new Promise (async (resolve, reject) => {
            try {
                await db.query('delete from habits where habitId = $1;', [this.habitId]);
                resolve('Habit was deleted')
            } catch (err) {
                reject("couldn't delete habit")
            }
        })
    };
};

module.exports = Habit;
