const db = require('../dbConfig/init');

class Freq {
    constructor(data) {
        this.habitid = data.habitid;
        this.frequencyType = data.frequencytype;
        this.frequency = data.frequency;
        this.periodStart = data.periodstart;
        this.streak = data.streak;
        this.freqStreak = data.freqstreak
        this.streakAdded = data.streakadded
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                
                const result = await db.query('SELECT * FROM frequencytable;') 
                const freqs = result.rows.map(f => new Freq(f));
                resolve(freqs)
            }
            catch (err) {
                reject("Could not find freqs")

            }
        })
    }

        static findById(id){
            return new Promise (async (resolve, reject) => {
                
                try {
                    let freqData = await db.query('SELECT * FROM frequencytable where habitid =$1;', [id]);
                    
                    let freq = new Freq(freqData.rows[0]);
                    resolve(freq)
                } catch (err) {
                    reject('frequency not found')
                }
            });
        };

        static create(data, id){
            return new Promise (async (resolve, reject) => {
                try {
                let freqData = await db.query('insert into frequencytable (habitid, frequencyType, frequency, streak, freqStreak, periodStart, streakAdded) values ($1,$2,$3,$4,$5, $6, $7) returning *;', [id, data.frequencyType, data.frequency,0,0, data.periodStart, data.streakAdded]); 
                let newFreq = new Freq(freqData.rows[0])

                resolve(newFreq)

                } catch (err) {
                    reject("couldn't create Frequency")
                }
            })
        }

        static update(habitid, periodStart, streak, freqStreak, streakAdded){
            return new Promise (async (resolve, reject) => {
                try {
                    console.log(streak, freqStreak)
                    if (streak==0 && freqStreak==0) {
                    
                    let updatedFreqData = await db.query('UPDATE frequencytable SET periodStart = $1, streak = $2, freqStreak = $3 WHERE habitid = $4 returning *;', [periodStart, streak,freqStreak, habitid]);
                    let updatedFreq = new Freq(updatedFreqData.rows[0]);

                    
                    resolve(updatedFreq)

                    } else if (streak > 0 && freqStreak == 0) {
                        let updatedFreqData = await db.query('UPDATE frequencytable SET freqStreak = $1, streakAdded = $2, streak = streak + 1 WHERE habitid = $3 returning *;', [freqStreak, streakAdded, habitid]);
                        let updatedFreq = new Freq(updatedFreqData.rows[0]);

                        resolve(updatedFreq)
                    }
                    
                    else if (freqStreak>0) {
                        let updatedFreqData = await db.query('UPDATE frequencytable SET freqStreak = freqStreak + 1 WHERE habitid = $1 returning *;', [habitid]);
                        let updatedFreq = new Freq(updatedFreqData.rows[0]);

                    resolve(updatedFreq)
                    }
                } catch (err) {
                    reject("couldn't update Frequency")
                }
            })
        }
        
    
}

module.exports = Freq;


