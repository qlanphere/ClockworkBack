const User = require('../models/users')

async function show(req, res) {
    try {
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

async function updateBadgeById(req,res){
    try {
        const user = await User.findById(parseInt(req.params.id))
        await user.update();
        res.status(204).json({message: "updated the points"})
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { show,showIndex ,updateBadgeById};