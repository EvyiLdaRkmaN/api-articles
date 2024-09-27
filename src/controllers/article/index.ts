import Article from '@models/article';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';



export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error<getArticles>:', error);
    handleError(error, res);
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
    console.log('Error<createArticle>:', error);
    handleError(error, res);
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...fields } = req.body;

  try {

    const allowedFields = Object.keys(Article.getAttributes());
    const invalidFields = Object.keys(fields).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new Error(`campos no validos: ${invalidFields.join(', ')}`, {
        cause: 'Invalid fields',
      });
    }

    const article = await Article.findByPk(id);

    if (article) {
      await article.update(
        { ...fields },
      );
      res.status(200).json(article);
      return;
    }

    res.status(404).json({ message: 'Articulo no encontrado' });

  } catch (error) {
    console.error('Error<updateArticle>', error);
    handleError(error, res);
  }

};


const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error && error.cause === 'Invalid fields') {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error instanceof Error && error.cause === 'validation') {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error instanceof ValidationError) {
    res.status(400).json({ message: (error as Error).message });
    return;
  }

  res.status(500).json({ message: 'Ocurrio un error inesperado' });
};






