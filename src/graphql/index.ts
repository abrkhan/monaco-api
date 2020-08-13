import gql from 'graphql-tag';
import {Case} from '../data/types';
import {Executor} from '../executor';

export const typeDefs = gql `  
    
    type Response {
        result: String!
    }
    
    input DiscriminationInput {
        flag: Boolean!
        race: Boolean
        sex: Boolean
        gender: Boolean
        age: Boolean
        bullying: Boolean
    }
    
     input CaseInput {
         salary: Float!
         settlementAgreement: Boolean!
         isEmployed: Boolean!
         lastEmployedOver3Months: Boolean!
         numberOfYearsEmployed: Int!
         discrimination: DiscriminationInput!
         description: String!
    }
    
    type Query {
        getRules: String
    }
    
    type Mutation {
        makeNewCase(newCase: CaseInput!): Response 
    }
    
    
`;

const getRules = async (_: void, args: {}) => {
    const executor = new Executor();
    await executor.init();
    const rules = await executor.getRules();
    return rules;

}

const makeNewCase = async  (_: void, args: {newCase: Case}) => {
    const {newCase} = args;
    const executor = new Executor();
    await executor.init();
    const ret = await executor.onNewCase(newCase);
    return ret;
}

// A map of functions which return data for the schema.
export const resolvers = {
    Query: {
        getRules
    },
    Mutation: {
        makeNewCase,
    }
};
