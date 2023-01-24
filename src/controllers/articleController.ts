import { Request, Response } from "express";
import { Article, IArticle } from "../models/articleModel";

export const addNewArticle = (req: Request, res: Response) => {
  let newArticle = new Article(req.body);

  newArticle.save((err: any, article: IArticle) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(article);
  });
};

export const getArticles = (req: Request, res: Response) => {
  Article.find({}, (err: any, article: IArticle) => {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

export const getArticleWithID = (req: Request, res: Response) => {
  Article.findById(req.params.articleId, (err: any, article: IArticle) => {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

export const updateArticle = (req: Request, res: Response) => {
  Article.findOneAndUpdate(
    { _id: req.params.articleId },
    req.body,
    { new: true },
    (err, article) => {
      if (err) {
        res.send(err);
      }
      res.json(article);
    }
  );
};

export const deleteArticle = (req: Request, res: Response) => {
  Article.remove({ _id: req.params.articleId }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted article" });
  });
};
