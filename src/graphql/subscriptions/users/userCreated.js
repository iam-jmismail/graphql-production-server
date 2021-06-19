// import { withFilter } from 'graphql-subscriptions';

// Types 
import userType from "../../types/user"

// Constants 
import { NEW_USER_CREATED } from "../../../constants/subscriptions"


module.exports = {
    type: userType,
    subscribe: (parent, args, context) => context.pubsub.asyncIterator(NEW_USER_CREATED),
    resolve: (payload) => payload
}