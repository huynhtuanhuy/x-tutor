import examplesRouter from './api/controllers/examples/router';
import userRouter from './api/controllers/users/userRouter';
import authRouter from './api/controllers/auth/authRouter';
import Auth from './api/middlewares/auth';
import paymentRouter from './api/controllers/paymentCard/paymentRouter';
import cors from 'cors';


export default function routes(app) {
  app.use(cors(function(req, cb) {
    const corsOptions = {
      "origin": "http://localhost:3001",
      "method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      "credentials": true
    }
    cb(null, corsOptions)
  }));
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', Auth.validateToken, userRouter);
  app.use('/api/v1/cards', Auth.validateToken, paymentRouter)
}
