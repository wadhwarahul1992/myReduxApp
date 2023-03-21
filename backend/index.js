// const { get } = require('@sailshq/lodash');
const express = require("express");
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const ObjectID = mongo.ObjectId;

const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const client = new MongoClient('mongodb://localhost:27017');

let CentralDB = null;
const collectionName = 'trans_validator_queue';

const setConnection = async () => {
    try {
        const conn = await client.connect();
        CentralDB = conn.db('myReactApp');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// get count of jobs that are waiting to be assigned to workers for more than or equal to 5 mins.
const getQueueCount = async (query) => {
    let queueCount =  await CentralDB.collection(collectionName).count({...query});
    console.log('--------------------- Job count', queueCount);
    return parseInt(queueCount) || 0;
};

let cnstatus;

const runJob = async (req = {}) => {
    let id = '';
    if (cnstatus) {
        id = await CentralDB.collection('mobile_data').insertOne({ ...req.body });
    } else {
        console.log('Got Error while creating connection');
    }
    return id;
};

const findJob = async (req = {}) => {
    let id = '';
    if (cnstatus) {
        id = await CentralDB.collection('mobile_data').find({}).toArray();
    } else {
        console.log('Got Error while creating connection');
    }
    return id;
};

const deleteJob = async (req = {}) => {
    let id = '';
    if (cnstatus) {
        id = await CentralDB.collection('mobile_data').deleteOne({ _id: new ObjectID(req.body.id) });
    } else {
        console.log('Got Error while creating connection');
    }
    return id;
};

const updateOneJob = async (req = {}) => {
    let id = '';
    if (cnstatus) {
        id = await CentralDB.collection('mobile_data').updateOne({ _id: new ObjectID(req.body.id) }, {'$set': {name: req.body.name, price: req.body.price}});
    } else {
        console.log('Got Error while creating connection');
    }
    return id;
};

// runJob();

app.post(
    "/loadTest",
    async (req, res) => {
        const rs = await runJob(req);
        res.send('_id '+rs);
      }
);

app.post(
    "/deleteTest",
    async (req, res) => {
        const rs = await deleteJob(req);
        res.json(rs);
      }
);

app.get(
    "/test",
    async (req, res) => {
        const rs = await findJob(req);
        res.json(rs);
    }
);
    
app.post(
    "/updateOne",
    async (req, res) => {
        const rs = await updateOneJob(req);
        res.json(rs);
    }
);


  
app.listen(8080, async () => {
    cnstatus = await setConnection();
    console.log('Example app listening on port 8080!')
});
