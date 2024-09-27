import { Router, Request, Response } from "express";
import { createArticle, getArticles } from "@controllers/article";


const routeArticles = Router();

routeArticles.get('/', getArticles );

routeArticles.post('/', createArticle );


export default routeArticles;
