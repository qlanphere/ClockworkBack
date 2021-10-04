const db = require('../dbConfig');

class Habit {
    constructor(data) {
        this.habitId = data.habitid;
        this.habitName = data.habitname;
        this.frequency = data.frequency;
        this.startDate = data.startdate;
        this.targetDate = data.targetdate;
        this.habitType = data.habittype;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try{
                const result = await db.query('select * from habits;')
                console.log(result)
                const habits = result.rows.map(h => new Habit(h));
                resolve(habits)
            }
            catch(err) {
                reject("Could not find habits")


            }
        })
    }

    static findById(habitId){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query('select * from habits where habitId =$1;', [habitId]);
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
                // console.log();
                let habitData = await db.query('insert into habits (habitName, frequency, startDate, targetDate, habitType) values ($1,$2,$3,$4,$5) returning *;', [data.habitName, data.frequency, data.startDate, data.targetDate, data.habitType]);
                console.log(habitData);
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
