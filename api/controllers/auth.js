require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

async function create(req, res)  {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, passwordHash: hashed});
        res.status(201).json({message: "User has been created successfully"});
    } catch (err) {
        res.status(500).json({err});
    }
};

module.exports = { create }