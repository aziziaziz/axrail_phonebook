import express from 'express';
import mongoConn from '../modules/mongo';
import mongoDB from 'mongodb';

var defaultContacts = require('../files/contacts.json');

const objID = mongoDB.ObjectID;

var contacts = new mongoConn('phonebook', 'contacts');

const app = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.get('/', getAllContacts);
async function getAllContacts(req, res) {
  var mongo = await contacts.getCollection();
  var resultDB = await mongo.find();

  var result = [];
  await resultDB.forEach(r => result.push(r));

  res.send(result);
}

app.post('/', insertContacts);
async function insertContacts(req, res) {
  var mongo = await contacts.getCollection();
  var result = await mongo.insertOne(req.body);

  if (result.insertedCount > 0) {
    res.send({ inserted: true, message: `Inserted ${result.insertedCount} contact`});
  } else {
    res.send({ inserted: false, message: `Failed to insert contact. Please try again.`});
  }
}

app.get('/default', insertDefaultContacts);
async function insertDefaultContacts(req, res) {
  var mongo = await contacts.getCollection();
  await mongo.deleteMany();
  var result = await mongo.insertMany(defaultContacts);

  if (result.insertedCount == defaultContacts.length) {
    res.send(`Inserted ${result.insertedCount} contact${result.insertedCount > 1 ? 's' : ''}`);
  } else {
    res.send(`Inserted ${result.insertedCount} of ${defaultContacts.length} contacts`);
  }
}

app.get('/generate', generateContacts);
async function generateContacts(req, res) {
  var result = [];
  let year = Math.ceil(Math.random() * (8) + 2010);
  let contactsJson = require(`../files/${year}names.json`);

  let indexes = [];
  for (let i = 0; i < contactsJson.length; i++) {
    let rand = Math.random() * contactsJson.length;
    indexes.push(Math.floor(rand));
  }

  let unique = [...new Set(indexes)].sort((a, b) => { return a - b });
  
  unique.forEach((u) => {
    let phoneRand = Math.random() * (90000000) + 10000000;

    result.push({ name: contactsJson[u], number: `+601${Math.ceil(phoneRand)}` });
  });

  let mongo = await contacts.getCollection();
  await mongo.deleteMany();

  let resultDB = await mongo.insertMany(result);

  if (resultDB.insertedCount == result.length) {
    res.send(`Inserted ${resultDB.insertedCount} contact${resultDB.insertedCount > 1 ? 's' : ''}`);
  } else {
    res.send(`Inserted ${resultDB.insertedCount} of ${result.length} contacts`);
  }
}

export default app;