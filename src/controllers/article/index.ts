import Article from '@models/article';
import { Request, Response } from 'express';



export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const createArticle = async (req: Request, res: Response) => {
  const { id, name, description, price, model } = req.body;
  try {
    const article = await Article.create({
      id,
      name,
      description,
      price,
      model,
    });
    res.status(201).json(article);

  } catch (error) {
    
    res.status(500).json(error);
  }
};




