const Habit = require('../models/habit.js')

async function show(req, res) {
    try {
        
    } catch (err) {
        res.status(500).send(err)
    };
}

async function create (req, res) {
    try {

    } catch (err) {
        res.status(422).json({err})
    }
}

async function destroy (req, res) {
    try {

    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { show, create, destroy}