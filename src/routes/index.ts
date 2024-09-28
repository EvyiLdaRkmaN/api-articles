import { Router, Request, Response } from "express";
import { createArticle, deleteArticle, getArticles, getArticlesById, updateArticle } from "@controllers/article";


const routeArticles = Router();

routeArticles.get('/', getArticles );

routeArticles.get('/:id', getArticlesById );

routeArticles.post('/', createArticle );

routeArticles.put('/:id', updateArticle);

routeArticles.delete('/:id', deleteArticle);


export default routeArticles;
