import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class WelcomeRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, (req, res) => {
      if (req.headers.accept.includes('html')) {
        // If request is from a browser
        return res.status(200).send(`
          <div>
            <span>API is now up and running!</span>
          </div>
        `);
      } else {
        // If request is via CURL, AJAX, Postman, etc
        return res.status(200).json({
          success: true,
          message: 'API is now up and running!',
        });
      }
    });
  }
}

export default WelcomeRoute;
