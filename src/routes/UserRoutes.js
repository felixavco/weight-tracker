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
        //* POST ROUTES
        this.router.post('/register', this.register());
        this.router.post('/login', this.login());
        this.router.post('/', this.protectedRoute, this.create());
        //* GET ROUTES
        this.router.get('/', this.protectedRoute, this.getList());
        this.router.get('/:user_id', this.protectedRoute, this.getOne());
        //* PUT ROUTES
        this.router.put('/:user_id/insert', this.protectedRoute, this.insertWeight());
        this.router.put('/:user_id/remove', this.protectedRoute, this.removeWeight());
        this.router.put('/:user_id', this.protectedRoute, this.update());
        //* DELETE ROUTES
        this.router.delete('/:user_id', this.protectedRoute, this.delete());
    }
}

const user = new User();

export default user.router;