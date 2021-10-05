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

    static findById(id){
        return new Promise (async (resolve, reject) => {
            
            try {
                let habitData = await db.query('select * from habits where habitId =$1;', [id]);
                
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
            console.log(this.habitId)
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
