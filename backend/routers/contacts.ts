import express from 'express';
import mongoConn from '../modules/mongo';
import mongoDB from 'mongodb';

const objID = mongoDB.ObjectID;

const app = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.get('/', getDefaultContacts);
async function getDefaultContacts(req, res) {
  
}

export default app;