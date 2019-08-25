import { Router } from 'express';
import passport from 'passport';
import UsersController from '../controllers/UsersController';

class User extends UsersController {

    constructor() {
        super();
        this.protectedRoute = passport.authenticate('jwt', { session: false });
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/register', this.register());
        this.router.post('/login', this.login());
        this.router.post('/', this.create());
        this.router.get('/', this.getList());
        this.router.get('/:user_id', this.getOne());
        this.router.put('/:user_id', this.update());
        this.router.delete('/:user_id', this.delete());
    }
}

const user = new User();

export default user.router;