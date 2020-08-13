import {resolvers, typeDefs} from './graphql';
import {ApolloServer} from 'apollo-server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from './data/MongoClient'

//starting in memory mongodb database
const mongod = new MongoMemoryServer();

let uri;
let port;
let dbPath
let dbName;

mongod.getUri().then((u) => {uri = u;
console.log(`Started mongodb in memory database with uri: ${uri}`);
MongoClient.mongoDBServerDetails.uri = uri
});
mongod.getDbName().then((dbn) => {dbName = dbn;
console.log(`Started mongodb in memory database with dbName: ${dbName}`);
MongoClient.mongoDBServerDetails.dbName = dbName;
});

mongod.getPort().then((p) => {port = p; console.log(`Started mongodb in memory database with port: ${port}`)});
mongod.getDbPath().then((dbp) => {dbPath = dbp; console.log(`Started mongodb in memory database with dbPath: ${dbPath}`)});

MongoClient.mongoDBServerDetails = {
    uri: uri ?? '',
    dbName: dbName ?? ''
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
