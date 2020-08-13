import MongoDB from 'mongodb';

export class MongoClient {

    static mongoDBServerDetails: { uri: string, dbName: string};

    #client?: MongoDB.MongoClient;
    #options?: MongoDB.MongoClientOptions

    constructor(
        options?: MongoDB.MongoClientOptions
    ) {
        this.#options = options;
    }

    async connect(
        uri: string,
        options?: MongoDB.MongoClientOptions,
    ): Promise<MongoDB.MongoClient> {
        await this.#client?.close();
        this.#client = await MongoDB.connect(
            uri,
            options || this.#options,
        );
        return this.#client;
    }

}

export const mongoClient: MongoClient = new MongoClient()
