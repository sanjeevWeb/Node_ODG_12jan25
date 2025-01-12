const { User } = require("../models");
const bcrypt = require('bcryptjs')
const hashedPassword = require('../config/hashPassword')
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPasswrd = await hashedPassword(password);
        const user = await User.create({ username, password: hashedPasswrd });
        return res.status(201).json({ user });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ id: user.userId, username: user.username }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { password,newPassword } = req.body
        const loogedInuser = req.user
        const user = await User.findOne({ where: { username: loogedInuser.username } });
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        await User.update({ password: newPassword }, { where: { username: loogedInuser.username } })
        return res.status(204).json({ message: 'User updated successfully' })
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = req.user
        await User.destroy({ where: { username: user.username } })
        return res.status(204).json({ message: 'User deleted successfully' })
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll({ attributes: { exclude: ['password'] } })
        return res.status(200).json(allUsers)
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { userId: id } });
        return res.status(200).json({ user: user.username })
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
}