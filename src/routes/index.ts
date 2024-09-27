import { Router, Request, Response } from "express";


const routeArticles = Router();

// ejemplo de rutas usuarios
routeArticles.get('/', (req: Request, res: Response) => {
  const hello = 'Hello World';
  res.json({ hello });
});


export default routeArticles;
