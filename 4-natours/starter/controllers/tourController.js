const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

checkID = (req, res, next, val) => {
    const tour = tours.find(el => el.id === Number(val));

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    next();
}

const getAllTours = (req, res) => {
    res.json({
        status: 'success',
        results: tours.length,
        data: {tours}
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {tour}
    });
};

const createTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Error writing file'
            });
        }

        res.status(201).json({
            status: 'success',
            data: {tour: newTour}
        });
    });
};

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {tour: '<Updated tour here...>'}
    });
};

const deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    checkID
}