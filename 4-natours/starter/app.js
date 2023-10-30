const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server side!', app: 'Natours'});
// });
//
// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.json({
        status: 'success',
        results: tours.length,
        data: {tours}
    });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {tour}
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

