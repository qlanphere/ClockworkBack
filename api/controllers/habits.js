const Habit = require("../models/habits.js");
const User = require("../models/users.js");

async function getHabits(req, res) {
  try {
    //console.log('hi')
    //const id = await User.findByUserName(req.params.user)
    const habits = await Habit.findUserHabits(parseInt(req.params.id));
    res.status(200).json(habits);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function show(req, res) {
  try {
    const habit = await Habit.findById(parseInt(req.params.id));
    res.status(200).json(habit);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function create(req, res) {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function update(req, res) {
  try {
    const habit = await Habit.findById(parseInt(req.params.id));
    const updatedHabit = await Habit.update(
      req.body.frequency,
      req.body.targetDate,
      habit.habitid
    );
    res.status(204).json({ habit: updatedHabit });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function destroy(req, res) {
  try {
    const habit = await Habit.findById(parseInt(req.params.id));
    //console.log(habit)
    await habit.destroy();
    res.status(204).json({message: "Habit Deleted"});
  } catch (err) {
    res.status(500).json({ err });
  }
}

module.exports = { show, create, update, destroy, getHabits };
