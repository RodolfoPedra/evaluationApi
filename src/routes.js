import { Router } from 'express';
import authMiddle from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import EvaluationController from './app/controllers/EvaluationController';
import SessionController from './app/controllers/SessionController';
import ProfessionalController from './app/controllers/ProfessionalController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/professional', ProfessionalController.store);
routes.post('/session', SessionController.store);
routes.get('/professionals', ProfessionalController.index);

routes.use(authMiddle);

routes.post('/evaluate/:professional_id', EvaluationController.store);
routes.put('/evaluate/:evaluate_id', EvaluationController.update);
routes.delete('/evaluate/:evaluate_id', EvaluationController.delete);
routes.get('/evaluations/user/:user_id', UserController.indexEvaluations);
routes.get('/evaluations/professional/:professional_id', ProfessionalController.indexEvaluations);
routes.put('/users', UserController.update);

export default routes;
