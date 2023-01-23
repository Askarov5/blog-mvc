import express, { Request, Response, NextFunction } from "express";
import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

const routes = (app: any) => {
  app
    .route("/contact")
    // get all contacts
    .get((req: Request, res: Response, next: NextFunction) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getContacts)

    // post a new contact
    .post(addNewContact);

  app
    .route("/contact/:contactId")
    // get specific contact
    .get(getContactWithID)

    // update a contact
    .put(updateContact)

    // to delete a contact
    .delete(deleteContact);
};

export default routes;
