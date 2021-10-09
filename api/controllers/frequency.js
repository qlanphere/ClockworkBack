const Habit = require("../models/habits.js");
const Freq = require("../models/frequency.js")

//Updating the lastDoneDate in the frequnecy table
async function updateFreq(req, res) {
    try {
    const habit = await Habit.findById(parseInt(req.params.id));
    console.log(req.body)
      const updatedFreq = await Freq.update(
        habit.habitid,
        req.body.periodStart,
        req.body.streak,
        req.body.freqStreak,
        req.body.streakAdded
      );
      res.status(200).json({ freq: updatedFreq});
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  async function show(req, res) {
    try {
      const freq = await Freq.findById(parseInt(req.params.id));
      
      res.json(freq);
    } catch (err) {
      res.status(404).send(err);
    }
  }
  
  
  async function indexFreqs(req, res) {
    try {
      const freqs = await Freq.all;
      res.status(200).json({ freqs });
    } catch (err) {
      res.status(500).json([err]);
    }
  }

  module.exports = {
      updateFreq, indexFreqs, show
  }