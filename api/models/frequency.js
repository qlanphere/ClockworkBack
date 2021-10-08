const db = require('../dbConfig/init');

class Freq {
    constructor(data) {
        this.habitid = data.habitid;
        this.frequencyType = data.frequencytype;
        this.frequency = data.frequency;
        this.lastDoneDate = data.lastdonedate;
        this.streak = data.streak;
        this.freqStreak = data.freqstreak
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
                let freqData = await db.query('insert into frequencytable (habitid, frequencyType, frequency, streak, freqStreak, lastDoneDate) values ($1,$2,$3,$4,$5, $6) returning *;', [id, data.frequencyType, data.frequency,0,0, data.lastDoneDate]); 
                let newFreq = new Freq(freqData.rows[0])

                resolve(newFreq)

                } catch (err) {
                    reject("couldn't create Frequency")
                }
            })
        }

        static update(habitid, lastDoneDate, streak, freqStreak){
            return new Promise (async (resolve, reject) => {
                try {
                    console.log(streak, freqStreak)
                    if (streak==0 && freqStreak==0) {
                    
                    let updatedFreqData = await db.query('UPDATE frequencytable SET lastDoneDate = $1, streak = $2, freqStreak = $3 WHERE habitid = $4 returning *;', [lastDoneDate, streak,freqStreak, habitid]);
                    let updatedFreq = new Freq(updatedFreqData.rows[0]);

                    
                    resolve(updatedFreq)

                    } else if (streak > 0 && freqStreak == 0) {
                        let updatedFreqData = await db.query('UPDATE frequencytable SET lastDoneDate = $1, freqStreak = $2, streak = streak + 1 WHERE habitid = $3 returning *;', [lastDoneDate, freqStreak, habitid]);
                        let updatedFreq = new Freq(updatedFreqData.rows[0]);

                        resolve(updatedFreq)
                    }
                    
                    else if (freqStreak>0) {
                        let updatedFreqData = await db.query('UPDATE frequencytable SET lastDoneDate = $1, freqStreak = freqStreak + 1 WHERE habitid = $2 returning *;', [lastDoneDate, habitid]);
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


