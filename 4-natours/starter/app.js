const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 3000;

// 1) MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 2) ROUTE HANDLERS
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
        data: {tour: '<Updated tour here...>'}
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
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

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


// 4) START SERVER
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

