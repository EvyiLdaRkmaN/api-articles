import { Router, Request, Response } from "express";
import { createArticle, getArticles, updateArticle } from "@controllers/article";


const routeArticles = Router();

routeArticles.get('/', getArticles );

routeArticles.post('/', createArticle );

routeArticles.put('/:id', updateArticle);


export default routeArticles;
