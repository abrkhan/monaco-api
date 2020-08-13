import {MongoClient, mongoClient} from './MongoClient';
import {Case} from './types';
import {Db } from 'mongodb';

export class CaseDAO {
    #db?: Db;

    constructor() {
    }

    async init() {
        const client = await mongoClient.connect(process.env.MONGO_DB_URI ?? MongoClient?.mongoDBServerDetails?.uri);
        this.#db = client.db();
    }

    async insertCase(nCase: Case) {
        const collection = this.#db?.collection<Case>('cases');
        const result = await collection?.insertOne(nCase);
        console.log(`Inserted into database doucment:`, result?.ops[0]);
    };

}
