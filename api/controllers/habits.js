const Habit = require('../models/habits.js')


async function index(req, res){
    try{
        const habits = await Habit.all;
        res.json({habits});
    }
    catch (err) {
        res.status(500).json([err])

    }
}


async function show(req, res) {
    try {
        const habit = await Habit.findById(parseInt(req.params.id));
        res.json(habit)
    } catch (err) {
        res.status(404).send(err)
    };
}

async function create (req, res) {
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(habit)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function update (req,res) {
    try {
        //console.log(req.body)
        const habit = await Habit.findById(parseInt(req.params.id))
        console.log(habit.habitid)
        const updatedHabit = await Habit.update(req.body.frequency, req.body.targetDate, habit.habitid)
        
        //res.json('succesfully updated')
        res.json({habit: updatedHabit})
    } catch (err) {
        res.status(500).json({err})
    }
}

async function destroy (req, res) {
    try {
        const habit = await Habit.findById(parseInt(req.params.id))
        //console.log(habit)
        await habit.destroy()
        res.status(204).json('Habit Deleted')

    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { index, show, create, update, destroy}