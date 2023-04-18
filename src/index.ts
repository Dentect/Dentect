import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import authRouter from './routes/authRoutes';
import dentistRouter from './routes/dentistRoutes';
import patientRouter from './routes/patientRoutes';

require('dotenv').config();

const app: express.Application = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGOURI || 'mongodb://localhost:27017/dental-diseases-detection';

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/dentists', dentistRouter);
app.use('/patients', patientRouter);

(async function () {

    try {

        // connect to mongodb
        mongoose.connect(
            mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
                useCreateIndex: true,
            })
            .then(() => {
                app.listen(port, () => {
                    console.log('connected to database');
                    console.log(`server is running on port ${port}`);
                });
            })
            .catch(err => {
                console.error('failed to connect to mongodb:\n', err);
                process.exit(1);
            });

        // 404 handler
        app.use((req, res, next) => {
            res.status(404).json({
                status: 404,
                message: 'Page not found!'
            });
        });

        // error handler
        app.use(((err, req, res, next) => {
            if (err.status < 500) {
                res.status(err.status).json({
                    status: err.status,
                    message: err.message
                });
            }
            else {
                res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }

        }) as express.ErrorRequestHandler);

    } catch (error) {
        console.log(`Error! ${error}`);
        process.exit(1);
    }
})();
