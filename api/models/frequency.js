const db = require('../dbConfig/init');

class Freq {
    constructor(data) {
        this.habitid = data.habitid;
        this.frequencyType = data.frequencytype;
        this.frequency = data.frequency;
        this.lastDoneDate = data.lastdonedate;
        this.streak = data.streak;
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

        // static findById(id){
        //     return new Promise (async (resolve, reject) => {
                
        //         try {
        //             let freqData = await db.query('SELECT * FROM frequencytable where habitid =$1;', [id]);
                    
        //             let freq = new Freq(freqData.rows[0]);
        //             resolve(freq)
        //         } catch (err) {
        //             reject('frequency not found')
        //         }
        //     });
        // };

        static create(data, id){
            return new Promise (async (resolve, reject) => {
                try {
                    console.log(id, data.frequencyType, data.frequency)
                let freqData = await db.query('insert into frequencytable (habitid, frequencyType, frequency, streak) values ($1,$2,$3,$4) returning *;', [id, data.frequencyType, data.frequency,0]); 
                let newFreq = new Freq(freqData.rows[0])

                resolve(newFreq)

                } catch (err) {
                    reject("couldn't create Frequency")
                }
            })
        }

        static update(habitid, lastDoneDate, streak){
            return new Promise (async (resolve, reject) => {
                try {
                    if (streak==0) {
                    
                    let updatedFreqData = await db.query('UPDATE frequencytable SET lastDoneDate = $1, streak = $2 WHERE habitid = $3 returning *;', [null, streak, habitid]);
                    let updatedFreq = new Freq(updatedFreqData.rows[0]);

                    resolve(updatedFreq)
                    } else {
                        let updatedFreqData = await db.query('UPDATE frequencytable SET lastDoneDate = $1, streak = streak + 1 WHERE habitid = $2 returning *;', [lastDoneDate, habitid]);
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


