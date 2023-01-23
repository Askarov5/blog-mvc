import express, { Request, Response, NextFunction } from "express";
import {
  addNewArticle,
  getArticles,
  getArticleWithID,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";

const routes = (app: any) => {
  app
    .route("/posts")
    // get all articles
    .get((req: Request, res: Response, next: NextFunction) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getArticles);

  // post a new article
  app.route("/post").post(addNewArticle);

  app
    .route("/post/:articleId")
    // get specific article
    .get(getArticleWithID)

    // update a article
    .put(updateArticle)

    // to delete a article
    .delete(deleteArticle);
};

export default routes;
