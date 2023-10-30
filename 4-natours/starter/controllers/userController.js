const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

checkID = (req, res, next, val) => {
    const tour = users.find(el => el.id === Number(val));

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    next();
}

const getAllUsers = (req, res) => {
    res.json({
        status: 'success',
        results: users.length,
        data: {users}
    });
}

const getUser = (req, res) => {
    const id = req.params.id * 1;
    const user = users.find(el => el.id === id);

    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {user}
    });
}

const createUser = (req, res) => {
    const newID = users[users.length - 1].id + 1;
    const newUser = Object.assign({id: newID}, req.body);

    users.push(newUser);

    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Error writing file'
            });
        }

        res.status(201).json({
            status: 'success',
            data: {user: newUser}
        });
    });
}

const updateUser = (req, res) => {
    const id = req.params.id * 1;
    const user = users.find(el => el.id === id);

    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {user}
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id * 1;
    const user = users.find(el => el.id === id);

    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    checkID
}