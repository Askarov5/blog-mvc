import express, { Request, Response, NextFunction } from "express";
import { checkJwt } from "../middleware/authz.middleware";

import {
  addNewArticle,
  getArticles,
  getArticleWithID,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";

export const articleRouter = express.Router();

articleRouter
  .route("/articles")
  // get all articles
  .get((req: Request, res: Response, next: NextFunction) => {
    // middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getArticles);

articleRouter
  .route("/article/:articleId")
  // get specific article
  .get(getArticleWithID);

articleRouter.use(checkJwt);

// post a new article
articleRouter.route("/article").post(addNewArticle);

// update a article
articleRouter
  .route("/article/:articleId")
  .put(updateArticle)

  // to delete a article
  .delete(deleteArticle);
