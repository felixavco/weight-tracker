import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import passportJWT from './passportJWT';

//* Routes


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
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(express.json());
        this.server.use(passport.initialize());
        passportJWT(passport);
    }

    routes() {
        this.server.use('/', (req, res) => res.send("HELLO"));
    }

    start() {
        mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
				useCreateIndex: true
            })
            .then(() => {
                console.log('Connected to DB');
                this.server.listen(this.PORT, () => {
                    console.log('> Server started on port ' + this.PORT);
                });
            })
            .catch((err) => console.error(err));
    }

}

export default Server;

