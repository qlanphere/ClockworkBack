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

async function destroy (req, res) {
    try {
        const habit = await Habit.findById(parseInt(req.params.id))
        console.log(habit)
        await habit.destroy()
        res.status(204).json('Habit Deleted')

    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { index, show, create, destroy}