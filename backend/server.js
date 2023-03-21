const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const ObjectID = mongo.ObjectId;

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');
const {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL
} = require('graphql-helix');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let cnstatus;

const findJob = async (req = {}) => {
    let id = '';
    if (cnstatus) {
        id = await CentralDB.collection('mobile_data').find({}).toArray();
    } else {
        console.log('Got Error while creating connection');
    }
    return id;
};

app.get(
    "/test",
    async (req, res) => {
        const rs = await findJob(req);
        res.json(rs);
    }
)

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        findJob: {
          type: GraphQLString,
          resolve: () => {
            return(
                id
            )
          },
        },
      },
    }),
});

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       rahulbhai: {
//         type: GraphQLString,
//         resolve: () => 'Hello world!',
//       },
//     },
//   }),
// });



const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

app.use('/graphql', async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL());
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    if (result.type === 'RESPONSE') {
      result.headers.forEach(({ name, value }) => res.setHeader(name, value));
      res.status(result.status);
      res.json(result.payload);
    } else {
    // graphql-helix also supports subscriptions and incremental delivery (i.e. @defer and @stream directives)
    // out of the box. See the repo for more complete examples that also implement those features.
    }
  }
});

app.listen(8080, async () => {
    console.log('Example app listening on port 8080!')
});