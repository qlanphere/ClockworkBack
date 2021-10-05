const User = require('../models/users')

async function show(req, res) {
    try {
        //console.log("hello inside show")
        const user = await User.all;
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function showIndex(req, res) {
    try {
        const user = await User.findById(parseInt(req.params.id));
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function findUserByName(req, res) {
    try {
        console.log(req.params)
        const user = await User.findByUserName(req.params)
        res.status(200).json(user)
    } catch {

    }
}

// async function create (req, res) {
//     try {
//         const user = await User.create(req.body);
//         res.status(201).json(user);
//     } catch(err) {
//         res.status(422).json({err});
//     }
// };

module.exports = { show,showIndex, findUserByName };