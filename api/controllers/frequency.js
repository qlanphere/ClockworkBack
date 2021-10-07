const Habit = require("../models/habits.js");
const Freq = require("../models/frequency.js")

//Updating the lastDoneDate in the frequnecy table
async function updateFreq(req, res) {
    try {
    const habit = await Habit.findById(parseInt(req.params.id));
    console.log(req.body)
      const updatedFreq = await Freq.update(
        habit.habitid,
        req.body.lastDoneDate,
        req.body.streak
      );
      
  
      res.json({ freq: updatedFreq});
  
    } catch (err) {
      res.status(500).json({ err });
    }
  }
  
  async function indexFreqs(req, res) {
    try {
      const freqs = await Freq.all;
      res.json({ freqs });
    } catch (err) {
      res.status(500).json([err]);
    }
  }

  module.exports = {
      updateFreq, indexFreqs
  }