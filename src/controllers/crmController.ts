import { Request, Response } from "express";
import { Contact, IContact } from "../models/crmModel";

export const addNewContact = (req: Request, res: Response) => {
  let newContact = new Contact(req.body);

  newContact.save((err: any, contact: IContact) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(contact);
  });
};

export const getContacts = (req: Request, res: Response) => {
  Contact.find({}, (err: any, contact: IContact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const getContactWithID = (req: Request, res: Response) => {
  Contact.findById(req.params.contactId, (err: any, contact: IContact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const updateContact = (req: Request, res: Response) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: true },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    }
  );
};

export const deleteContact = (req: Request, res: Response) => {
  Contact.remove({ _id: req.params.contactId }, (err: any) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted contact" });
  });
};
