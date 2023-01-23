import express, { Request, Response, NextFunction } from "express";
import { checkJwt } from "../middleware/authz.middleware";

import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

export const crmRouter = express.Router();

crmRouter
  .route("/contacts")
  // get all contacts
  .get((req: Request, res: Response, next: NextFunction) => {
    // middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getContacts);

crmRouter
  .route("/contact/:contactId")
  // get specific contact
  .get(getContactWithID);

crmRouter.use(checkJwt);

// post a new contact
crmRouter.route("/contact").post(addNewContact);

// update a contact
crmRouter
  .route("/contact/:contactId")
  .put(updateContact)

  // to delete a contact
  .delete(deleteContact);
