import { GraphQLObjectType, GraphQLSchema } from 'graphql';


// Queries
import getUsers from './queries/users/getUsers'
import getUser from './queries/users/getUser'

// Mutations 
import postUser from './mutations/users/postUser';
import updateUser from './mutations/users/updateUser';
import deleteUser from './mutations/users/deleteUser';

// Subscription 
import { Subsription } from "./subscriptions"

// Root
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getUsers,
        getUser
    }
});

// Mutatons
const RootMutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        postUser,
        updateUser,
        deleteUser
    }
});

// subscriptions
const RootSubscriptions = new GraphQLObjectType({
    name: "RootSubscriptions",
    fields: Subsription
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutations,
    subscription: RootSubscriptions
});