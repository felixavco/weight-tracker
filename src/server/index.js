import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import passportJWT from './passportJWT';

//* Routes
import UserRoutes from '../routes/UserRoutes';

class Server {
    constructor(PORT, MONGO_URI) {
        this.PORT = PORT;
        this.MONGO_URI = MONGO_URI;
        this.server = express();
        this.config();
        this.routes();
    }

    config() {
        this.server.use(cors());
        this.server.use(morgan('dev'));
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(express.json());
        this.server.use(passport.initialize());
        passportJWT(passport);
    }

    routes() {
        this.server.use('/api/user', UserRoutes);
    }

    start() {
        mongoose
            .connect(this.MONGO_URI, {
                useNewUrlParser: true,
				useCreateIndex: true
            })
            .then(() => {
                console.log('Connected to DB');
                this.server.listen(this.PORT, () => {
                    console.log('-> Server started on port ' + this.PORT);
                });
            })
            .catch((err) => console.error(err));
    }

}

export default Server;

