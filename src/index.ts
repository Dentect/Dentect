import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

require('dotenv').config();

const app: express.Application = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGOURI || 'mongodb://localhost:27017/dental-diseases-detection';

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

(async function() {

    try {

        // connect to mongodb
        mongoose.connect(
            mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
            () => {
                console.log('connected to database');
            }
        );

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


        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });

    } catch (error) {
        console.log(`Error! ${error}`);
    }
})();
